# Bitlinks — Minimal URL Shortener (Next.js + MongoDB)

A simple, production-ready URL shortener built with Next.js App Router and MongoDB. Create custom short codes for long URLs and redirect visitors from `/{code}` to the original destination.

## Overview

Bitlinks lets you:
- Create a short link by choosing your own code (e.g., `my-post`).
- Store links in MongoDB and prevent duplicates.
- Redirect visitors server-side via a dynamic route (`/[shorturl]`).

Tech stack: Next.js (App Router), Tailwind CSS, MongoDB.

## Features

- **Custom codes:** Users provide their preferred `shorturl` code.
- **Duplicate check:** API validates that a code doesn’t already exist.
- **Server-side redirects:** Visiting `/{shorturl}` resolves the target URL and redirects.
- **App Router structure:** Clean separation of UI, API, and dynamic routing.

## Quick Start

Prerequisites:
- Node.js LTS
- A MongoDB connection string (Atlas or local)

Install dependencies and run the dev server:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables

Create a `.env.local` file in the project root with:

```env
MONGODB_URI=your-mongodb-connection-string
NEXT_PUBLIC_HOST=http://localhost:3000
```

- `MONGODB_URI`: Required. Used by `lib/mongodb.js` to connect.
- `NEXT_PUBLIC_HOST`: Optional. Used to display the resulting short link and as a fallback redirect.

## Usage

1. Go to `/shorten`.
2. Enter the long URL.
3. Provide a preferred short code (e.g., `my-post`).
4. Click Generate and copy your short link: `http://localhost:3000/my-post` (or your configured host).
5. Visit `/{shorturl}` to be redirected to the original URL.

Notes:
- The server does not auto-generate codes. You must supply `shorturl`.
- If a code already exists, you’ll receive an error and should choose a different one.

## API

Endpoint: `POST /api/generate`

Request body:

```json
{
	"url": "https://example.com/very/long/path",
	"shorturl": "my-post"
}
```

Responses:
- On success: `{ "success": true, "error": false, "message": "Url generated successfully" }`
- If code exists: `{ "success": false, "error": true, "message": "Short URL already exists" }`

Behavior:
- Inserts `{ url, shorturl }` into the `links` collection.
- Does not return the code in the response; the client uses the user’s input.

## Redirects

- Dynamic route: `app/[shorturl]/page.js`
- Looks up `shorturl` in the DB; if found, redirects to the stored `url`.
- If not found, redirects to `NEXT_PUBLIC_HOST` (e.g., homepage).

## Database

- Collection: `links`
- Document shape: `{ url: string, shorturl: string }`
- Recommended: add a unique index on `shorturl` for stronger guarantees.

## Project Structure

```
eslint.config.mjs
jsconfig.json
next.config.mjs
package.json
postcss.config.mjs
README.md
app/
	globals.css
	layout.js
	page.js
	[shorturl]/
		page.js
	api/
		generate/
			route.js
	fonts/
	shorten/
		page.js
components/
	Navbar.js
lib/
	mongodb.js
public/
```

Key files:
- `app/shorten/page.js`: UI to create short links.
- `app/api/generate/route.js`: POST endpoint to store new links.
- `app/[shorturl]/page.js`: Redirects visitors based on the code.
- `lib/mongodb.js`: MongoDB client initialization.

## Deploy

You can deploy to any Node-compatible host. Vercel works great with Next.js.

1. Set environment variables (`MONGODB_URI`, `NEXT_PUBLIC_HOST`) in your hosting provider.
2. Build and start:

```powershell
npm run build
npm run start
```

## Limitations & Next Steps

- No automatic short code generation.
- No analytics (click counts, geo, etc.).
- No authentication or rate limiting.

Potential enhancements:
- Auto-generate codes when none is provided.
- Add analytics and dashboards.
- Add authentication, quotas, and admin tools.

## Acknowledgements

- Built with [Next.js](https://nextjs.org) and MongoDB.
- Styling via Tailwind CSS.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
