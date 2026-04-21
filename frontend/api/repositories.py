import os
import httpx
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

def get_all_products() -> List[Dict[str, Any]]:
    """Retrieve all products from Supabase REST API"""
    url = f"{SUPABASE_URL}/rest/v1/products?select=*"
    response = httpx.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

def get_product_by_id(product_id: str) -> Dict[str, Any]:
    """Retrieve a single product by ID from Supabase REST API"""
    url = f"{SUPABASE_URL}/rest/v1/products?id=eq.{product_id}&select=*"
    response = httpx.get(url, headers=HEADERS)
    response.raise_for_status()
    data = response.json()
    return data[0] if data else None

def get_all_orders() -> List[Dict[str, Any]]:
    """Retrieve all orders and their items from Supabase REST API"""
    # Fetch orders
    url = f"{SUPABASE_URL}/rest/v1/orders?select=*,items:order_items(*)&order=createdAt.desc"
    response = httpx.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

def save_order(order_data: Dict[str, Any]) -> Dict[str, Any]:
    """Save an order and its items to Supabase REST API"""
    # 1. Insert Order
    order_payload = {
        "id": order_data["id"],
        "total": order_data["total"],
        "status": order_data["status"],
        "createdAt": order_data["createdAt"].isoformat()
    }
    order_url = f"{SUPABASE_URL}/rest/v1/orders"
    order_res = httpx.post(order_url, headers=HEADERS, json=order_payload)
    order_res.raise_for_status()
    saved_order = order_res.json()[0]

    # 2. Insert Order Items
    items_payload = []
    for item in order_data["items"]:
        items_payload.append({
            "id": item["id"],
            "order_id": saved_order["id"],
            "productId": item["productId"],
            "quantity": item["quantity"],
            "price": item["price"],
            "notes": item.get("notes")
        })
    
    items_url = f"{SUPABASE_URL}/rest/v1/order_items"
    items_res = httpx.post(items_url, headers=HEADERS, json=items_payload)
    items_res.raise_for_status()
    
    saved_order["items"] = items_res.json()
    return saved_order
