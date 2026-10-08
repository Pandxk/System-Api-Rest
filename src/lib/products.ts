export type Category = "Todas" | "Gafas de medida" | "Gafas para sol" | "Primavera" | "Look Aesthetic";
export type Product = {
  id: string; name: string; sku: string; price: number; category: Exclude<Category, "Todas">;
  model: string; lens: string; material: string; weight: string;
  variants: { name: string; color: string; token: string }[];
};
export const CATEGORIES: Category[] = ["Todas", "Gafas de medida", "Gafas para sol", "Primavera", "Look Aesthetic"];

export async function fetchProducts(): Promise<Product[]> {
  try {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";
    const res = await fetch(`${API_URL}/api/catalog/`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((p: any) => {
      let defaultLens = "#2f6b45";
      let productVariants: Product["variants"] = [];

      if (p.category === "Gafas para sol") {
        defaultLens = "#111111"; // Negro
        productVariants = [
          { name: "Negro Oscuro", color: "#111111", token: "bg-zinc-900" },
          { name: "Ámbar Oscuro", color: "#8b4513", token: "bg-amber-800" },
          { name: "Verde Militar", color: "#2f4f4f", token: "bg-emerald-900" }
        ];
      } else if (p.category === "Gafas de medida") {
        defaultLens = "#e0f7fa"; // Transparente ligero
        productVariants = [
          { name: "Anti-Reflejo", color: "#e0f7fa", token: "bg-cyan-100" },
          { name: "Filtro Azul", color: "#e3f2fd", token: "bg-blue-100" },
          { name: "Transparente Claro", color: "#ffffff", token: "bg-white" }
        ];
      } else if (p.category === "Look Aesthetic") {
        defaultLens = "#ffb6c1"; // Rosa
        productVariants = [
          { name: "Rosa Pastel", color: "#ffb6c1", token: "bg-pink-300" },
          { name: "Púrpura Neón", color: "#8a2be2", token: "bg-purple-600" },
          { name: "Negro Matte", color: "#111111", token: "bg-zinc-900" }
        ];
      } else {
        // Primavera y Verano
        defaultLens = "#5aa9e6"; // Azul
        productVariants = [
          { name: "Azul Cielo", color: "#5aa9e6", token: "bg-blue-400" },
          { name: "Ámbar Brillo", color: "#e07a3f", token: "bg-amber-500" },
          { name: "Verde Esmeralda", color: "#2f6b45", token: "bg-green-600" }
        ];
      }

      return {
        id: String(p.id),
        name: p.name,
        sku: p.reference,
        price: p.price,
        category: p.category,
        model: p.model_url,
        lens: defaultLens,
        material: p.material,
        weight: p.weight,
        variants: productVariants
      };
    });
  } catch (e) {
    console.error("Backend offline or error", e);
    return [];
  }
}
