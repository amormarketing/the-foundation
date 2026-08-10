# The Foundation

An editable Next.js recreation of the homepage preserved in the Wix editor export.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
- `npm run format` — format the source with Prettier

The contact form currently opens the visitor's email client. Connect it to a form service or API route before using it for production submissions.

## Stripe donations

The Donate page supports both one-time payments and automatically renewing
monthly donations through Stripe Checkout.

1. Copy `.env.example` to `.env.local`.
2. Add your Stripe test secret key to `STRIPE_SECRET_KEY`.
3. Set `SITE_URL` to the site origin, such as `http://localhost:3000` locally.
4. In Stripe, create a webhook endpoint pointing to
   `https://your-domain.com/api/stripe/webhook`.
5. Subscribe that endpoint to these events:
   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
6. Add the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

Use Stripe test mode and a test card before adding live credentials. Keep all
Stripe secrets server-side and never prefix them with `NEXT_PUBLIC_`.
