# coding: utf-8
from sqlalchemy import CheckConstraint, Column, DateTime, Integer, Numeric, String, Table, Text, text
from geoalchemy2.types import Geography, Geometry
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Carrierrecord(Base):
    __tablename__ = 'carrierrecords'

    id = Column(Integer, primary_key=True, server_default=text("nextval('carrierrecords_id_seq'::regclass)"))
    page_number = Column(Integer)
    item_number = Column(Integer)
    local_date_time = Column(DateTime, index=True)
    latitude = Column(Numeric(9, 6))
    longitude = Column(Numeric(9, 6))
    time_zone = Column(Text)
    county = Column(Text)
    state = Column(Text)
    country = Column(Text)
    record_type = Column(Text)
    geom = Column(Geometry(from_text='ST_GeomFromEWKT', name='geometry'), index=True)


t_counties = Table(
    'counties', metadata,
    Column('state_code', Text),
    Column('county_code', Text),
    Column('state', Text),
    Column('name', Text),
    Column('geography', Geography(from_text='ST_GeogFromText', name='geography'), index=True),
    Column('geom', Geometry(from_text='ST_GeomFromEWKT', name='geometry'), index=True)
)


t_geography_columns = Table(
    'geography_columns', metadata,
    Column('f_table_catalog', String),
    Column('f_table_schema', String),
    Column('f_table_name', String),
    Column('f_geography_column', String),
    Column('coord_dimension', Integer),
    Column('srid', Integer),
    Column('type', Text)
)


t_geometry_columns = Table(
    'geometry_columns', metadata,
    Column('f_table_catalog', String(256)),
    Column('f_table_schema', String),
    Column('f_table_name', String),
    Column('f_geometry_column', String),
    Column('coord_dimension', Integer),
    Column('srid', Integer),
    Column('type', String(30))
)


class SpatialRefSy(Base):
    __tablename__ = 'spatial_ref_sys'
    __table_args__ = (
        CheckConstraint('(srid > 0) AND (srid <= 998999)'),
    )

    srid = Column(Integer, primary_key=True)
    auth_name = Column(String(256))
    auth_srid = Column(Integer)
    srtext = Column(String(2048))
    proj4text = Column(String(2048))
