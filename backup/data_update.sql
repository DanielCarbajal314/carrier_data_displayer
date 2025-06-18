ALTER TABLE public.carrierrecords add column geom geometry;

UPDATE CarrierRecords
SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
WHERE latitude > 0;

CREATE INDEX idx_geometry_on_carrierrecords ON public.carrierrecords USING gist (geom);
CREATE INDEX idx_geometry_on_counties ON public.counties USING gist (geom);
CREATE INDEX idx_local_date_time ON CarrierRecords(local_date_time);

UPDATE public.counties 
SET geom = ST_SetSRID(geom, 4326) 
WHERE ST_SRID(geom) = 0;

CREATE TABLE day_summary(
	day date PRIMARY KEY NOT NULL,
	centroid GEOMETRY,
    standart_deviation DOUBLE PRECISION,
    samples INTEGER,
    county text,
    state text
);

INSERT INTO day_summary(day, centroid, standart_deviation, samples, county, state)
WITH base_data AS (
		SELECT 
			CAST(local_date_time AS DATE) AS day,
			geom
		FROM carrierrecords
		WHERE GEOM IS NOT NULL AND state != 'unknown'
	),
	centroid_by_date AS (
		SELECT 
			day,
			ST_Centroid(ST_Union(geom)) AS centroid
		FROM base_data
		GROUP BY 1
	),
	day_summary_data as (
	    SELECT 
			centroid_by_date.day,
			centroid_by_date.centroid,
			STDDEV(ST_Distance(base_data.geom, centroid_by_date.centroid)) as standart_deviation,
			count(*) samples
	    FROM base_data
	    JOIN centroid_by_date ON base_data.day = centroid_by_date.day
	    GROUP BY 1,2
	)
SELECT day_summary_data.*, counties.name as county, counties.state as state
FROM day_summary_data
JOIN counties on ST_CONTAINS(counties.geom, day_summary_data.centroid);

CREATE VIEW day_summary_by_location AS
SELECT 
	CAST(local_date_time AS DATE) AS day,
	state,
	county,
	count(*)
FROM carrierrecords
WHERE GEOM IS NOT NULL AND state != 'unknown'
GROUP BY 1,2,3
ORDER BY 1,2,3;