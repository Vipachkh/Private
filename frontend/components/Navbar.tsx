'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Coffee, LayoutDashboard, MonitorPlay, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'หน้าแรก', href: '/', icon: Coffee },
    { name: 'รับออเดอร์ (POS)', href: '/pos', icon: MonitorPlay },
    { name: 'สรุปยอดขาย', href: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-brand-white/90 backdrop-blur-md shadow-sm border-b border-brand-orange/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-serif text-3xl font-bold text-brand-brown tracking-wider">
              Vibe<span className="text-brand-orange">Cafe</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 font-medium transition-colors ${
                    isActive ? 'text-brand-orange' : 'text-brand-dark hover:text-brand-orange'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-brown focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-white border-t border-brand-brown/10 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md font-medium ${
                    isActive
                      ? 'bg-brand-orange/10 text-brand-orange'
                      : 'text-brand-dark hover:bg-brand-orange/5 hover:text-brand-orange'
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
