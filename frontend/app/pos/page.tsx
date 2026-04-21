'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isRecommend: boolean;
};

type CartItem = Product & { quantity: number };

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [category, setCategory] = useState<'all' | 'coffee' | 'non-coffee' | 'bakery'>('all');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsSuccess(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const checkout = async () => {
    if (cart.length === 0) return;
    
    try {
      const orderItems = cart.map(item => ({
        id: "temp-" + item.id,
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: orderItems })
      });

      if (response.ok) {
        setCart([]);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกออเดอร์");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-brand-light">
      
      {/* Product List Section */}
      <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-hidden">
        <h1 className="text-3xl font-serif font-bold text-brand-brown mb-6">รับออเดอร์</h1>
        
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {['all', 'coffee', 'non-coffee', 'bakery'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as any)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                category === cat 
                ? 'bg-brand-orange text-brand-white' 
                : 'bg-brand-white text-brand-dark border border-brand-orange/20 hover:border-brand-orange'
              }`}
            >
              {cat === 'all' ? 'ทั้งหมด' : cat === 'coffee' ? 'กาแฟ' : cat === 'non-coffee' ? 'ไม่ใช่กาแฟ' : 'เบเกอรี่'}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex-1 flex justify-center items-center text-brand-dark/50">กำลังโหลดข้อมูล...</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 no-scrollbar pb-20">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => addToCart(product)}
                className="bg-brand-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-brand-yellow/50 group"
              >
                <div className="h-32 rounded-xl overflow-hidden mb-3">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-brand-dark text-sm md:text-base line-clamp-2">{product.name}</h3>
                <p className="text-brand-orange font-medium mt-1">฿{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Section */}
      <div className="w-full md:w-96 bg-brand-white border-l border-brand-orange/10 flex flex-col h-[calc(100vh-80px)] md:sticky top-20 shadow-lg z-10">
        <div className="p-6 border-b border-brand-orange/10 flex justify-between items-center bg-brand-yellow/5">
          <h2 className="text-xl font-bold flex items-center gap-2 text-brand-brown">
            <ShoppingCart size={24} /> รายการสั่งซื้อ
          </h2>
          <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-bold">{cart.length}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-brand-dark/40 space-y-4">
              <ShoppingCart size={48} className="opacity-20" />
              <p>ยังไม่มีสินค้าในตะกร้า</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-3 bg-brand-light p-3 rounded-xl border border-brand-orange/5">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-brand-dark leading-tight">{item.name}</h4>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-brand-orange font-medium text-sm">฿{item.price}</p>
                    <div className="flex items-center gap-2 bg-brand-white rounded-lg border border-brand-orange/20">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-brand-orange">
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-brand-orange">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-brand-white border-t border-brand-orange/10 pb-8 md:pb-6 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between mb-4 text-brand-dark">
            <span className="font-medium text-lg">รวมทั้งสิ้น</span>
            <span className="font-bold text-2xl text-brand-orange">฿{total.toLocaleString()}</span>
          </div>
          <button 
            onClick={checkout}
            disabled={cart.length === 0 || loading}
            className="w-full py-4 bg-brand-orange text-brand-white rounded-xl font-bold text-lg hover:bg-brand-brown transition-colors disabled:opacity-50 disabled:hover:bg-brand-orange"
          >
            {isSuccess ? 'บันทึกออเดอร์สำเร็จ!' : 'ชำระเงิน / ยืนยัน'}
          </button>
        </div>
      </div>

    </div>
  );
}
