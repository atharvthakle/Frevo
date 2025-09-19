# FREVO

This repository contains the frontend prototype of FREVO, a Gen Z-first fintech platform that blends money, compliance, identity, jobs, education, and community. This frontend was developed as a prototype for a friend's startup, to demonstrate the core UI/UX and features of the FREVO platform.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Design & UI](#design--ui)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [License](#license)

---

## Project Overview
FREVO’s frontend prototype demonstrates the core user experience including onboarding, dashboard, vaults, FX conversion, invoicing, community engagement, education hub, and a freelancer marketplace. This is Phase 1 (MVP) of the platform.

---

## Features

### Onboarding & Digital Identity
- Persona selection: Freelancer / Client / Builder / General User
- Sign-up via Mobile/Email + KYC (PAN/Aadhaar)
- Create a Frevo Verified ID (portable QR portfolio)
- Gamified flow with levels and badges

### Dashboard
- Balances overview: USD, INR, Vault total
- Quick Convert button
- Vault Overview cards (Savings, Lifestyle, Taxes, Goals)
- Conversion Rate Tracker (live, locked 5 min)
- Upcoming Invoices / Job Payments
- Side Nudges Panel with gamified alerts
- Charts: Donut (vault distribution) & Timeline (income/expenses)

### FX Conversion Module
- One-click USD → INR conversion
- Live rate with breakdown (rate, fees, final INR)
- Transparent fee explainer
- Instant FIRC PDF download

### Vault System
- Warning Vault (alerts at 80% budget)
- Money Lock Vault (block overspending)
- Personalization: colors & emojis

### Invoicing & Compliance
- Smart Invoice Generator
- Payment links (PayU style)
- Auto-sorting into vaults
- Compliance helpers (GST, TDS, FIRC)

### UPI + Credit
- Visualize linked RuPay credit card
- Integrate Frevo Score

### Education Hub
- Gamified course tiles (e.g., "Taxes 101")
- Badges + XP points
- Contextual nudges

### Community & Networking
- Verified connections
- Leaderboards
- Peer endorsements
- Feed for milestones

### Get Hired Marketplace
- Freelancer profiles
- AI-powered job suggestions for clients
- Job room with deadlines & escrow payments
- Earnings flow into vaults

---

## Design & UI
- **Colors:** Primary Aqua/Teal, Secondary White/Light Grey, Purple Accent  
- **Typography:** Rounded modern fonts (Poppins / Inter)  
- **Visuals:** Floating cards, gamified microinteractions, playful copy  
- **Navigation:** 5-tab desktop-first nav with smart search  
- **Home Page:** Full FREVO logo; app corner shows the FREVO “F” icon (replaceable as image)

---

## Tech Stack
- **Framework:** Next.js 14  
- **Language:** TypeScript & JavaScript  
- **Styling:** TailwindCSS, tailwindcss-animate, tw-animate-css  
- **Charts:** Recharts  
- **UI Components:** Radix UI, Vaul  
- **Forms:** React Hook Form  
- **State & Utilities:** clsx, zod, date-fns, class-variance-authority  

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation
```cmd
# Clone the repository
git clone https://github.com/atharvthakle/Frevo.git
cd Frevo

# Install dependencies
npm install

# Run the development server
npm run dev

# Deploy locally
Open http://localhost:3000 to view in the browser.
