# Vidhyut Portal

**Vidhyut Portal** is a citizen-first electricity complaint platform built for the **WhatMovesIndia Hackathon**. It aims to make reporting electrical issues—such as power outages, damaged wires, faulty streetlights, and billing concerns—simple, transparent, and easy to track.

## Features

- Submit electricity-related complaints online
- Track complaint status with clear progress updates
- Help citizens share essential issue details quickly
- Provide a modern, accessible interface for public services

## Tech Stack

- [Next.js](https://nextjs.org/) – React framework for the web application
- [Tailwind CSS](https://tailwindcss.com/) – utility-first styling
- [Supabase](https://supabase.com/) – backend services, database, and authentication

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- A Supabase project (for backend services)

### Installation

1. Clone the repository and open the project directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your Supabase project credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run start     # Run the production server
npm run lint      # Run ESLint
```

## Project Goal

Vidhyut Portal supports more responsive electricity services by giving citizens a clear digital channel to report issues and follow their resolution journey.

## Hackathon

Built for the **WhatMovesIndia Hackathon**.
