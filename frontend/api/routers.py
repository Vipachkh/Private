from fastapi import APIRouter
from typing import List
import services
from schemas import Product, Order, OrderCreate

router = APIRouter()

@router.get("/products", response_model=List[Product])
def get_products():
    return services.get_all_products()

@router.get("/orders", response_model=List[Order])
def get_orders():
    return services.get_all_orders()

@router.post("/orders", response_model=Order)
def create_order(order: OrderCreate):
    return services.create_order(order)
