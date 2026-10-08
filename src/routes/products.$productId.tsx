import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelPreview } from "@/components/storefront/model-preview";
import { useStorefront } from "@/components/storefront/storefront";
import { fetchProducts, type Product } from "@/lib/products";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/products/$productId")({
 loader: async ({ params }) => {
    const products = await fetchProducts();
    const product = products.find(p => p.id === params.productId);
    if (!product) throw notFound();
    return product;
 },
 head: ({ loaderData }) => pageHead(loaderData?.name ?? "Modelo no encontrado", "Personaliza el color de tus gafas, consulta sus especificaciones y añádelas al carrito."),
 component: ProductPage,
 notFoundComponent: () => <main className="mx-auto max-w-4xl px-4 pt-36 pb-12"><h1 className="font-display text-3xl">Modelo no encontrado</h1><Button asChild className="mt-6"><Link to="/catalog">Volver al catálogo</Link></Button></main>,
});

function ProductPage() {
 const product = Route.useLoaderData();
 return <Configurator key={product.id} p={product} />;
}

function Configurator({ p }: { p: Product }) {
 const [lens, setLens] = useState(p.lens);
 const [tab, setTab] = useState<"spec" | "treat">("spec");
 const { addToCart } = useStorefront();
 return (
      <main key={p.id} className="view-enter relative mx-auto min-h-screen max-w-7xl px-4 pb-8 pt-36 md:px-8 xl:pt-28">
        <Button asChild variant="ghost" className="relative z-10 mb-4 px-0"><Link to="/catalog"><ArrowLeft /> Volver al catálogo</Link></Button>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="relative h-[360px] min-w-0 md:h-[480px] lg:h-[620px]">
          <ModelPreview url={p.model} lens={lens} />
        </div>

        <aside className="glass-panel relative z-10 rounded-lg p-6 md:p-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/15 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-success">
            <ShieldCheck className="h-3.5 w-3.5" /> VERIFICADO ORIGINAL
          </span>
          <h1 className="font-display mt-5 text-3xl font-semibold leading-tight">{p.name}</h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">REF: {p.sku}</p>

          <div className="mt-6 flex items-end gap-2">
            <span className="font-display text-5xl font-semibold">${p.price}</span>
            <span className="pb-2 text-sm text-muted-foreground"></span>
          </div>

          <div className="mt-5 flex gap-3" aria-label="Color de lentes">
            {p.variants.map((v) => <Button key={v.name} variant="ghost" size="icon" aria-label={`Color ${v.name}`} aria-pressed={lens === v.color} title={v.name} onClick={() => setLens(v.color)} className={`h-7 w-7 rounded-full border-2 ${v.token} ${lens === v.color ? "border-foreground ring-2 ring-foreground/20" : "border-transparent"}`} />)}
          </div>
          <div className="mt-6 grid grid-cols-2 rounded-lg border border-border p-1 text-sm">
            {(["spec", "treat"] as const).map((t) => (
              <Button variant="ghost" aria-pressed={tab === t} key={t} onClick={() => setTab(t)} className={`rounded-md py-2 transition ${tab === t ? "bg-accent text-foreground" : "text-muted-foreground"}`}>
                {t === "spec" ? "Especificaciones" : "Tratamientos"}
              </Button>
            ))}
          </div>

          {tab === "spec" ? (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[["MATERIAL", p.material], ["PESO", p.weight], ["PUENTE", "18 mm"], ["GARANTÍA", "24 meses"]].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border bg-accent/40 p-3">
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground">{k}</p>
                  <p className="mt-1 text-sm font-medium">{v}</p>
                </div>
              ))}
            </div>
          ) : (
            <ul className="mt-4 space-y-2 text-sm">
              {["Antirreflejante multicapa", "Filtro luz azul", "Protección UV400", "Capa hidrofóbica"].map((t) => (
                <li key={t} className="flex items-center justify-between rounded-lg border border-border bg-accent/40 px-3 py-2.5">
                  {t} <Plus className="h-4 w-4 text-muted-foreground" />
                </li>
              ))}
            </ul>
          )}

          <Button onClick={() => addToCart(p, lens)} className="btn-cta mt-6 w-full h-auto min-h-12 whitespace-normal rounded-lg py-4 text-xs font-semibold">
            AÑADIR AL CARRITO
          </Button>
        </aside>
        </div>
      </main>);
}
