import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/storefront/info-page";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/terms")({ head: () => pageHead("Términos y Servicios", "Consulta las condiciones comerciales provisionales de VisionaryB2B."), component: Terms });
function Terms() { return <InfoPage label="INFORMACIÓN LEGAL" title="Términos y Servicios" intro="Condiciones de uso y marco comercial de la experiencia VisionaryB2B." sections={[
 { title: "Uso del sitio", text: "Este sitio presenta un catálogo de demostración para profesionales de la óptica. Los productos, precios y especificaciones mostrados son ejemplos y no constituyen una oferta comercial vinculante." },
 { title: "Pedidos y disponibilidad", text: "Añadir un producto al contador no formaliza una compra. Las condiciones de pago, cantidades mínimas, disponibilidad y entrega se definirán en la versión comercial del servicio." },
 { title: "Condiciones definitivas", text: "Este contenido es provisional y no sustituye asesoramiento legal. Antes de aceptar pedidos reales, se publicarán las condiciones revisadas y los datos de la entidad responsable." },
 ]} />; }
