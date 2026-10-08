import { lazy, Suspense, useEffect, useState } from "react";
const Viewer = lazy(() => import("@/components/Scene").then(m => ({ default: m.GlassesViewer })));
export function ModelPreview(props: { url: string; lens: string; mini?: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <Suspense fallback={null}><Viewer {...props} /></Suspense> : null;
}
