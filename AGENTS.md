<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep mock product records in a shared browser-safe data module so catalog and configurator display the same product.
- Use TanStack file routes for home, catalog, product details, and informational pages so navigation and direct links work consistently.
- Keep category and cart state in a shared storefront provider around the routed content so navigation preserves filters and the order counter.
- Load the Three.js scene module lazily after hydration to keep browser rendering isolated from SSR.
- Serve local placeholder GLB glasses models and clone loaded scenes per viewer so simultaneous previews never reparent shared objects.
