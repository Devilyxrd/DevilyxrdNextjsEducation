# Next.js + App Router + TypeScript + Zustand — Junior'dan Mid Level'a Geçiş Rehberi

> Bu doküman, React'i biraz bilen bir geliştiricinin **kendi başına Next.js
> tarafına geçişini ve mid level'a yükselmesini** yapılandıran bir
> **eğitim + referans handbook** birleşimidir.
>
> Amaç: React'te `useState`/`useEffect` yazabilen birini **4–6 hafta içinde**
> Next.js App Router, Server/Client component ayrımı, file-based routing,
> `next/image` optimizasyonu, session yönetimi ve production-ready frontend
> pratiklerine taşımak.
>
> Bu rehber **okumak için değil, yazarak ilerlemek için** hazırlanmıştır.
> Her bölümün sonundaki **görev tamamlanmadan** bir sonrakine geçilmesi
> önerilmez.

---

## 🎯 Bu Rehber Kime Yönelik?

- React'te component yazabilen ama Next.js'in "server component" terimini
  duyunca bulanıklaşan
- `pages/` dizinini duymuş ama App Router'a henüz bakmamış
- SSR, SSG, ISR kısaltmalarının hepsini aynı şey sanan
- `next/link` ve `next/image` var diye duymuş ama hâlâ `<a>` / `<img>` yazan
- Zustand'ı biliyor ama Next.js'te SSR + `localStorage` çelişkisini
  nereden çözeceğini bilmeyen
- Junior maaşı alıp mid level Next.js iş bulmaya hazırlanan

---

## 🧭 Rehberin Mantığı

- **Tek stack:** Next.js (App Router) + TypeScript + Tailwind + Zustand + Lucide
- **Backend yok:** Bu rehber **sadece frontend**. API ihtiyacı olduğu
  yerlerde mock fonksiyonlar + `setTimeout` kullanılır. Gerçek backend
  kendi işin (Next.js'in `api/route.ts`'leri de ileride).
- **State:** UI + domain + session — **hepsi Zustand**. Redux Toolkit
  sonraki adım.
- **Server vs Client Component:** Varsayılan olarak her component
  server'dır; state / event / hook gerektiren her şey `'use client'` ile
  işaretlenir.
- **Session persist:** `localStorage` tabanlı, `hydrated` flag'i ile
  hidrasyon sonrası redirect flash'ı önlenir.
- **Mid level hedefi:** Next.js ile tek başına production-grade SPA +
  SSR hibrit uygulaması kurabilmek.

---

## 🚀 Bu Repodaki Demo Proje

Bu repo, rehberde anlatılan konseptlerin **çalışan bir e-ticaret uygulamasında**
uygulanmış halini barındırır. Backend yok; tüm veri mock / `localStorage`
üzerinden. Amaç: öğrenirken bakman, karıştırman, kırman için **tek kaynakta
her şey**.

### Hızlı Kurulum

```bash
yarn install
yarn dev          # http://localhost:3000
yarn build        # production build
yarn start        # build çıktısını prod modda çalıştır
```

### 🔐 Demo Hesap

| Alan | Değer |
|------|-------|
| **E-posta** | `demo@local` |
| **Şifre** | `demo1234` |
| **Güvenlik Sorusu** | İlk evcil hayvanımın adı? |
| **Cevap** | `pamuk` |

`/register` üzerinden kendi hesabını da oluşturabilirsin — register +
session + forgot-password akışları çalışır durumda (mock auth servisi).

### Sayfa Haritası

| Path | Grup | Auth | Açıklama |
|------|------|------|----------|
| `/` | root | public | Anasayfa — hero + öne çıkan ürünler + feature grid |
| `/products` | (shop) | public | Ürün listesi + kategori filtresi + arama (debounce) |
| `/about` | (shop) | public | Hakkımızda — statik server component |
| `/contact` | (shop) | public | İletişim formu (client, elle validation) |
| `/cart` | (shop) | public | Sepet — Zustand + `persist`, ücretsiz kargo bar'ı |
| `/login` | (auth) | public | Giriş — `useSearchParams` + Suspense |
| `/register` | (auth) | public | Kayıt ol — güvenlik sorusu ile |
| `/forgot-password` | (auth) | public | 2-adımlı şifre sıfırlama (state machine) |
| `/checkout` | (shop) | **protected** | Ödeme — teslimat + createOrder |
| `/orders` | (shop) | **protected** | Siparişlerim — status badge, teslimat detayı |
| `*` | — | — | `app/not-found.tsx` — 404 sayfası |

### Feature-Based Klasör Yapısı

```
src/
├── app/                                  ← App Router — sadece routing dosyaları
│   ├── layout.tsx                        ← Root <html> + globals.css + metadata
│   ├── page.tsx                          ← /  (anasayfa)
│   ├── not-found.tsx                     ← 404
│   ├── globals.css                       ← Tailwind v4 entry + @theme + keyframes
│   │
│   ├── (shop)/                           ← Route group — Navbar + Footer + Toast
│   │   ├── layout.tsx
│   │   ├── products/page.tsx             ← thin wrapper → ProductsPage
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── orders/page.tsx               ← ProtectedRoute wrap
│   │   └── checkout/page.tsx             ← ProtectedRoute wrap
│   │
│   └── (auth)/                           ← Route group — Navbar only, AuthCard
│       ├── layout.tsx
│       ├── login/page.tsx                ← Suspense ile LoginForm sarılı
│       ├── register/page.tsx
│       └── forgot-password/page.tsx
│
├── features/                             ← Her feature kendi başına bir modül
│   ├── auth/
│   │   ├── components/
│   │   │   ├── AuthCard.tsx              ← server component, layout karma
│   │   │   ├── LoginForm.tsx             ← useState form + router.replace
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx    ← 3-step state machine
│   │   │   └── ProtectedRoute.tsx        ← hydrated flag guard
│   │   ├── services/auth.service.ts      ← Mock API (setTimeout latency)
│   │   └── store/session.store.ts        ← Zustand + persist + hydrated flag
│   │
│   ├── products/
│   │   ├── components/
│   │   │   ├── ProductsPage.tsx          ← useEffect fetch + useDebounce + useMemo
│   │   │   ├── ProductCard.tsx           ← next/image fill, hover scale
│   │   │   └── ProductGrid.tsx
│   │   ├── data/products.mock.ts         ← 17 ürün + fetchProducts() Promise
│   │   └── types.ts
│   │
│   ├── cart/
│   │   ├── components/CartPage.tsx, CartItemRow.tsx
│   │   ├── store/cart.store.ts           ← Zustand + persist
│   │   └── types.ts
│   │
│   ├── orders/
│   │   ├── components/OrdersPage.tsx, OrderCard.tsx
│   │   └── store/orders.store.ts
│   │
│   ├── checkout/
│   │   └── components/CheckoutPage.tsx   ← Snapshot cart → createOrder → redirect
│   │
│   └── home/
│       └── components/
│           ├── HomePage.tsx
│           ├── HeroSection.tsx           ← server component, statik
│           ├── FeaturedProducts.tsx      ← client, useEffect fetch
│           ├── FeatureGrid.tsx
│           ├── AboutPage.tsx             ← server component
│           └── ContactPage.tsx           ← client, form state
│
├── shared/                               ← Feature'lar arası paylaşılan kod
│   ├── components/
│   │   ├── ui/                           ← Button, Input, Card, Badge, Spinner,
│   │   │                                   EmptyState, ToastContainer
│   │   └── layout/                       ← Navbar, Footer, ScrollToTop
│   ├── hooks/useDebounce.ts
│   ├── store/ui.store.ts                 ← Toast sistemi
│   ├── utils/cn.ts, formatTL.ts
│   └── types/
│
└── public/
    └── products/                         ← 17 Unsplash görseli, next/image optimize
```

**Feature-based yapının iki altın kuralı:**

1. **Bir feature, dışarıya sadece `components/` üzerinden bilinir.**
   `store/`, `services/`, `data/` gibi iç detaylar feature'da kalır.
2. **`shared/` içinde domain bilgisi olmaz.** `Button`, `Input` gibi şeyler
   evrenseldir; `ProductCard` ise `features/products/` içinde durur.

### Server vs Client Component Karışımı

Next.js App Router'da bir component varsayılan olarak **server**'dır. `'use
client'` direktifi ile o dosya (ve import ettiği her şey) bundle'a girer.

Projede hangi component hangi tarafta?

| Tip | Örnekler | Neden |
|-----|----------|-------|
| **Server** | `layout.tsx`, `page.tsx` (çoğu), `HeroSection`, `FeatureGrid`, `AboutPage`, `Footer`, `AuthCard`, `Card`, `Badge`, `Spinner`, `EmptyState` | Statik, hook/state yok — bundle'ı büyütme |
| **Client** | `Navbar`, `Button`, `Input`, `ToastContainer`, `ProductCard`, `ProductsPage`, `CartPage`, `LoginForm` vb. | Event handler / state / Zustand / `next/navigation` hook'ları kullanıyor |

**Kural:** Bir server component içinde client component render edilebilir.
Tersi de mümkün ama sınırlı — client içinde server component "prop olarak"
geçirilebilir. Biz çoğunlukla server layout + client page akışı kullanıyoruz.

### Store Haritası

Tüm global state **Zustand**'dir. Selector pattern: `useStore(s => s.x)`.

| Store | Dosya | Persist? | Amaç |
|-------|-------|----------|------|
| `useUIStore` | `shared/store/ui.store.ts` | Hayır | Toast kuyruğu |
| `useSessionStore` | `features/auth/store/session.store.ts` | Evet | user / token / registeredUsers mock DB / `hydrated` flag |
| `useCartStore` | `features/cart/store/cart.store.ts` | Evet | Sepet kalemleri + derived total/itemCount |
| `useOrdersStore` | `features/orders/store/orders.store.ts` | Evet | Siparişler + `createOrder` |

**Önemli — Zustand + SSR:** `persist` middleware `localStorage` kullanır,
SSR'da bulunmaz. Bu yüzden store'lardaki `'use client'` direktifi ZORUNLU.
Ve `hydrated` flag'i, persist async yüklenmesi sebebiyle
`ProtectedRoute`'un yanlış `/login` redirect'i atmasını engeller.

### Rehberden Sisteme Eşleme — Neyi Nerede Görebilirsin?

| Rehber Konusu | Projede Uygulandığı Dosyalar |
|---------------|-------------------------------|
| **App Router temelleri** | `src/app/` — layout/page/not-found hiyerarşisi |
| **Route grouping (auth vs shop)** | `(auth)` ve `(shop)` parantezli klasörler |
| **Server component** | `AboutPage`, `HeroSection`, `Footer`, `AuthCard` |
| **Client component (`'use client'`)** | Hook veya event handler olan her yer |
| **`next/link` navigation** | `Navbar`, `Footer`, tüm CTA butonları |
| **`next/image` optimize** | `ProductCard`, `CartItemRow`, `OrderCard` |
| **`useRouter().replace` / `.push`** | `LoginForm`, `RegisterForm`, `CheckoutPage` |
| **`usePathname`** | `Navbar`, `ScrollToTop`, `ProtectedRoute` |
| **`useSearchParams` + Suspense** | `LoginForm` (`?next=`) + `login/page.tsx` |
| **`metadata` API** | Her `page.tsx` üstünde `title` tanımlı |
| **`useState` (form)** | `LoginForm`, `RegisterForm`, `ContactPage`, `CheckoutPage` |
| **`useEffect` + cleanup** | `Navbar` (scroll listener), `ProductsPage` (fetch + cancel) |
| **`useMemo`** | `ProductsPage` (filtered), `OrdersPage` (myOrders) |
| **Custom hook** | `shared/hooks/useDebounce.ts` → `ProductsPage` |
| **Service layer** | `features/auth/services/auth.service.ts` |
| **Zustand `create`** | Tüm store dosyaları |
| **Zustand `persist`** | `session`, `cart`, `orders` store'ları |
| **Persist `hydrated` flag** | `session.store.ts` → `onRehydrateStorage` |
| **Store `getState()` (component dışı)** | `auth.service.ts` içinde |
| **Protected route (client-side)** | `features/auth/components/ProtectedRoute.tsx` |
| **Suspense + fallback** | `login/page.tsx` |
| **Dark theme** | `layout.tsx` → `<html class="dark">`, `globals.css` → `@theme` |
| **Animasyonlar** | `globals.css` keyframes + Tailwind `animate-*` |
| **Responsive + hover efektleri** | Tüm component'larda Tailwind `md:`, `hover:`, `active:` |

### Kod İçi Yorumlar

Her dosyanın başında **neyi ve neden yaptığını** anlatan yorum bloğu var.
Amaç: dosyayı açınca 10 saniyede "burada ne var ve niye" cevabı alman.
Next.js'e özgü tuzaklar (Server vs Client, Suspense boundary, hydrated
flag) inline yorumlarla vurgulandı.

### Neden Bu Mimari?

- **App Router (Pages Router değil):** Next.js 13'ten beri tavsiye edilen
  yaklaşım. Layout-based routing + nested layouts + server component
  hibriti = production için en modern setup.
- **Route grouping:** `(auth)` ve `(shop)` ile URL'i kirletmeden farklı
  layout'lar uygulayabiliyoruz. Auth sayfalarında footer gizli, shop'ta
  var.
- **Feature-based src yapısı:** `app/` routing'e ayrıldığı için business
  logic'i dışarı taşımamız gerekti. Feature-based pattern ekibin kodunu
  30+ dosyadan sonra dağıtır.
- **Zustand + persist + hydrated flag:** Next.js'te session management'ın
  en temiz yolu. Cookie + backend gelene kadar %100 çalışır, geldiğinde
  minimum değişiklikle auth flow kullanılabilir.
- **Amber accent:** Mor veya yeşil değil — sıcak, e-ticaret uyumlu,
  dikkat çekici. React projesindeki mor'dan ayrışır.
- **Dark theme by default:** Modern e-ticaret hissi, kontrast + glow.

---

## İçindekiler (Eğitim Rehberi)

1. [Hedef Çıktılar](#-hedef-çıktılar)
2. [Önkoşullar](#-önkoşullar)
3. [4–6 Haftalık Roadmap](#-46-haftalık-roadmap)
4. [Next.js Temelleri](#-1-nextjs-temelleri)
5. [App Router + Layouts](#-2-app-router--layouts)
6. [Server vs Client Component](#-3-server-vs-client-component)
7. [Data Fetching (SSR / SSG / ISR)](#-4-data-fetching-ssr--ssg--isr)
8. [Routing — Dynamic, Groups, Parallel](#-5-routing--dynamic-groups-parallel)
9. [next/link & next/image](#-6-nextlink--nextimage)
10. [Metadata & SEO](#-7-metadata--seo)
11. [State Management (Zustand)](#-8-state-management-zustand)
12. [Session Management](#-9-session-management)
13. [Auth — Middleware & Route Guard](#-10-auth--middleware--route-guard)
14. [Production Yapı](#-11-production-yapı)
15. [Performance & Best Practices](#-12-performance--best-practices)
16. [Deployment](#-13-deployment)
17. [Gelişim Modeli](#-gelişim-modeli)
18. [Ek Kaynaklar](#-ek-kaynaklar)

---

## 🎯 Hedef Çıktılar

Bu doküman sonunda şunları yapabilir olacaksın:

- [x] App Router ile Next.js projesi kurarsın
- [x] `layout.tsx` / `page.tsx` / `loading.tsx` / `error.tsx` / `not-found.tsx`
      hiyerarşisini kurarsın
- [x] Server vs Client component'ları **ne zaman hangisini** seçeceğini
      bilirsin
- [x] `fetch` ile API tüketir + cache stratejilerini tanırsın
- [x] `next/link` + `next/image` + `metadata` API'yı natif kullanırsın
- [x] Zustand ile UI/domain/session state yönetirsin
- [x] Session persist + hidrasyon flash probleminin farkındasındır
- [x] Client-side + middleware route guard farkını bilirsin
- [x] Vercel / Netlify / VPS'e deploy edebilirsin

---

## 🧰 Önkoşullar

### Gerekli Ortam

| Araç | Amaç | Link |
|------|------|------|
| **Node.js** (LTS, ≥20) | JavaScript runtime | [nodejs.org](https://nodejs.org/) |
| **Yarn** | Package manager | [yarnpkg.com](https://yarnpkg.com/) |
| **VS Code** | Kod editörü | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Git** | Sürüm kontrolü | [git-scm.com](https://git-scm.com/) |

### Önerilen VS Code Eklentileri

- **ES7+ React/Redux/React-Native snippets**
- **ESLint**
- **Tailwind CSS IntelliSense**
- **Error Lens**

### Chrome Eklentileri

- **React Developer Tools**
- **Redux DevTools** (Zustand `devtools` middleware de buraya bağlanır)

### Minimum Bilgi Seviyesi

- React (component, props, useState, useEffect, useMemo)
- JavaScript ES6+ (async/await, destructuring, spread)
- HTTP temel
- Terminal + Git temel

> **Kritik:** Next.js öğrenmeden önce **React'te orta seviye** olmalısın.
> `useEffect` cleanup'ını neden yazdığını bilmeden Next'e geçmek sana
> işkence olur. Önce React tarafını sağlamlaştır.

---

## 🧭 4–6 Haftalık Roadmap

### Hafta 1 — Next.js Temelleri + App Router
- `create-next-app` ile kurulum
- App Router: `layout.tsx`, `page.tsx`, `not-found.tsx`, `loading.tsx`
- File-based routing mantığı, dynamic routes (`[id]`, `[...slug]`)

### Hafta 2 — Server vs Client Component
- `'use client'` direktifi
- Server/Client sınır kuralları (client içinde server children geçirme)
- `next/link`, `next/image`, `useRouter`, `usePathname`, `useSearchParams`

### Hafta 3 — Data Fetching + Metadata
- Server component'ta async `fetch`
- `cache`, `revalidate`, `no-store`
- `metadata` API + dinamik metadata

### Hafta 4 — State + Session
- Zustand ile UI + domain store
- `persist` middleware + SSR uyumu (hydrated flag)
- Client-side protected route
- Auth mock akışı

### Hafta 5–6 — Production + Deployment
- Klasör yapısı (feature-based vs collocated)
- Performance (`next/image`, lazy, streaming)
- `middleware.ts` ile server-side guard
- Vercel deploy, env variables

---

## ⚡ 1. Next.js Temelleri

### Neden Next.js?

- **File-based routing** — dosya = route, manuel router config yok
- **Server components** — bundle küçültme, ilk yükleme hızı
- **next/image / next/font** — otomatik asset optimize
- **Tüm render stratejileri** — SSR, SSG, ISR, CSR tek framework içinde
- **Production-grade defaults** — Vercel + Next ekibi aynı

### Proje Kurulumu (Sıfırdan)

```bash
# Official yol
npx create-next-app@latest my-app --typescript --tailwind --app --src-dir

# Manuel (bu repoda seçtiğimiz yol)
yarn init -y
yarn add next react react-dom
yarn add -D typescript @types/react @types/react-dom @types/node
```

Bu repoda `package.json`'ı manuel yazdık ve `yarn install` ile kurduk.
`src/app/layout.tsx` + `src/app/page.tsx` minimum ikili; oluşunca dev
server sayfayı gösterir.

### Çalıştırma

```bash
yarn dev       # dev mode, http://localhost:3000
yarn build     # production build
yarn start     # build çıktısını çalıştır (prod mode)
```

### 🎥 Videolar

- [Next.js 15 Full Course — Fireship](https://www.youtube.com/watch?v=wm5gMKuwSYk)
- [Next.js App Router Course (Official)](https://nextjs.org/learn)

### 📚 Ek Okuma

- [Next.js Docs — Getting Started](https://nextjs.org/docs)
- [App Router vs Pages Router](https://nextjs.org/docs/app/building-your-application/routing)

### 🧪 Görev

1. `yarn create next-app` ile proje kur (App Router, TS, Tailwind seç).
2. `src/app/page.tsx`'te basit bir hello dünya yaz.
3. `yarn dev` aç, HMR'ı test et.

---

## 🧱 2. App Router + Layouts

### Temel Dosyalar

| Dosya | Görev |
|-------|-------|
| `app/layout.tsx` | Root layout — `<html>` ve `<body>` burada |
| `app/page.tsx` | `/` rotası |
| `app/products/page.tsx` | `/products` rotası |
| `app/products/[id]/page.tsx` | `/products/:id` dinamik rota |
| `app/loading.tsx` | React Suspense fallback |
| `app/error.tsx` | Error boundary |
| `app/not-found.tsx` | 404 |
| `app/(group)/...` | Route grouping — URL'i etkilemez, layout gruplar |

### Nested Layout

```tsx
// app/dashboard/layout.tsx
export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[240px_1fr]">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

Alt `dashboard/*/page.tsx` dosyaları bu layout içinde render edilir.

### Route Grouping

Bu projede `(auth)` ve `(shop)` grupları var. `(auth)/login/page.tsx` →
URL: `/login`. Parantezler sadece klasörü gruplamak için, routing'e
yansımaz. Farklı layout'lar uygulamak için ideal.

### 🧪 Görev

1. 3 sayfalı site kur: `/`, `/about`, `/contact`.
2. Root layout'a Navbar ekle.
3. `(auth)` group aç, `/login` ve `/register` altında farklı layout kullan.

---

## 🎭 3. Server vs Client Component

### Temel Kural

**Varsayılan server'dır.** `'use client'` direktifi ile client yaparsın.

| Durum | Server mi Client mi? |
|-------|----------------------|
| Sadece JSX render, hook yok | **Server** |
| `useState` / `useEffect` | **Client** |
| `onClick` / `onChange` | **Client** |
| Browser API (`localStorage`, `window`) | **Client** |
| `async` + DB/filesystem erişimi | **Server** |
| Third-party lib'in kendisi `'use client'`'mış | **Client** otomatik |

### Karıştırma Kuralı

```tsx
// server.tsx
import ClientThing from './ClientThing';   // 'use client' olan dosya

export default function ServerPage() {
  return (
    <div>
      <h1>Başlık (server'da render)</h1>
      <ClientThing />
    </div>
  );
}
```

Server içinde client kullanılır. Tersi kısıtlı — client component `children`
prop'u olarak server children kabul eder, import edemez.

### Projede Örnekler

- `AuthCard.tsx` — server component, başlık + layout
- `LoginForm.tsx` — `'use client'`, form state + Zustand
- `login/page.tsx` — server, AuthCard + LoginForm'u birleştirir

### 🧪 Görev

1. `HelloServer.tsx` yaz (server). İçinde `new Date().toString()` kullan
   — her istekte yeniden hesaplanır.
2. `HelloClient.tsx` yaz (`'use client'`). `useState` ile sayaç kur.
3. `page.tsx`'te her ikisini de render et. Network tab'de HTML'i incele.

---

## 🌐 4. Data Fetching (SSR / SSG / ISR)

### Server Component `fetch`

```tsx
// app/products/page.tsx (server component)
export default async function Page() {
  const res  = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 },         // ISR — her 60sn'de yenile
  });
  const products = await res.json();
  return <Grid products={products} />;
}
```

### Cache Stratejileri

| Seçenek | Davranış |
|---------|----------|
| `{ cache: 'force-cache' }` (default) | SSG — build time'da fetch, cached |
| `{ cache: 'no-store' }` | SSR — her istekte fetch |
| `{ next: { revalidate: 60 } }` | ISR — her 60sn'de bir fetch |

### Client-Side Fetch

Bu projede mock data + `useEffect` ile fetch ediyoruz (backend olmadığı
için). Gerçek projede:
- Client component içinde: `useEffect` + `fetch` / SWR / TanStack Query
- Server component içinde: async component + `fetch`

### 🧪 Görev

1. Public API'dan (örn. JSONPlaceholder) server'da veri çek, listele.
2. `revalidate: 30` ekle. 30 sn sonra `.next/cache`'i sil, yeni data gelsin.
3. `no-store` ile dene — her yenilemede timestamp değişmeli.

---

## 🧭 5. Routing — Dynamic, Groups, Parallel

### Dynamic Routes

```
app/products/[id]/page.tsx    → /products/1
app/users/[username]/page.tsx → /users/ahmet
app/blog/[...slug]/page.tsx   → /blog/2026/04/x (catch-all)
```

```tsx
export default function Page({ params }: { params: { id: string } }) {
  return <p>Product: {params.id}</p>;
}
```

### Route Groups (bu projede kullanılan)

```
app/(shop)/products/page.tsx  → /products
app/(auth)/login/page.tsx     → /login
```

Parantez klasörleri URL'e yansımaz. `(shop)/layout.tsx` ayrı bir layout
uygulayabilir — biz navbar+footer, (auth) sadece navbar için kullandık.

### Programmatic Navigation

```tsx
'use client';
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/products');     // stack'e ekler
router.replace('/login');     // mevcut history'yi değiştirir
router.back();
```

---

## 🔗 6. next/link & next/image

### `next/link`

```tsx
import Link from 'next/link';

<Link href="/products" prefetch={true}>Ürünler</Link>
```

- Client-side navigation (tam reload yok)
- Viewport'a girince `prefetch` tetiklenir
- `<a>` DEĞİL — ama altta `<a>` render edilir, erişilebilir

### `next/image`

```tsx
import Image from 'next/image';

// Boyut bilinen lokal görsel
<Image src="/products/headphones.jpg" alt="..." width={400} height={400} />

// Ebeveyne sığan (fill)
<div className="relative aspect-square">
  <Image src="/products/headphones.jpg" alt="..." fill sizes="400px"
         className="object-cover" />
</div>
```

**Next/image otomatik:**
- AVIF / WebP dönüşümü
- Responsive `srcset` (ekran boyutuna göre)
- Lazy loading (viewport dışıysa geç yükle)
- Layout shift engelleme (width/height zorunlu veya fill+aspect)

**Uzak kaynak:** `next.config.ts` → `images.remotePatterns`'a host ekle.

---

## 🔍 7. Metadata & SEO

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ürünler',
  description: 'Tüm ürünleri filtreleyip arayabilirsin.',
  openGraph: {
    title: 'Ürünler',
    images: ['/og-products.png'],
  },
};

export default function Page() { ... }
```

Root `layout.tsx`'te `template` kullanırsan her sayfa başlığı prefix alır:

```tsx
export const metadata: Metadata = {
  title: { default: 'Devilyxrd', template: '%s · Devilyxrd' },
};
```

Alt sayfalardaki `title: 'Ürünler'` otomatik `Ürünler · Devilyxrd` olur.

### Dinamik Metadata

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  return { title: product.name };
}
```

---

## 🧠 8. State Management (Zustand)

### Kurulum + Store

```bash
yarn add zustand
```

```ts
'use client';
import { create } from 'zustand';

type CounterState = { count: number; inc: () => void };

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));
```

```tsx
'use client';
const count = useCounterStore((s) => s.count);
const inc   = useCounterStore((s) => s.inc);
```

### Persist Middleware + SSR Uyumu

```ts
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({ ... }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);
```

**SSR tuzağı:** `localStorage` server'da yok. Store `'use client'` dosyasında
tanımlı olmalı; import eden her yer de otomatik client olur. Ve ilk render'da
`user === null` görünür — `hydrated` flag'iyle redirect'i ertelemek gerekir.

---

## 🔑 9. Session Management

Bu projede session akışı:

1. **Session store:** `user`, `token`, `hydrated` + mock `registeredUsers`
2. **Auth service:** `login`, `register`, `forgotQuestion`, `forgotReset`,
   `logout` — hepsi Promise, mock latency'li
3. **LoginForm:** `useSearchParams('next')` ile geri dönüş, başarılıysa
   `router.replace(next)`
4. **ProtectedRoute:** `hydrated` bekler, sonra user kontrolü, yoksa
   `/login?next=<pathname>` redirect
5. **Logout:** service → store.logout() → toast → `router.push('/')`

Backend gelince değişen sadece:
- `auth.service.ts` içindeki gövdeler `fetch('/api/auth/...')` olur
- `next.config.ts`'e gerekiyorsa CORS / cookie ayarı

---

## 🛡️ 10. Auth — Middleware & Route Guard

### Client-Side Guard (bu proje)

```tsx
'use client';
// features/auth/components/ProtectedRoute.tsx
```

Hızlı, basit — ama kullanıcı önce protected sayfanın HTML'ini indirir,
sonra redirect görür. UX için `hydrated` bekleniyor, ama **güvenlik
kritik değilse** yeterli.

### Server-Side Guard (production)

`middleware.ts` ile session cookie kontrol:

```ts
// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const isProtected = req.nextUrl.pathname.startsWith('/orders')
    || req.nextUrl.pathname.startsWith('/checkout');

  if (isProtected && !session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/orders/:path*', '/checkout/:path*'],
};
```

**Bu projede backend yok**, bu yüzden middleware kurmadık. Gerçek projede
`localStorage` yerine `HttpOnly` cookie + middleware tercih edilir
(güvenlik + SSR uyumu).

---

## 🧱 11. Production Yapı

### Klasör Konvansiyonu

- `src/app/` **sadece routing dosyaları** — layout/page/loading/error
- `src/features/` — domain feature'ları
- `src/shared/` — UI + utility

### Thin Page Dosyaları

```tsx
// app/(shop)/products/page.tsx
import { ProductsPage } from '@/features/products/components/ProductsPage';
export const metadata = { title: 'Ürünler' };
export default function Page() { return <ProductsPage />; }
```

Avantaj: Next'in routing katmanı ile business logic ayrık. Sayfa test
edilebilir (Next mock'suz).

---

## 🚀 12. Performance & Best Practices

1. Server component default; `'use client'` sadece gerekince.
2. `next/image` her yerde — `<img>` yasak.
3. `next/link` için `prefetch` viewport'a girince tetiklenir.
4. `loading.tsx` yaz — async sayfalarda Suspense fallback otomatik.
5. Metadata her sayfada — SEO + social preview bedava.
6. Hydration mismatch'ten kaç — server ve client aynı HTML üretmeli.
7. `useSearchParams` → Suspense boundary zorunlu (static build için).

---

## 📦 13. Deployment

### Vercel (en kolay)

```bash
npm i -g vercel
vercel            # ilk kez → link + deploy
vercel --prod     # production
```

- Otomatik HTTPS, global CDN, env var yönetimi panelden.
- Commit'i `main`'e push'ladığın anda deploy.

### Ubuntu VPS

```bash
yarn build
yarn start --port 3000
# Nginx reverse proxy + PM2
```

### Env Variables

- `.env.local` — local'de çalışır, git'e girmez
- Vercel panelinde → Settings → Environment Variables
- `NEXT_PUBLIC_*` prefix → client'a iner. Prefix yoksa sadece server'da
  erişilebilir. **Secret'ları `NEXT_PUBLIC_` ile açığa atma!**

---

## 🔥 Gelişim Modeli

### Günlük
- 1 konu + 1 görev

### Haftalık
- 1 mini proje + ertesi gün yeniden oku / refactor

### Aylık
- Eski kod aç, "bugün yazsam nasıl yazardım" sor
- Final project'i Vercel'e deploy et, paylaş

---

## 📖 Ek Kaynaklar

### Resmi Dokümantasyon
- [Next.js Docs](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)
- [React Docs](https://react.dev/)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Video Kanalları
- [Fireship](https://www.youtube.com/@Fireship)
- [Jack Herrington](https://www.youtube.com/@jherr)
- [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified)
- [Traversy Media](https://www.youtube.com/@TraversyMedia)

### Araçlar
- [Vercel](https://vercel.com/)
- [Bundlephobia](https://bundlephobia.com/)

### İlham
- [Bulletproof Next (referans mimari)](https://github.com/alan2207/bulletproof-react)
- [shadcn/ui](https://ui.shadcn.com/)

---

## 🧠 Son Not

Bu doküman **okumak için** değil, **yazarak ilerlemek için** hazırlanmıştır.
Next.js öğrenmek = React'i production seviyeye çıkarmaktır.

Server component'ı hazmetmeden `'use client'` her yere atmak **yasak**.
TypeScript'e hazır olmadan Next'te JS yazmak **yasak**.

Bir şey takılırsa önce:
1. Browser console + Next terminal output
2. TS hatasını copy-paste ara (Stack Overflow, GitHub)
3. Next.js docs (`nextjs.org/docs`)
4. Minimal reproduction üret
5. Sonra sor

**Sor ama önce aç.**

Made by devilyxrd XD
