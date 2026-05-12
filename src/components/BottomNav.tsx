import { Home, ArrowRightLeft, Activity, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Bridge", href: "/bridge", icon: ArrowRightLeft },
    { label: "Activity", href: "/activity", icon: Activity },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe">
      <div className="mx-auto max-w-[430px] w-full flex items-center justify-around h-16 px-6">
        {navItems.map((item) => {
          const isActive = location === item.href || (location.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] ${
                isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
              }`}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <item.icon className="w-6 h-6 stroke-[2px]" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
