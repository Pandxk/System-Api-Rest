import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { useStorefront } from "./storefront";
import { ModelPreview } from "./model-preview";

export function CartSidebar() {
  const { cartItems, updateQuantity, cartCount, cartTotal } = useStorefront();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Mi Carrito: ${cartCount} unidades`} title={`Mi Carrito: ${cartCount} unidades`} className="relative shrink-0 rounded-full border border-border hover:bg-accent/50">
          <ShoppingCart />
          {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">{cartCount}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2 text-2xl">
            <ShoppingCart className="h-6 w-6" /> Mi Carrito
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-6 pr-2">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <ShoppingCart className="mb-4 h-12 w-12 opacity-20" />
              <p>Tu pedido está vacío.</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item, idx) => (
                <li key={`${item.product.id}-${item.lens}-${idx}`} className="flex gap-4 border-b border-border pb-6">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-accent/30 relative">
                    <div className="pointer-events-none absolute inset-0 -top-4 scale-150"><ModelPreview url={item.product.model} lens={item.lens} mini /></div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-display font-medium leading-tight">{item.product.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">REF: {item.product.sku}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <span className="inline-block h-3 w-3 rounded-full border border-border" style={{ backgroundColor: item.lens }} />
                        <span className="uppercase text-muted-foreground">Lente Seleccionado</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 rounded-md border border-border">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none" onClick={() => updateQuantity(item.product.id, item.lens, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                        <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none" onClick={() => updateQuantity(item.product.id, item.lens, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                      </div>
                      <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => updateQuantity(item.product.id, item.lens, 0)}>
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <SheetFooter className="border-t border-border pt-6 mt-auto">
          <div className="w-full">
            <div className="mb-4 flex items-center justify-between font-display text-lg font-semibold">
              <span>Total estimado</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button disabled={cartItems.length === 0} className="w-full h-12 text-sm font-semibold">
              PROCEDER AL PAGO
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
