# Biolink

A personal link-in-bio page with neobrutalism design style. Built with Next.js 16, Tailwind CSS 4, and Prisma 7.

![Neobrutalism Style](https://img.shields.io/badge/Style-Neobrutalism-FF6B6B)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38BDF8)
![Prisma 7](https://img.shields.io/badge/Prisma-7-2D3748)

## Features

- **Neobrutalism Design** - Bold borders, offset shadows, high contrast colors
- **Dark/Light Mode** - Toggle theme with system preference support
- **Music Player** - Minimizable player with play/pause, next/prev, volume controls
- **Admin Panel** - Full CRUD for links, music tracks, and profile
- **Responsive** - Works on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL + Prisma 7
- **Icons**: Lucide React
- **Auth**: Password-only with cookies

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (or use [Neon](https://neon.tech) for free)

### 1. Clone the repository

```bash
git clone https://github.com/Anggahrm/biolink.git
cd biolink
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
ADMIN_PASSWORD="your-secure-password"
```

### 4. Setup database

```bash
# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your biolink.

Admin panel: [http://localhost:3000/login](http://localhost:3000/login)

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `ADMIN_PASSWORD` - Your admin password
4. Deploy!

### Deploy to Other Platforms

Build the production version:

```bash
npm run build
npm start
```

The app runs on port 3000 by default.

## Database Options

### Neon (Free PostgreSQL)

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

### Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database > Connection string
4. Copy the URI to `DATABASE_URL`

### Local PostgreSQL

```bash
# Create database
createdb biolink

# Use local connection string
DATABASE_URL="postgresql://localhost:5432/biolink"
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed initial data |
| `npm run db:studio` | Open Prisma Studio |

## Project Structure

```
biolink/
├── app/
│   ├── page.tsx          # Public biolink page
│   ├── login/page.tsx    # Admin login
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes
├── components/
│   ├── ProfileCard.tsx   # Profile section
│   ├── LinkButton.tsx    # Link buttons
│   ├── MusicPlayer.tsx   # Music player
│   ├── ThemeToggle.tsx   # Dark/light toggle
│   └── admin/            # Admin components
├── lib/
│   ├── prisma.ts         # Prisma client
│   └── auth.ts           # Auth utilities
└── prisma/
    ├── schema.prisma     # Database schema
    └── seed.ts           # Seed script
```

## Customization

### Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --neo-bg: #FFFBEB;        /* Background */
  --neo-primary: #FF6B6B;   /* Primary (coral) */
  --neo-secondary: #4ECDC4; /* Secondary (teal) */
  --neo-accent: #FFE66D;    /* Accent (yellow) */
  --neo-border: #1A1A1A;    /* Border color */
  --neo-text: #1A1A1A;      /* Text color */
}
```

### Admin Password

Change `ADMIN_PASSWORD` in your `.env` file.

## License

MIT License - feel free to use for personal or commercial projects.

## Author

Made by [Anggahrm](https://github.com/Anggahrm)
