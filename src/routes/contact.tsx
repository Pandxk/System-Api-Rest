import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/storefront/info-page";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/contact")({ head: () => pageHead("Contacto", "Información de contacto comercial y atención para ópticas de VisionaryB2B."), component: Contact });
function Contact() { return <InfoPage label="CONTACTO" title="Hablemos de tu próxima colección." intro="Un espacio para conectar con el equipo comercial de VisionaryB2B." sections={[
 { title: "Atención comercial", text: "Aquí encontrarás los canales oficiales para consultar colecciones, personalización y pedidos profesionales. Los datos de contacto están pendientes de confirmación." },
 { title: "Soporte para ópticas", text: "Nuestro equipo podrá orientarte sobre los modelos y las opciones disponibles. Esta página es una muestra: todavía no hay un canal de atención conectado ni se envían solicitudes desde el sitio." },
 ]} />; }
