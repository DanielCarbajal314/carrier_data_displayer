from src.routes.carrier_records import carrier_records_router
from src.bootstrap import app

app.include_router(carrier_records_router)