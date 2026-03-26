Egu Chidiebere Jared@DESKTOP-M9ID580 MINGW64 ~/Projects/handcrafted-haven (jared-image-input)
$ npm run dev

> handcrafted-haven@0.1.0 dev
> next dev

▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.222.50:3000

✓ Starting...
✓ Ready in 3.1s
Error: Route "/categories/[category]" used `params.category`. `params` is a Promise and must be unwrapped with `await` or `React.use()` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    at CategoryPage (src\app\categories\[category]\page.tsx:11:27)
   9 | export default function CategoryPage({ params }: CategoryPageProps) {
  10 |   // Convert URL param to lowercase
> 11 |   const category = params.category.replace("-", " ").toLowerCase();
     |                           ^
  12 |
  13 |   // Filter products for this category
  14 |   const filteredProducts = products.filter(
⨯ TypeError: Cannot read properties of undefined (reading 'replace')
    at CategoryPage (src\app\categories\[category]\page.tsx:11:36)
   9 | export default function CategoryPage({ params }: CategoryPageProps) {
  10 |   // Convert URL param to lowercase
> 11 |   const category = params.category.replace("-", " ").toLowerCase();
     |                                    ^
  12 |
  13 |   // Filter products for this category
  14 |   const filteredProducts = products.filter( {
  digest: '2061098777'
}
 GET /categories/jewelry 500 in 6.3s (compile: 4.9s, render: 1408ms)
