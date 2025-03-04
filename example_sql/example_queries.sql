		SELECT local_date_time, latitude, longitude, county, state, record_type, geom
		FROM public.carrierrecords
		WHERE latitude > 0 and DATE(local_date_time) = '2021-01-10'
		GROUP BY local_date_time, latitude, longitude, county, state, record_type, geom
		order by local_date_time;


	(
		SELECT geom,
			TO_CHAR(local_date_time, 'YYYY-MM-DD HH24:MI:SS') as "label"
		FROM public.carrierrecords
		WHERE latitude > 0 and DATE(local_date_time) = '2021-01-10'
	)
	UNION
	(
		SELECT geom,
		    counties.name as "label"
		FROM public.counties
		WHERE counties.name in (
		    SELECT county
			FROM public.carrierrecords
			WHERE latitude > 0 and DATE(local_date_time) = '2021-01-10'
			GROUP BY county
		)
	)