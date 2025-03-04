from fastapi import APIRouter, Depends
from src.use_cases.carrier_records import GetByDateHandler, GetByDateRequest, GetByDateResponse, GetAvailableDateHandler, GetAvailableDateRequest, GetAvailableDateResponse
from typing import List

carrier_records_router = APIRouter(prefix="/carrier-records", tags=["Carrier Records"])

@carrier_records_router.get("/dates")
async def get_available_dates(handler: GetAvailableDateHandler = Depends(GetAvailableDateHandler)) -> GetAvailableDateResponse:
    request = GetAvailableDateRequest()
    response = await handler.execute(request)
    return response

@carrier_records_router.get("/{date}")
async def get_by_date(date: str, handler: GetByDateHandler = Depends(GetByDateHandler)) -> GetByDateResponse:
    request = GetByDateRequest(date=date)
    response = await handler.execute(request)
    return response
