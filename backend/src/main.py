from src.bootstrap import app
from src.routes.carrier_records import carrier_records_router

app.include_router(carrier_records_router)
