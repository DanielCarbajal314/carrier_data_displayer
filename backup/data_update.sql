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
