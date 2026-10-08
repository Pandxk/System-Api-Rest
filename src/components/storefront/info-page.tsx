import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export function InfoPage({ label, title, intro, sections }: { label: string; title: string; intro: string; sections: { title: string; text: string }[] }) {
  return <main className="view-enter mx-auto max-w-4xl px-4 pb-12 pt-28 md:px-8">
    <Button asChild variant="ghost" className="mb-8 px-0"><Link to="/"><ArrowLeft />Volver al inicio</Link></Button>
    <p className="mb-4 text-xs text-primary">VISIONARYB2B / {label}</p>
    <h1 className="font-display text-3xl font-semibold leading-tight md:text-5xl">{title}</h1>
    <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{intro}</p>
    <article className="glass-panel mt-10 rounded-lg p-6 md:p-10"><p className="mb-8 border-b border-border pb-4 text-xs text-muted-foreground">Contenido provisional · Pendiente de revisión</p><div className="space-y-8">{sections.map(section => <section key={section.title}><h2 className="font-display text-xl font-medium">{section.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{section.text}</p></section>)}</div></article>
  </main>;
}
