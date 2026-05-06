# Moraj Group — Next.js Website

Full-stack website built with **Next.js 14 App Router**, **Sanity v3 CMS**, and **Google Analytics 4**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| CMS | Sanity v3 (hosted) |
| Analytics | Google Analytics 4 |
| Styling | CSS Modules |
| Images | Sanity CDN + Next/Image |
| Deployment | Vercel |

---

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo>
cd moraj-group
npm install
```

### 2. Create Sanity project

1. Go to [sanity.io](https://sanity.io) → Create account → New project
2. Name it **Moraj Group**
3. Dataset: `production`
4. Copy your **Project ID**

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id   # from sanity.io dashboard
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token                      # sanity.io → API → Tokens → Add Editor token
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX     # from Google Analytics
NEXT_PUBLIC_SITE_URL=https://morajgroup.com
REVALIDATE_SECRET=any_random_secret_string       # e.g. openssl rand -hex 32
```

### 4. Add CORS origin in Sanity

Go to **sanity.io → your project → API → CORS Origins**
Add: `http://localhost:3000` (for dev) and `https://morajgroup.com` (for production)

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the website.
Open [http://localhost:3000/studio](http://localhost:3000/studio) — the CMS editor.

---

## CMS — What the client can edit

Log in at `https://morajgroup.com/studio`

| Section | What to edit |
|---------|-------------|
| **Site Settings** | Phone, email, address, stats numbers, press logos, office hours |
| **Hero Section** | Headline, italic text, subheading, CTA button label & link |
| **Residences** | Add/edit/delete projects — name, location, status, images, config, RERA |
| **Team Members** | Add/edit the Gurnani family photos, bios, roles |
| **Testimonials** | Add/edit resident quotes and star ratings |

### Adding a new residence (step by step)

1. Open Studio → click **Residences** → **+ New**
2. Fill in: Project Name → it auto-creates the URL slug
3. Set Status (New Launch / Ongoing / Completed)
4. Upload the Hero Image (main photo shown in the grid)
5. Upload Gallery photos
6. Fill in Configuration, Area, Pricing, RERA number
7. Click **Publish** — the website updates within 60 seconds

---

## Adding the hero video

Replace the placeholder in `components/sections/HeroSection.tsx`:

```tsx
<video autoPlay muted loop playsInline poster="/hero-poster.jpg">
  <source src="YOUR_CLOUDINARY_URL/moraj-hero.mp4" type="video/mp4" />
</video>
```

**Recommended:** Upload to [Cloudinary](https://cloudinary.com) and use their CDN URL.
For a 25-second 4K video, compress to H.264 MP4 under 15MB using DaVinci Resolve or HandBrake.

---

## Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create property → Add web data stream → Copy **Measurement ID** (G-XXXXXXXXXX)
3. Add to `.env.local`: `NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX`

**Events already tracked:**
- Page views (automatic via `@next/third-parties`)
- `generate_lead` — fires when enquiry form is submitted, with residence name as label

---

## Deployment to Vercel

### One-click deploy

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add all environment variables from `.env.local`
4. Deploy

### Set up Sanity webhook (for instant content updates)

After deploying, go to **sanity.io → your project → API → Webhooks**:
- URL: `https://morajgroup.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
- Trigger on: Publish, Unpublish
- Method: POST

Now when Priyaa or Vansh publish a new residence in Sanity Studio, the website rebuilds that page automatically within seconds.

---

## Project Structure

```
moraj-group/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx          # Nav wrapper
│   │   ├── page.tsx            # Homepage (fetches all data)
│   │   └── residences/
│   │       ├── page.tsx        # All residences grid
│   │       └── [slug]/
│   │           └── page.tsx    # Individual residence page
│   ├── studio/[[...tool]]/
│   │   └── page.tsx            # Sanity Studio (CMS editor)
│   ├── api/revalidate/
│   │   └── route.ts            # Webhook for ISR revalidation
│   ├── layout.tsx              # Root layout + GA4
│   └── globals.css             # CSS variables + reset
│
├── components/sections/
│   ├── Nav.tsx                 # Sticky nav
│   ├── HeroSection.tsx         # Full-screen video hero
│   ├── StatsBar.tsx            # 4 stat numbers
│   ├── IntroSection.tsx        # Philosophy statement
│   ├── ResidencesSection.tsx   # 4-tile Lodha-style grid
│   ├── CraftsmanshipSection.tsx
│   ├── TeamSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── PressSection.tsx
│   ├── EnquireSection.tsx      # Contact form + GA4 tracking
│   └── Footer.tsx
│
├── lib/
│   ├── sanity.ts               # Sanity client + image builder
│   ├── queries.ts              # All GROQ queries
│   └── types.ts                # TypeScript types
│
├── sanity/
│   └── schemas/
│       ├── index.ts
│       ├── hero.ts
│       ├── residence.ts        # Main property schema
│       ├── teamMember.ts
│       ├── testimonial.ts
│       └── siteSettings.ts
│
├── sanity.config.ts            # Sanity Studio config
├── next.config.ts
├── .env.example
└── README.md
```

---

## Support

For any questions about the code or setup, refer to:
- [Next.js docs](https://nextjs.org/docs)
- [Sanity docs](https://www.sanity.io/docs)
- [Vercel docs](https://vercel.com/docs)
