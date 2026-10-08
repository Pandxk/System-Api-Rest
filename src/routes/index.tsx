import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown, Sun, Layers, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelPreview } from "@/components/storefront/model-preview";
import { fetchProducts } from "@/lib/products";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/")({
  head: () => pageHead("El futuro de la óptica", "VisionaryB2B: una nueva perspectiva para la óptica. Descubre nuestras colecciones y configura tus gafas en 3D."),
  loader: () => fetchProducts(),
  component: Home,
});
function Home() {
  const products = Route.useLoaderData();
  const featured = products && products.length > 0 ? products[0] : null;
  return <main className="view-enter pt-16">
    <section className="home-hero relative mx-auto max-w-7xl px-4 md:px-8">
      <div className="hero-model">{featured && <ModelPreview url={featured.model} lens={featured.lens} />}</div>
      <div className="hero-copy relative z-10">
        <p className="mb-6 flex items-center gap-3 text-xs font-medium text-primary"><span className="h-px w-8 bg-primary" />ÓPTICA CON UNA NUEVA PERSPECTIVA</p>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">Visionary<span className="text-primary">B2B</span><span className="mt-3 block">El futuro<br />de la óptica.</span></h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Diseño que inspira. Tecnología que se adapta. Una colección de gafas pensada para la próxima generación de ópticas.</p>
        <Button asChild size="lg" className="btn-cta mt-8 h-14 px-7 text-base"><Link to="/catalog">Explorar Catálogo<ArrowRight /></Link></Button>
        <p className="mt-5 text-xs text-muted-foreground">Colecciones exclusivas · Personalización 3D</p>
      </div>
      <div className="hero-caption text-xs text-muted-foreground"><span>01 / GREEN ROUND</span><span className="flex items-center gap-2">Nuestra historia<ArrowDown className="h-4 w-4" /></span></div>
    </section>
    <section className="story-section border-y border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div><p className="mb-5 text-xs text-primary">NUESTRA HISTORIA</p><h2 className="font-display text-3xl font-medium leading-tight md:text-4xl">Una visión diferente.<br /><span className="text-muted-foreground">Desde el primer día.</span></h2></div>
          <div><p className="text-lg leading-8">VisionaryB2B nace de una idea: que las gafas no solo cambien la forma de ver, sino también la forma de vivir cada entorno.</p><p className="mt-5 text-sm leading-7 text-muted-foreground">Nuestra visión une el diseño de monturas ligeras, la personalización y la tecnología óptica. Concebimos colecciones para distintas estaciones y estilos, con opciones de lentes y tratamientos pensadas para acompañar los cambios de luz y las condiciones de cada clima.</p><Button asChild variant="link" className="mt-6 px-0"><Link to="/about">Conoce nuestra historia<ArrowUpRightIcon /></Link></Button></div>
        </div>
        <div className="mt-14 grid gap-8 border-t border-border pt-8 md:grid-cols-3">
          {[{ icon: Fingerprint, title: "Diseño con identidad", text: "Monturas que combinan expresión personal y precisión en cada detalle." }, { icon: Layers, title: "Tecnología a tu medida", text: "Explora cada modelo en 3D y elige el color que define tu colección." }, { icon: Sun, title: "Cada clima, otra mirada", text: "Opciones de lentes y tratamientos para diferentes condiciones de luz." }].map(item => <div key={item.title}><item.icon className="mb-5 h-6 w-6 text-primary" /><h3 className="font-display text-base font-medium">{item.title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{item.text}</p></div>)}
        </div>
      </div>
    </section>
  </main>;
}
function ArrowUpRightIcon() { return <ArrowRight className="h-4 w-4" />; }
