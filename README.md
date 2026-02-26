# Divyanshu Jaiswal — Portfolio

Personal portfolio of **Divyanshu Jaiswal**, Backend Engineer at Zopsmart. Built with Vite + React, featuring a 3D interactive robot companion, AI chat, and smooth Framer Motion animations.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite 5 + React 18 + TypeScript |
| Styling | Tailwind CSS v3 (dark mode via class) |
| 3D | Three.js + React Three Fiber + Drei |
| Animation | Framer Motion |
| State | Zustand |
| AI Chat | Groq API (`llama-3.3-70b-versatile`) |
| Deployment | Vercel (static + Edge Functions) |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key at [console.groq.com](https://console.groq.com).

### 3. Run the dev server

```bash
npm run dev
```

This starts two processes concurrently:
- **Vite** dev server on `http://localhost:5173`
- **API dev server** on `http://localhost:3001` (bridges `/api/chat` locally)

Vite proxies all `/api/*` requests to the local API server, so the AI chat works identically to production.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite + local API server |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across src, components, hooks, lib |

## Project Structure

```
portfolio/
├── index.html                  # Vite entry — fonts, theme flash prevention
├── vite.config.ts              # Vite config — alias, proxy, chunk splitting
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
│
├── api/
│   ├── chat.ts                 # Vercel Edge Function — Groq AI handler
│   └── dev-server.ts           # Local dev server (not deployed)
│
├── src/
│   ├── main.tsx                # React root mount
│   ├── App.tsx                 # Root layout — ThemeProvider + all sections
│   └── globals.css             # Global styles + CSS variables
│
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx           # R3F canvas + lighting
│   │   └── RobotCompanion.tsx  # Animated GLTF robot
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Lab.tsx             # Projects
│   │   ├── Experience.tsx
│   │   ├── Achievements.tsx    # Hall of Fame
│   │   └── Contact.tsx
│   ├── interactive/
│   │   └── ChatInterface.tsx   # AI chat widget with markdown rendering
│   ├── ui/
│   │   ├── Navigation.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Loading.tsx
│   ├── providers/
│   │   └── ThemeProvider.tsx   # Custom dark/light context (no next-themes)
│   └── ErrorBoundary.tsx
│
├── hooks/
│   ├── useIdleDetection.ts
│   └── useMousePosition.ts
│
├── lib/
│   └── store.ts                # Zustand store — chat state + sendMessage
│
└── public/
    ├── models/robot.glb        # 3D robot model
    └── resume.pdf
```

## Deployment

The project deploys to **Vercel** as a static site with one Edge Function.

```bash
# Build locally first to verify
npm run build

# Deploy via Vercel CLI
npx vercel --prod
```

Vercel automatically:
- Serves `dist/` as static files
- Routes `/api/chat` to `api/chat.ts` as an Edge Function

Add `GROQ_API_KEY` in your Vercel project's **Environment Variables** settings before deploying.

## AI Chat

The chat widget (`components/interactive/ChatInterface.tsx`) is an AI persona built on Divyanshu's profile data. It renders markdown responses including **bold**, `code`, bullet lists, numbered lists, and code blocks.

The system prompt lives in `api/chat.ts` — update it to keep the AI's knowledge current.
