import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelPreview } from "@/components/storefront/model-preview";
import { useStorefront } from "@/components/storefront/storefront";
import { fetchProducts } from "@/lib/products";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/catalog")({ 
  head: () => pageHead("Catálogo de gafas", "Explora nuestras colecciones de gafas y personaliza cada modelo en 3D."), 
  loader: () => fetchProducts(),
  component: Catalog 
});

function Catalog() {
 const { category } = useStorefront();
 const products = Route.useLoaderData();
 const filtered = products.filter(product => category === "Todas" || product.category === category);
 return (
        <main className="view-enter mx-auto max-w-7xl px-4 pb-12 pt-36 md:px-8 xl:pt-28">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div><p className="mb-2 text-sm text-muted-foreground">VISIONARYB2B / COLECCIÓN</p><h1 className="font-display text-3xl font-semibold">{category === "Todas" ? "Catálogo de gafas" : category}</h1></div>
            <span className="text-sm text-muted-foreground">{filtered.length} productos</span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => (
              <article key={product.id} data-testid="product-card" className="product-card group overflow-hidden rounded-lg border border-border transition-colors hover:border-primary/60">
                <Link to="/products/$productId" params={{ productId: product.id }} aria-label={`Ver ${product.name}`} className="product-preview relative block h-52 cursor-pointer overflow-hidden">
                  <div className="pointer-events-none h-full w-full"><ModelPreview url={product.model} lens={product.lens} mini /></div>
                  <span className="absolute left-4 top-3 text-[10px] text-muted-foreground">{product.category}</span>
                </Link>
                <div className="p-4">
                  <h2 className="font-display min-h-12 text-base font-semibold leading-6">{product.name}</h2>
                  <div className="mt-3 flex items-center justify-between"><span className="text-xl font-semibold">${product.price}</span><div className="flex gap-1.5" aria-label="Colores disponibles">{product.variants.map((v) => <span key={v.name} title={v.name} className={`h-3 w-3 rounded-full border border-foreground/30 ${v.token}`} />)}</div></div>
                  <Button asChild variant="secondary" className="mt-5 w-full justify-between"><Link to="/products/$productId" params={{ productId: product.id }}>Ver Detalles <ArrowUpRight /></Link></Button>
                </div>
              </article>
            ))}
          </div>
        </main>
);
}
