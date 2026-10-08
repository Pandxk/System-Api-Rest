import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/storefront/info-page";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/privacy")({ head: () => pageHead("Políticas de Privacidad", "Información provisional sobre privacidad y protección de datos en VisionaryB2B."), component: Privacy });
function Privacy() { return <InfoPage label="PRIVACIDAD" title="Políticas de Privacidad" intro="La confianza comienza con claridad sobre el uso de la información." sections={[
 { title: "Información y finalidad", text: "La política definitiva detallará qué información se recopila, con qué finalidad y quién es responsable de su tratamiento. Esta versión contiene únicamente texto de muestra." },
 { title: "Tus derechos", text: "Los procedimientos para solicitar acceso, rectificación o eliminación de datos se incluirán junto con los canales de contacto oficiales, una vez confirmados." },
 { title: "Servicios y cookies", text: "El documento final identificará los proveedores, las herramientas de medición y las cookies utilizados. Este texto no constituye una política de privacidad completa ni describe de forma definitiva el tratamiento de datos." },
 ]} />; }
