from sqlalchemy import Column, String, Float, Boolean, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import datetime
from database import Base

class ProductModel(Base):
    __tablename__ = "products"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    category = Column(String)
    imageUrl = Column(String)
    isRecommend = Column(Boolean, default=False)

class OrderModel(Base):
    __tablename__ = "orders"
    
    id = Column(String, primary_key=True, index=True)
    total = Column(Float, nullable=False)
    status = Column(String, default="completed")
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    
    items = relationship("OrderItemModel", back_populates="order", cascade="all, delete-orphan")

class OrderItemModel(Base):
    __tablename__ = "order_items"
    
    id = Column(String, primary_key=True, index=True)
    order_id = Column(String, ForeignKey("orders.id"), nullable=False)
    productId = Column(String, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    notes = Column(String, nullable=True)
    
    order = relationship("OrderModel", back_populates="items")
    product = relationship("ProductModel")
