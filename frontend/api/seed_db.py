import httpx
import os
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

mock_products = [
  {
    "id": 'p1',
    "name": 'STCraf Orange Espresso',
    "description": 'เอสเพรสโซ่ช็อตเข้มข้น ผสานความสดชื่นจากน้ำส้มคั้นสด ท็อปด้วยโรสแมรี่เพิ่มความหอมละมุน',
    "price": 199,
    "category": 'coffee',
    "imageUrl": 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2070&auto=format&fit=crop',
    "isRecommend": True,
  },
  {
    "id": 'p2',
    "name": 'Vintage Dirty',
    "description": 'นมเย็นจัดสูตรพิเศษ ราดด้วยช็อตเอสเพรสโซ่ร้อนๆ ได้รสสัมผัสที่แตกต่างในทุกคำ',
    "price": 110,
    "category": 'coffee',
    "imageUrl": 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop',
    "isRecommend": False,
  },
  {
    "id": 'p3',
    "name": 'Classic Butter Croissant',
    "description": 'ครัวซองต์เนยฝรั่งเศสแท้ อบสดใหม่ทุกวัน กรอบนอกนุ่มใน หอมกรุ่น',
    "price": 85,
    "category": 'bakery',
    "imageUrl": 'https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=2070&auto=format&fit=crop',
    "isRecommend": False,
  },
  {
    "id": 'p4',
    "name": 'Summer Sunshine Soda',
    "description": 'อิตาเลียนโซดาสีเหลืองสดใส เปรี้ยวอมหวานดื่มแล้วสดชื่น คลายร้อนได้ดี',
    "price": 95,
    "category": 'non-coffee',
    "imageUrl": 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1974&auto=format&fit=crop',
    "isRecommend": True,
  },
  {
    "id": 'p5',
    "name": 'Iced Americano',
    "description": 'อเมริกาโน่เย็น เมล็ดกาแฟคั่วกลาง-เข้ม หอมกลิ่นช็อกโกแลตและถั่ว',
    "price": 90,
    "category": 'coffee',
    "imageUrl": 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1974&auto=format&fit=crop',
    "isRecommend": False,
  },
  {
    "id": 'p6',
    "name": 'Lemon Tart',
    "description": 'เลม่อนทาร์ตเปรี้ยวจี๊ดจ๊าด ตัดกับเมอแรงค์หวานละมุน',
    "price": 130,
    "category": 'bakery',
    "imageUrl": 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=2066&auto=format&fit=crop',
    "isRecommend": False,
  }
]

def seed_data():
    print("Checking if products table exists and is empty...")
    try:
        url = f"{SUPABASE_URL}/rest/v1/products?select=*"
        res = httpx.get(url, headers=HEADERS)
        if res.status_code == 404:
            print("Error: The 'products' table does not exist.")
            print("Please create the table in Supabase Dashboard first.")
            return
            
        res.raise_for_status()
        existing = res.json()
        
        if len(existing) > 0:
            print(f"Products table already contains {len(existing)} items. Skipping seed.")
            return
            
        print("Inserting mock data into Supabase...")
        post_url = f"{SUPABASE_URL}/rest/v1/products"
        post_res = httpx.post(post_url, headers=HEADERS, json=mock_products)
        
        if post_res.status_code in [200, 201]:
            print("Successfully inserted mock data!")
        else:
            print(f"Failed to insert data: {post_res.status_code} - {post_res.text}")
            
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    seed_data()
