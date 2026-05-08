# PickupCraft — `voice-agents-local`

> **We pick up. You stay focused.**
> A done-for-you voice agent for local businesses — dentists, plumbers, salons, restaurants, clinics, contractors. Per-shop scripts, books in your existing scheduling software, $290/mo + 22¢ per minute.

| Link | URL |
|------|-----|
| Live landing | <https://voice-agents-local.prin7r.com> |
| Notion opportunity | <https://www.notion.so/Voice-agents-for-local-business-3543ceec2619810a993fde02bbbde444> |
| Repo | <https://github.com/prin7r-projects/voice-agents-local> |
| Brand identity | [`docs/01-brand-identity.md`](docs/01-brand-identity.md) |
| DESIGN.md (15 sections) | [`DESIGN.md`](DESIGN.md) |
| Pitch deck (HTML) | [`docs/pitch-deck.html`](docs/pitch-deck.html) |

## What's here

```
voice-agents-local/
├── DESIGN.md                         # Canonical 15-section design + style guide
├── README.md                         # this file
├── Dockerfile.landing                # multistage Next.js standalone build
├── docker-compose.yml                # storage-contabo deploy (Traefik host network)
├── .env.example                      # NOWPAYMENTS_* + Plisio + Reown env names
├── apps/
│   ├── landing/                      # Next.js 15 + Tailwind + TypeScript
│   │   ├── app/
│   │   │   ├── page.tsx              # 11-section landing
│   │   │   ├── pricing-cta.tsx       # client component → POST /api/checkout/nowpayments
│   │   │   ├── api/
│   │   │   │   ├── checkout/nowpayments/route.ts
│   │   │   │   └── webhooks/nowpayments/route.ts   # HMAC-SHA512 IPN verification
│   │   │   ├── icon.svg
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── lib/
│   │   │   ├── env.ts                # MissingEnvError + appUrlFromRequest
│   │   │   └── nowpayments.ts        # PLANS + createInvoice + verifyIpn
│   │   ├── tailwind.config.ts
│   │   ├── next.config.mjs           # output: 'standalone'
│   │   └── package.json
│   └── app/                          # SaaS surface stub (Wave 3+)
│       ├── README.md                 # open-saas Wasp scaffold plan
│       └── .gitkeep
├── docs/
│   ├── 01-brand-identity.md          # Brand pyramid + visual system
│   ├── 02-architecture.md            # System diagram + data flows + threat model
│   ├── 03-user-journeys.md           # 3 journeys + 6 per-industry script sketches
│   ├── 04-pain-points.md             # Why each existing alternative fails
│   ├── 05-audience-profile.md        # ICP + 2 personas + anti-personas
│   ├── 06-sales-channels.md          # 6-channel mix engineered for owner trust
│   ├── 07-sales-strategy.md          # PLG-front + sales-assist intake + PLG retention
│   ├── 08-marketing-strategy.md      # Positioning, message hierarchy, content pillars
│   ├── 09-go-to-market.md            # 90-day plan, weekly milestones
│   ├── 10-pitch-deck.md              # Markdown pitch deck (10 slides)
│   ├── pitch-deck.html               # Self-contained HTML deck (open in browser)
│   └── screenshots/
│       ├── landing-desktop.png       # 1440 × 900 fullPage
│       └── landing-mobile.png        # 390 × 844 fullPage
├── scripts/
│   └── capture-landing-screenshots.mjs   # Playwright capture script
└── .github/workflows/landing-build.yml   # CI: pnpm build on PR
```

## Screenshots

Captured from the live deploy at `https://voice-agents-local.prin7r.com` via Playwright Chromium, `fullPage: true`, `device_scale_factor: 2`.

![PickupCraft landing — desktop, 1440×900](docs/screenshots/landing-desktop.png)

![PickupCraft landing — mobile, 390×844](docs/screenshots/landing-mobile.png)

## Run the landing locally

```bash
cd apps/landing
pnpm install
cp ../../.env.example ../../.env   # copy and fill in (see "Env" below)
pnpm dev
```

Open <http://localhost:3000>.

## Env

The landing reads two NOWPayments variables; without them the checkout button surfaces a "missing_env" message and falls back to a `mailto:` link.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Public origin used in `success_url`, `cancel_url`, and `ipn_callback_url`. In production: `https://voice-agents-local.prin7r.com`. |
| `NOWPAYMENTS_API_KEY` | NOWPayments live API key (server only). |
| `NOWPAYMENTS_IPN_SECRET` | IPN secret used for `x-nowpayments-sig` HMAC-SHA512 verification. |
| `NOWPAYMENTS_SANDBOX` | `true` to point at `api-sandbox.nowpayments.io`; default `false`. |
| `PLISIO_API_KEY` | (Optional) backup direct stablecoin invoice. Wave 2 advisory only. |
| `NEXT_PUBLIC_REOWN_PROJECT_ID` | (Optional) Reown / WalletConnect direct-wallet fallback. |

Live values live in `/Users/keer/.nth-kir-keys.env` and on the deploy host at `/opt/prin7r-deploys/voice-agents-local/.env`. `.env` is gitignored at every level.

## Deploy (storage-contabo)

```bash
ssh storage-contabo
mkdir -p /opt/prin7r-deploys/voice-agents-local
cd /opt/prin7r-deploys/voice-agents-local
git clone https://github.com/prin7r-projects/voice-agents-local.git .
# write /opt/prin7r-deploys/voice-agents-local/.env from /Users/keer/.nth-kir-keys.env
docker compose build
docker compose up -d
```

Traefik (host network, `dokploy-traefik`) discovers the container via the Docker socket and serves it at `https://voice-agents-local.prin7r.com` with a Let's Encrypt cert (HTTP-01 resolver).

Verify:

```bash
curl -sI https://voice-agents-local.prin7r.com
```

Expected: `HTTP/2 200`, valid Let's Encrypt R12 cert.

## Payments

NOWPayments hosted invoice is the primary checkout. Per-tier pricing (`docs/07-sales-strategy.md`):

| Tier | USD/mo | NOWPayments? |
|---|---|---|
| After-Hours | $140 | Yes |
| Starter | $290 | Yes |
| Growth | $590 | Yes |
| Concierge | Custom | No — `mailto:desk@prin7r.com` |

Click on a tier card → `POST /api/checkout/nowpayments` → server calls `POST https://api.nowpayments.io/v1/invoice` → returns `invoice_url` → client redirects → buyer pays in USDT/USDC → IPN POSTs to `/api/webhooks/nowpayments` with `x-nowpayments-sig`. The webhook handler verifies HMAC-SHA512 over alphabetically-sorted JSON and logs the verified event for the manual provisioner.

When `apps/app/` ships (Wave 3+), the IPN handler will additionally write to the orders table and trigger the voice-agent provisioner. See [`apps/app/README.md`](apps/app/README.md).

## Contributing

Any landing-affecting change updates `DESIGN.md` in the same commit (changelog at section 15). Re-capture the screenshots after the change lands on the deploy host:

```bash
node scripts/capture-landing-screenshots.mjs
```

## License

MIT. See [`LICENSE`](LICENSE).
