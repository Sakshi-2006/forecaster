# Forecaster

A modern retail intelligence dashboard for sales forecasting, inventory monitoring, and replenishment planning. The app presents business-critical metrics in a polished interface and helps teams quickly identify risk, track category performance, and prioritize stock actions.

Live app: https://forecaster-rho.vercel.app/

## Overview

Forecaster is a Next.js dashboard designed for retail operations teams. It provides:

- sales and forecast trend visuals
- KPI tracking for forecast accuracy, stockout risk, inventory value, and fill rate
- category performance comparison
- replenishment recommendations with urgency status
- a responsive, mobile-friendly workspace layout

## Features

- Forecast comparison across recent weeks
- Replenishment planner for stock and reorder decisions
- Inventory health indicators and risk labeling
- Dashboard cards with business metrics
- Recharts-powered analytics views
- Clean styling with Tailwind CSS and shadcn-inspired UI patterns

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React
- Vercel Analytics

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  retail-dashboard.tsx
  ui/
    button.tsx
lib/
  utils.ts
public/
  ...static assets
package.json
pnpm-lock.yaml
next.config.mjs
postcss.config.mjs
tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm

### Installation

```bash
pnpm install
```

### Run the app locally

```bash
pnpm dev
```

Then open http://localhost:3000 in your browser.

### Production build

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

## Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

## Notes

This project is built as a front-end dashboard experience and uses mock retail data to demonstrate forecasting and inventory analysis workflows. It is well-suited for use as a UI prototype, internal demo, or foundation for a larger sales intelligence product.

## License

This project does not currently include a license file.
