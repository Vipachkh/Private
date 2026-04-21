'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isRecommend: boolean;
};

export default function Home() {
  const [recommendProducts, setRecommendProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data: Product[] = await response.json();
          setRecommendProducts(data.filter(p => p.isRecommend));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" 
            alt="Cafe Interior" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-brand-yellow/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-white via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="font-sans text-brand-orange text-xl md:text-2xl font-semibold tracking-widest mb-4 bg-brand-white/80 inline-block px-4 py-1 rounded-full">
            SUMMER VIBES
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-dark mb-6 leading-tight drop-shadow-md font-serif">
            Welcome to <br/><span className="text-brand-orange">VibeCafe</span>
          </h1>
          <p className="text-brand-dark/90 bg-brand-white/70 backdrop-blur-sm p-4 rounded-xl text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto shadow-sm">
            สัมผัสบรรยากาศโมเดิร์นสดใส คลอเคล้าเสียงแผ่นเสียงไวนิลคลาสสิก พร้อมมุมโซฟาสุดชิลล์และพรมผืนนุ่ม
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pos" className="px-8 py-4 bg-brand-orange text-brand-white rounded-full font-medium text-lg hover:bg-brand-brown hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              สั่งเครื่องดื่มเลย
            </Link>
          </div>
        </div>
      </section>

      {/* Vibe & Decor Section */}
      <section className="py-20 md:py-32 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden border-8 border-brand-white shadow-xl transform -rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Modern Cafe Sofa and Rug" 
                  className="w-full h-[500px] object-cover" 
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-2/3 rounded-3xl overflow-hidden border-8 border-brand-white shadow-2xl z-20 transform rotate-3 hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1601314156644-8d96b010c284?q=80&w=1969&auto=format&fit=crop" 
                  alt="Vinyl Record Player" 
                  className="w-full h-[300px] object-cover" 
                />
              </div>
              {/* Decorative Summer Shape */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-yellow/30 rounded-full blur-3xl -z-10"></div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <span className="w-12 h-[2px] bg-brand-sky"></span>
                <span className="text-brand-sky font-medium tracking-wider uppercase">Our Aesthetic</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-brown leading-tight">
                Modern Summer <br /> Meets Classic Vinyl
              </h2>
              <p className="text-brand-dark/80 text-lg leading-relaxed">
                เราตั้งใจออกแบบ VibeCafe ให้เป็นพื้นที่พักผ่อนที่ให้ความรู้สึกเหมือนอยู่บ้านเพื่อน 
                ด้วยโทนสีสว่างสดใสรับซัมเมอร์ ตัดกับเฟอร์นิเจอร์สไตล์โมเดิร์น
              </p>
              <p className="text-brand-dark/80 text-lg leading-relaxed">
                มุมโปรดของหลายคนคือโซฟานุ่มๆ บนพรมผืนใหญ่ พร้อมฟังเสียงเพลงจากเครื่องเล่นแผ่นเสียงไวนิลที่ขับกล่อมตลอดวัน 
                ให้คุณได้จิบกาแฟแก้วโปรดในบรรยากาศที่ดีที่สุด
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-20 md:py-32 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center space-x-2 mb-4">
              <span className="w-8 h-[2px] bg-brand-orange"></span>
              <span className="text-brand-orange font-medium tracking-wider uppercase">Summer Specials</span>
              <span className="w-8 h-[2px] bg-brand-orange"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-brown mb-6">เมนูแนะนำคลายร้อน</h2>
          </div>

          {loading ? (
            <div className="text-center text-brand-dark/50 py-10">กำลังโหลดข้อมูล...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {recommendProducts.map((product) => (
                <div key={product.id} className="group bg-brand-light rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-yellow/20">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4 bg-brand-yellow text-brand-dark font-bold px-4 py-1 rounded-full text-sm shadow-md">
                      Recommend
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="text-xl font-serif font-bold text-brand-brown mb-2 group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-brand-dark/70 mb-4 text-sm">{product.description}</p>
                    <span className="text-lg font-medium text-brand-orange border-b border-brand-orange pb-1">
                      ฿ {product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <footer className="bg-brand-brown text-brand-white py-10 text-center">
        <p>© 2026 VibeCafe. All rights reserved.</p>
      </footer>
    </div>
  );
}
