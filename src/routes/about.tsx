import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/storefront/info-page";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/about")({ head: () => pageHead("Nuestra historia", "Conoce la visión de VisionaryB2B: diseño, personalización y tecnología para las ópticas."), component: About });
function About() { return <InfoPage label="NOSOTROS" title="Una nueva forma de ver." intro="Nuestra visión es acercar el diseño y la tecnología a cada óptica, con colecciones que expresan una identidad propia." sections={[
 { title: "Nuestro origen", text: "VisionaryB2B representa la unión entre creatividad y precisión. La historia de la marca comienza con una pregunta: ¿cómo crear gafas que acompañen tanto el estilo de cada persona como su entorno? Este relato es provisional y se actualizará con la historia real de la marca." },
 { title: "Diseño y tecnología", text: "La experiencia de personalización permite explorar cada montura en tres dimensiones y comparar colores. Los materiales, las formas y los tratamientos de cada modelo forman parte de una propuesta óptica centrada en la comodidad y la expresión personal." },
 { title: "Una mirada para cada entorno", text: "Las colecciones contemplan distintas estaciones y condiciones de luz. La selección de lentes y tratamientos deberá confirmarse según las prestaciones reales de cada producto; no todos los modelos cuentan con adaptación automática al clima." },
 ]} />; }
