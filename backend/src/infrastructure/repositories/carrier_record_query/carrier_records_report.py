from dataclasses import dataclass
from datetime import date

from geoalchemy2 import Geography, WKBElement
from geoalchemy2.functions import ST_Centroid, ST_Distance, ST_Union
from sqlalchemy import cast, func, select
from sqlalchemy.sql import over

from src.db.models import Carrierrecord

"""
This function builds a SQL query to generate a report of carrier records:
    WITH RAW_DATA AS (
        SELECT
            local_date_time,
            county, 
            state, 
            count(*) as number_of_records,
            ST_Centroid(ST_Union(geom)) as centroid_geom
        FROM public.carrierrecords
        WHERE latitude > 0 AND county NOT LIKE 'unknown'
        GROUP BY local_date_time, county, state
        ORDER BY local_date_time
    ),
    RAW_DATA_WITH_ROW_NUMBER as (
        SELECT *,
            ROW_NUMBER() OVER (ORDER BY local_date_time) AS rn1,
            ROW_NUMBER() OVER (PARTITION BY county, state ORDER BY local_date_time) AS rn2
        FROM RAW_DATA
    ),
    GROUPED_DATA AS (
        SELECT 
                local_date_time,
                county, 
                state, 
                number_of_records,
                centroid_geom,
                rn1 - rn2 AS grp
        FROM RAW_DATA_WITH_ROW_NUMBER
    ),
    MAIN_PROYECTION AS (
        SELECT 
            MIN(local_date_time) as start,
            MAX(local_date_time) as end,
            EXTRACT(EPOCH FROM (MAX(local_date_time) - MIN(local_date_time))) AS seconds_duration,
            county, 
            state,
            SUM(number_of_records) sample_number,
            ST_Centroid(ST_Union(centroid_geom)) as centroid_geom
        FROM GROUPED_DATA
        GROUP BY county, state, grp
        ORDER BY start
    )
    SELECT 
        *,
        ST_Distance(centroid_geom::geography, (LAG(centroid_geom) OVER (ORDER BY start))::geography) Distance_from_previous
    FROM MAIN_PROYECTION
"""


def build_carrier_records_report_query(target_date: date):
    raw_data_cte = (
        select(
            Carrierrecord.local_date_time,
            Carrierrecord.county,
            Carrierrecord.state,
            func.count().label("number_of_records"),
            ST_Centroid(ST_Union(Carrierrecord.geom)).label("centroid_geom"),
        )
        .where(Carrierrecord.latitude > 0, Carrierrecord.county != "unknown")
        .group_by(Carrierrecord.local_date_time, Carrierrecord.county, Carrierrecord.state)
        .order_by(Carrierrecord.local_date_time)
        .cte("RAW_DATA")
    )

    raw_data_with_row_number_cte = select(
        raw_data_cte,
        over(func.row_number(), order_by=raw_data_cte.c.local_date_time).label("rn1"),
        over(
            func.row_number(),
            partition_by=(raw_data_cte.c.county, raw_data_cte.c.state),
            order_by=raw_data_cte.c.local_date_time,
        ).label("rn2"),
    ).cte("RAW_DATA_WITH_ROW_NUMBER")

    grouped_data_cte = select(
        raw_data_with_row_number_cte.c.local_date_time,
        raw_data_with_row_number_cte.c.county,
        raw_data_with_row_number_cte.c.state,
        raw_data_with_row_number_cte.c.number_of_records,
        raw_data_with_row_number_cte.c.centroid_geom,
        (raw_data_with_row_number_cte.c.rn1 - raw_data_with_row_number_cte.c.rn2).label("grp"),
    ).cte("GROUPED_DATA")

    main_proyection_cte = (
        select(
            func.min(grouped_data_cte.c.local_date_time).label("start"),
            func.max(grouped_data_cte.c.local_date_time).label("end"),
            func.extract(
                "epoch", func.max(grouped_data_cte.c.local_date_time) - func.min(grouped_data_cte.c.local_date_time)
            ).label("seconds_duration"),
            grouped_data_cte.c.county,
            grouped_data_cte.c.state,
            func.sum(grouped_data_cte.c.number_of_records).label("sample_number"),
            ST_Centroid(ST_Union(grouped_data_cte.c.centroid_geom)).label("centroid_geom"),
        )
        .group_by(grouped_data_cte.c.county, grouped_data_cte.c.state, grouped_data_cte.c.grp)
        .order_by("start")
        .cte("MAIN_PROYECTION")
    )

    return select(
        main_proyection_cte,
        ST_Distance(
            cast(main_proyection_cte.c.centroid_geom, Geography),
            cast(over(func.lag(main_proyection_cte.c.centroid_geom), order_by=main_proyection_cte.c.start), Geography),
        ).label("distance_from_previous"),
    ).where(func.date(main_proyection_cte.c.start) == target_date)


@dataclass
class ReportData:
    start: date
    end: date
    seconds_duration: float
    sample_number: int
    county: str
    state: str
    distance_from_previous: float
    centroid: dict
