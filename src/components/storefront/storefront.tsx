import { createContext, lazy, Suspense, useContext, useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, type Category, type Product } from "@/lib/products";
import { CartSidebar } from "./cart-sidebar";
import type { Palette } from "@/components/Scene";
const CloudBackground = lazy(() => import("@/components/Scene").then(m => ({ default: m.CloudBackground })));
const SKY_KEYS: Record<Category, string> = { Todas: "all", "Gafas de medida": "optical", "Gafas para sol": "sun", Primavera: "spring", "Look Aesthetic": "aesthetic" };
export type CartItem = { product: Product; lens: string; quantity: number; };
const StoreContext = createContext<{ 
  category: Category; 
  setCategory: (category: Category) => void; 
  cartItems: CartItem[]; 
  addToCart: (product: Product, lens: string) => void;
  updateQuantity: (id: string, lens: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
} | null>(null);
export function useStorefront() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("Storefront provider is required");
  return context;
}
const footerLinks = [
  { to: "/about", label: "Acerca de Nosotros", detail: "Nuestra historia" },
  { to: "/contact", label: "Contacto", detail: "Hablemos de tu negocio" },
  { to: "/terms", label: "Términos y Servicios", detail: "Condiciones comerciales" },
  { to: "/privacy", label: "Políticas de Privacidad", detail: "Tu información, protegida" },
] as const;
export function Storefront({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<Category>("Todas");
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("b2b_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("b2b_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, lens: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.lens === lens);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, lens, quantity: 1 }]; // Añade 1 unidad
    });
  };

  const updateQuantity = (id: string, lens: string, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) return prev.filter(item => !(item.product.id === id && item.lens === lens));
      return prev.map(item => (item.product.id === id && item.lens === lens) ? { ...item, quantity } : item);
    });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const [palette, setPalette] = useState<Palette | null>(null);
  const { pathname } = useLocation();
  const shop = pathname === "/catalog" || pathname.startsWith("/products/");
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const prefix = `--sky-${SKY_KEYS[category]}`;
    setPalette({ top: css.getPropertyValue(`${prefix}-top`).trim(), bottom: css.getPropertyValue(`${prefix}-bottom`).trim(), cloud: css.getPropertyValue(`${prefix}-cloud`).trim() });
  }, [category]);
  return <StoreContext.Provider value={{ category, setCategory, cartItems, addToCart, updateQuantity, cartCount, cartTotal }}>
    <div className="relative isolate flex min-h-screen flex-col overflow-x-clip text-foreground">
      <div className="fixed inset-0 -z-10 bg-background">{palette && <Suspense fallback={null}><CloudBackground palette={palette} /></Suspense>}</div>
      <header className="glass-nav fixed inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-8">
          <Button asChild variant="ghost" className="font-display h-auto px-0 text-xl font-semibold"><Link to="/" aria-label="VisionaryB2B — Inicio">Visionary<span className="text-primary">B2B</span></Link></Button>
          {shop && <nav aria-label="Colecciones" className="hidden items-center gap-1 xl:flex">{CATEGORIES.map(c => <Button asChild key={c} variant="ghost" className={`chip ${category === c ? "chip-active" : ""}`}><Link to="/catalog" onClick={() => setCategory(c)} aria-current={category === c ? "true" : undefined}>{c}</Link></Button>)}</nav>}
          <nav aria-label="Navegación principal" className="flex items-center gap-1 md:gap-4">
            <Button asChild variant="ghost" className="hidden md:inline-flex"><Link to="/about">Nuestra historia</Link></Button>
            <Button asChild variant="ghost"><Link to="/catalog" activeProps={{ className: "text-primary" }}>Catálogo</Link></Button>
            <CartSidebar />
          </nav>
        </div>
        {shop && <nav aria-label="Categorías" className="flex gap-2 overflow-x-auto px-4 pb-3 xl:hidden">{CATEGORIES.map(c => <Button asChild key={c} variant="ghost" className={`chip shrink-0 ${category === c ? "chip-active" : ""}`}><Link to="/catalog" onClick={() => setCategory(c)} aria-current={category === c ? "true" : undefined}>{c}</Link></Button>)}</nav>}
      </header>
      <div className="flex-1">{children}</div>
      <footer className="site-footer mt-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4"><Link to="/" className="font-display text-2xl font-semibold">Visionary<span className="text-primary">B2B</span></Link><p className="text-sm text-muted-foreground">Una nueva perspectiva para tu óptica.</p></div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">{footerLinks.map(link => <div key={link.to}><Button asChild variant="link" className="h-auto justify-start whitespace-normal p-0 text-left text-foreground"><Link to={link.to}>{link.label}<ArrowUpRight /></Link></Button><p className="mt-3 text-xs text-muted-foreground">{link.detail}</p></div>)}</div>
          <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground"><span>© 2026 VisionaryB2B</span><span>Diseño · Tecnología · Visión</span></div>
        </div>
      </footer>
    </div>
  </StoreContext.Provider>;
}
