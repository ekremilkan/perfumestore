# 🤖 AGENTS.md

## Build/Lint/Test Commands
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Type Check**: `npx astro check`
- **Single Test**: No test framework configured yet

## Code Style Guidelines
- **TypeScript**: Strict mode (`astro/tsconfigs/strict`)
- **Imports**: Absolute paths with `@/` alias (e.g., `import { prisma } from "@/lib/prisma"`)
- **Naming**: PascalCase components, camelCase functions/hooks, UPPER_SNAKE_CASE env vars
- **Types**: Explicit TypeScript types, use `type` for interfaces, `interface` for object shapes
- **Error Handling**: try/catch with `console.error()` for logging, throw descriptive errors
- **Formatting**: 2-space indentation, consistent spacing, trailing commas
- **Accessibility**: Include `aria-*` attributes, semantic HTML, proper alt text
- **Styling**: Tailwind v4 with CSS variables (e.g., `bg-primary`), no hardcoded colors
- **i18n**: All UI text from `/src/i18n/*.json`, no hardcoded strings
- **React**: Islands pattern only, max 2 React components per `.astro` page

## Project Rules (from .trae/rules/project_rules.md)
- **Structure**: Follow established folder hierarchy (components/, lib/, pages/, etc.)
- **Auth**: Better-Auth with OTP/Google, roles: USER|ADMIN, middleware protection
- **State**: React Context for global state (CartContext, ModalContext, AuthContext)
- **API**: Astro endpoints in `/src/pages/api`, export HTTP verbs explicitly
- **Mobile-First**: Responsive design, WCAG 2.1 AA accessibility, font ≥16px
- **PWA**: Enabled via `@vite-pwa/astro` when `ENABLE_PWA=true`

## Environment Setup
Load `context7.yaml` and `.env` first. Use business config from `config/businesses/`.

enum Role {
  USER
  ADMIN
}
```

**Example Middleware (`src/middleware.ts`):**

```ts
import { getSession } from "@/lib/auth";

export const onRequest = async (context, next) => {
  const route = context.url.pathname;
  const session = await getSession(context);
  if (route.startsWith("/admin")) {
    if (!session || session.user.role !== "ADMIN") {
      return context.redirect("/auth/login");
    }
  }
  return next();
};
```

---

## 🧱 Backend (Astro API + Prisma)

Example routes under `/src/pages/api` use Astro’s SSR endpoints + Prisma ORM.

```ts
// src/pages/api/products.ts
import { prisma } from "@/lib/prisma";

export async function get() {
  const products = await prisma.product.findMany();
  return new Response(JSON.stringify(products));
}

export async function post({ request }) {
  const data = await request.json();
  const product = await prisma.product.create({ data });
  return new Response(JSON.stringify(product), { status: 201 });
}
```

Admin routes validate `role = ADMIN` before mutation.

---

## 🧠 Context7 + Unsplash MCP Integration

- **Context7:** awareness of architecture, components, and patterns.
- **Unsplash MCP:** dynamic product and banner images.

```ts
// src/lib/unsplash.ts
import { createClient } from "unsplash-js";
const client = createClient({ accessKey: process.env.UNSPLASH_ACCESS_KEY });
export async function getImage(query: string) {
  const res = await client.search.getPhotos({
    query,
    orientation: "landscape",
  });
  return res.response?.results?.[0]?.urls?.regular;
}
```

---

## ⚙️ Environment Variables

```env
BUSINESS_NAME="PerfumeStore"
BUSINESS_DOMAIN="https://perfume.example.com"
PRIMARY_COLOR="#C59D5F"
SECONDARY_COLOR="#111111"
DEFAULT_LANGUAGE="en"
SUPPORTED_LANGUAGES="en,de,tr,ar"
DATABASE_URL="postgresql://user:pass@localhost:5432/commerce"
AUTH_SECRET="secret"
AUTH_PROVIDER_GOOGLE_CLIENT_ID="..."
AUTH_PROVIDER_GOOGLE_CLIENT_SECRET="..."
ENABLE_PWA=true
CONTEXT7_API_KEY="context7-key"
UNSPLASH_ACCESS_KEY="unsplash-key"
```

---

## 🌍 i18n (Localization)

All UI text, metadata, and labels must come from `/src/i18n`.  
No hardcoded strings in UI or code.

---

## 📱 PWA Integration

Implemented with `@vite-pwa/astro`.  
Auto-generates manifest and icons based on environment config.

---

## 🔐 Admin Panel Structure

| Feature   | Description                               |
| --------- | ----------------------------------------- |
| Dashboard | `/admin` SSR page showing orders, metrics |
| CRUD      | `/admin/products`, `/admin/orders`        |
| Auth      | Better-Auth role checks                   |
| UI        | Tailwind v4, responsive, accessible       |
| SSR       | Minimal React islands for forms/tables    |

**Structure Example:**

```
src/pages/admin/
 ├─ index.astro
 ├─ products.astro
 ├─ orders.astro
 └─ components/
      └─ ProductForm.tsx
```

---

## 🧩 Commerce Prisma Models

```prisma
model Product {
  id          String   @id @default(uuid())
  tenant_id   String
  name        String
  description String?
  price       Decimal  @db.Decimal(10,2)
  image       String?
  category    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Order {
  id         String   @id @default(uuid())
  tenant_id  String
  userId     String
  total      Decimal  @db.Decimal(10,2)
  status     String   @default("pending")
  createdAt  DateTime @default(now())
}
```

---

## 🧩 AI Development Workflow (For Codex Agents)

### Step 1 – Context Initialization

→ Load `context7.yaml` and `.env`

### Step 2 – Business Awareness

→ Detect active business theme (colors, fonts)

### Step 3 – Localization

→ Use `t("...")` for all text from `/i18n`

### Step 4 – Backend Integration

→ Prisma CRUD (Product, Order, User)

### Step 5 – SEO & Schema

→ JSON-LD + localized meta tags

### Step 6 – Admin Panel

→ CRUD pages `/admin/products` & `/admin/orders`

### Step 7 – PWA

→ Enable offline caching with `@vite-pwa/astro`

### Step 8 – Test

→ Run `npm run dev`, confirm SSR and routes work

---

## ✅ Summary

- **Astro 5 SSR** unified frontend/backend
- **Better-Auth** (OTP + Google)
- **PWA**, **i18n**, **SEO-first**, **mobile-first**
- **Context7 + Unsplash MCP** for AI-assisted coding
- **Prisma + Postgres** backend
- **Tailwind v4** for responsive design
- **Dynamic tenants**, one codebase

---

## UI Design

{
"page": {
"name": "Fragrance Landing Page",
"theme": {
"colors": {
"background": "#F6F2E9",
"primary": "#3A4B2E",
"accent": "#B68D40",
"text": "#2B2B2B",
"cardBackground": "#FFFFFF"
},
"typography": {
"headingFont": "Playfair Display, serif",
"bodyFont": "Poppins, sans-serif"
},
"cornerRadius": "16px",
"shadow": "0 4px 10px rgba(0,0,0,0.08)"
},
"layout": {
"sections": [
{
"id": "navbar",
"type": "navigation",
"alignment": "space-between",
"padding": "20px 60px",
"background": "transparent",
"elements": [
{
"type": "nav_links",
"items": [
{ "label": "Women", "href": "/women" },
{ "label": "Men", "href": "/men" },
{ "label": "Exclusive Collection", "href": "/exclusive", "badge": "New" },
{ "label": "Gift Sets", "href": "/gifts" }
]
},
{
"type": "icons",
"items": [
{ "icon": "search", "action": "openSearch" },
{ "icon": "user", "action": "openAccount" },
{ "icon": "cart", "badge": 1, "action": "openCart" }
]
}
]
},
{
"id": "hero_section",
"type": "hero",
"backgroundImage": {
"url": "gentleman-givenchy.jpg",
"style": {
"objectFit": "cover",
"overlay": "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))"
}
},
"content": {
"headline": "Where Scent Becomes Emotion",
"subheadline": "Discover signature fragrances crafted to capture your individuality.",
"button": {
"label": "Shop Now",
"action": "scrollTo('#bestsellers')",
"style": "primary"
}
},
"spacing": {
"paddingTop": "100px",
"paddingBottom": "120px"
}
},
{
"id": "bestsellers",
"type": "product_grid_section",
"title": "BEST SELLERS",
"background": "#F6F2E9",
"grid": {
"columns": 4,
"gap": "24px"
},
"products": [
{
"name": "CHANEL N°5",
"origin": "FRANCE",
"price": "$150.00",
"image": "chanel-no5.jpg",
"button": {
"icon": "cart",
"style": "outlined",
"color": "#3A4B2E"
}
},
{
"name": "COCO NOIR",
"origin": "FRANCE",
"price": "$150.00",
"image": "coco-noir.jpg",
"button": {
"icon": "cart",
"style": "outlined",
"color": "#3A4B2E"
}
},
{
"name": "CAIA SENSO",
"origin": "FRANCE",
"price": "$150.00",
"image": "caia-senso.jpg",
"button": {
"icon": "cart",
"style": "outlined",
"color": "#3A4B2E"
}
},
{
"name": "SAUVAGE",
"origin": "FRANCE",
"price": "$150.00",
"image": "sauvage.jpg",
"button": {
"icon": "cart",
"style": "outlined",
"color": "#3A4B2E"
}
}
],
"footerButton": {
"label": "View All",
"action": "navigate('/all')",
"style": "filled",
"color": "#3A4B2E"
}
}
]
}
}
}
