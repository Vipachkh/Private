-- Create the 'products' table
CREATE TABLE public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category TEXT,
    "imageUrl" TEXT,
    "isRecommend" BOOLEAN DEFAULT FALSE
);

-- Create the 'orders' table
CREATE TABLE public.orders (
    id TEXT PRIMARY KEY,
    total NUMERIC NOT NULL,
    status TEXT DEFAULT 'completed',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create the 'order_items' table
CREATE TABLE public.order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
    "productId" TEXT REFERENCES public.products(id),
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL,
    notes TEXT
);

-- Seed initial products data
INSERT INTO public.products (id, name, description, price, category, "imageUrl", "isRecommend") VALUES
('p1', 'STCraf Orange Espresso', 'เอสเพรสโซ่ช็อตเข้มข้น ผสานความสดชื่นจากน้ำส้มคั้นสด ท็อปด้วยโรสแมรี่เพิ่มความหอมละมุน', 199, 'coffee', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2070&auto=format&fit=crop', TRUE),
('p2', 'Vintage Dirty', 'นมเย็นจัดสูตรพิเศษ ราดด้วยช็อตเอสเพรสโซ่ร้อนๆ ได้รสสัมผัสที่แตกต่างในทุกคำ', 110, 'coffee', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop', FALSE),
('p3', 'Classic Butter Croissant', 'ครัวซองต์เนยฝรั่งเศสแท้ อบสดใหม่ทุกวัน กรอบนอกนุ่มใน หอมกรุ่น', 85, 'bakery', 'https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=2070&auto=format&fit=crop', FALSE),
('p4', 'Summer Sunshine Soda', 'อิตาเลียนโซดาสีเหลืองสดใส เปรี้ยวอมหวานดื่มแล้วสดชื่น คลายร้อนได้ดี', 95, 'non-coffee', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1974&auto=format&fit=crop', TRUE),
('p5', 'Iced Americano', 'อเมริกาโน่เย็น เมล็ดกาแฟคั่วกลาง-เข้ม หอมกลิ่นช็อกโกแลตและถั่ว', 90, 'coffee', 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1974&auto=format&fit=crop', FALSE),
('p6', 'Lemon Tart', 'เลม่อนทาร์ตเปรี้ยวจี๊ดจ๊าด ตัดกับเมอแรงค์หวานละมุน', 130, 'bakery', 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=2066&auto=format&fit=crop', FALSE);
