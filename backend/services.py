from typing import List
from datetime import datetime
import uuid
from schemas import Product, OrderCreate, Order
import repositories

def get_all_products() -> List[Product]:
    db_products = repositories.get_all_products()
    return [Product(**p) for p in db_products]

def get_all_orders() -> List[Order]:
    db_orders = repositories.get_all_orders()
    result = []
    for o in db_orders:
        items = [{"id": i["id"], "productId": i["productId"], "quantity": i["quantity"], "price": i["price"], "notes": i.get("notes")} for i in o.get("items", [])]
        result.append(Order(
            id=o["id"], items=items, total=o["total"], status=o["status"], createdAt=o["createdAt"]
        ))
    return result

def create_order(order_data: OrderCreate) -> Order:
    total = 0.0
    items = []
    
    for item in order_data.items:
        product = repositories.get_product_by_id(item.productId)
        if product:
            price = product["price"]
            total += price * item.quantity
            items.append({
                "id": str(uuid.uuid4()),
                "productId": item.productId,
                "quantity": item.quantity,
                "price": price,
                "notes": item.notes
            })
            
    order_id = f"ORD-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}-{str(uuid.uuid4())[:4]}"
            
    new_order = {
        "id": order_id,
        "items": items,
        "total": total,
        "status": "completed",
        "createdAt": datetime.utcnow()
    }
    
    saved_order = repositories.save_order(new_order)
    
    saved_items = [{"id": i["id"], "productId": i["productId"], "quantity": i["quantity"], "price": i["price"], "notes": i.get("notes")} for i in saved_order.get("items", [])]
    return Order(
        id=saved_order["id"],
        items=saved_items,
        total=saved_order["total"],
        status=saved_order["status"],
        createdAt=saved_order["createdAt"]
    )
