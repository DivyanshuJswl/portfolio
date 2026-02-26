# Groq API Integration

This folder contains two files:

| File | Purpose |
|---|---|
| `chat.ts` | Vercel Edge Function — runs in production |
| `dev-server.ts` | Local HTTP adapter — runs during `npm run dev` only |

---

## How It Works

### Production (Vercel)

`api/chat.ts` is deployed as a **Vercel Edge Function**. Vercel automatically routes any request to `/api/chat` to this file.

```
Browser  →  POST /api/chat  →  Vercel Edge  →  Groq API  →  response
```

The function:
1. Accepts `POST` requests with a JSON body `{ messages: [...] }`
2. Prepends the system prompt
3. Calls `groq.chat.completions.create()`
4. Returns `{ message: "..." }` as JSON

### Local Development

Vite's dev server doesn't know about the `api/` folder. `dev-server.ts` bridges this gap:

```
Browser  →  POST /api/chat  →  Vite proxy (port 5173)
                              → dev-server (port 3001)
                              → handler() in chat.ts
                              → Groq API
```

Both processes start together with `npm run dev` via `concurrently`.

---

## Environment Variables

| Variable | Where | Required |
|---|---|---|
| `GROQ_API_KEY` | `.env` (local) | Yes |
| `GROQ_API_KEY` | Vercel → Project Settings → Environment Variables | Yes (prod) |

`.env` file format:
```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
```

Get a free key at [console.groq.com](https://console.groq.com).

---

## Request / Response Format

**Request** — `POST /api/chat`

```json
{
  "messages": [
    { "role": "user", "content": "What projects have you built?" }
  ]
}
```

The `messages` array should contain the conversation history (all prior turns), **not** the system prompt — that is injected server-side.

**Response** — `200 OK`

```json
{
  "message": "I've built several distributed systems..."
}
```

**Error responses**

| Status | Body | Cause |
|---|---|---|
| `405` | `{ "error": "Method not allowed" }` | Non-POST request |
| `500` | `{ "error": "Failed to get response" }` | Groq API error |

---

## Updating the AI Persona / System Prompt

The system prompt lives at the top of `api/chat.ts` in the `SYSTEM_PROMPT` constant. Edit it directly to update:

- Divyanshu's job title, skills, or projects
- The AI's tone and communication style
- What the AI is allowed / not allowed to discuss

After editing, redeploy to Vercel for changes to take effect in production.

---

## Changing the Model

In `api/chat.ts`, find:

```ts
model: 'llama-3.3-70b-versatile',
```

Replace with any model available on your Groq account. Popular options:

| Model ID | Notes |
|---|---|
| `llama-3.3-70b-versatile` | Default — best quality |
| `llama-3.1-8b-instant` | Faster, lower cost |
| `mixtral-8x7b-32768` | Large context window |

Full model list: [console.groq.com/docs/models](https://console.groq.com/docs/models)

---

## Tuning Parameters

In `api/chat.ts`:

```ts
temperature: 0.7,   // 0 = deterministic, 1 = creative
max_tokens: 500,    // cap response length (affects cost + latency)
stream: false,      // set true to stream tokens (requires SSE handling)
```

Keep `max_tokens` ≤ 800 for a chat widget — long responses hurt UX.

---

## Deploying to Vercel

```bash
# Build locally to catch type errors first
npm run build

# Deploy
npx vercel --prod
```

Vercel automatically:
- Detects `api/chat.ts` and deploys it as an Edge Function
- Skips `api/dev-server.ts` (it has no export compatible with Vercel)
- Routes `POST /api/chat` to the function

Make sure `GROQ_API_KEY` is set in your Vercel project's **Settings → Environment Variables** before deploying.
