from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    imageUrl: str
    isRecommend: Optional[bool] = False

class OrderItem(BaseModel):
    id: str
    productId: str
    quantity: int
    price: float
    notes: Optional[str] = None

class OrderCreate(BaseModel):
    items: List[OrderItem]

class Order(BaseModel):
    id: str
    items: List[OrderItem]
    total: float
    status: str
    createdAt: datetime
