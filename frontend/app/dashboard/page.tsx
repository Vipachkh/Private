'use client';

import { TrendingUp, Receipt, Coffee, Calendar } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
};

type OrderItem = {
  productId: string;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/products')
        ]);
        
        if (ordersRes.ok && productsRes.ok) {
          setOrders(await ordersRes.json());
          setProducts(await productsRes.json());
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const stats = useMemo(() => {
    if (!orders.length || !products.length) return { totalSales: 0, totalOrders: 0, bestSellingProduct: null, maxQty: 0 };

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    
    // Calculate best selling item
    const itemCounts: Record<string, number> = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        itemCounts[item.productId] = (itemCounts[item.productId] || 0) + item.quantity;
      });
    });
    
    const bestSellingId = Object.keys(itemCounts).sort((a, b) => itemCounts[b] - itemCounts[a])[0];
    const bestSellingProduct = products.find(p => p.id === bestSellingId);

    return { totalSales, totalOrders, bestSellingProduct, maxQty: itemCounts[bestSellingId] || 0 };
  }, [orders, products]);

  if (loading) {
    return <div className="min-h-[calc(100vh-80px)] bg-brand-white p-6 md:p-10 flex justify-center items-center">
      <span className="text-xl text-brand-dark/50">กำลังโหลดข้อมูล Dashboard...</span>
    </div>;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-brand-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-brown">สรุปยอดขายประจำวัน</h1>
            <p className="text-brand-dark/60 mt-1 flex items-center gap-2">
              <Calendar size={16} /> วันนี้, {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button className="bg-brand-orange text-brand-white px-6 py-2 rounded-lg font-medium hover:bg-brand-brown transition-colors shadow-sm">
            ส่งออกรายงาน
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-brand-light rounded-2xl p-6 border border-brand-yellow/30 shadow-sm flex items-center gap-4">
            <div className="bg-brand-orange/10 p-4 rounded-xl text-brand-orange">
              <TrendingUp size={32} />
            </div>
            <div>
              <p className="text-brand-dark/70 text-sm font-medium">ยอดขายรวม (บาท)</p>
              <h3 className="text-3xl font-bold text-brand-dark mt-1">฿{stats.totalSales.toLocaleString()}</h3>
            </div>
          </div>
          
          <div className="bg-brand-light rounded-2xl p-6 border border-brand-yellow/30 shadow-sm flex items-center gap-4">
            <div className="bg-brand-sky/20 p-4 rounded-xl text-brand-sky">
              <Receipt size={32} />
            </div>
            <div>
              <p className="text-brand-dark/70 text-sm font-medium">จำนวนออเดอร์ (บิล)</p>
              <h3 className="text-3xl font-bold text-brand-dark mt-1">{stats.totalOrders}</h3>
            </div>
          </div>

          <div className="bg-brand-light rounded-2xl p-6 border border-brand-yellow/30 shadow-sm flex items-center gap-4">
            <div className="bg-brand-yellow/20 p-4 rounded-xl text-brand-yellow">
              <Coffee size={32} />
            </div>
            <div>
              <p className="text-brand-dark/70 text-sm font-medium">เมนูขายดีที่สุด</p>
              <h3 className="text-xl font-bold text-brand-dark mt-1 truncate max-w-[200px]">
                {stats.bestSellingProduct?.name || '-'}
              </h3>
              <p className="text-xs text-brand-orange mt-1">ขายได้ {stats.maxQty} แก้ว/ชิ้น</p>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-brand-light rounded-2xl border border-brand-yellow/30 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-brand-yellow/20 bg-brand-white">
            <h2 className="text-xl font-bold text-brand-brown">ออเดอร์ล่าสุด</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-yellow/5 text-brand-dark/70 text-sm">
                  <th className="p-4 font-medium border-b border-brand-yellow/20">รหัสออเดอร์</th>
                  <th className="p-4 font-medium border-b border-brand-yellow/20">เวลา</th>
                  <th className="p-4 font-medium border-b border-brand-yellow/20">รายการสินค้า</th>
                  <th className="p-4 font-medium border-b border-brand-yellow/20 text-right">ยอดรวม (บาท)</th>
                  <th className="p-4 font-medium border-b border-brand-yellow/20 text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-yellow/10">
                {orders.length === 0 ? (
                  <tr><td colSpan={5} className="text-center p-8 text-brand-dark/50">ยังไม่มีข้อมูลออเดอร์</td></tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="hover:bg-brand-white/50 transition-colors">
                      <td className="p-4 font-medium text-brand-dark">{order.id}</td>
                      <td className="p-4 text-brand-dark/70 text-sm">
                        {new Date(order.createdAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
                      </td>
                      <td className="p-4 text-brand-dark/80 text-sm max-w-xs truncate">
                        {order.items.map(item => {
                          const product = products.find(p => p.id === item.productId);
                          return `${product?.name} x${item.quantity}`;
                        }).join(', ')}
                      </td>
                      <td className="p-4 font-bold text-brand-orange text-right">
                        ฿{order.total.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                        }`}>
                          {order.status === 'completed' ? 'เสร็จสิ้น' : order.status === 'pending' ? 'รอดำเนินการ' : 'ยกเลิก'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
