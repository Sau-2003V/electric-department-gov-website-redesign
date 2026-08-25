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

### Who is facing the problem?

Citizens face this problem. Some citizens are aware of the existing complaint systems, while others are not. Every state has its own system, making the overall experience inconsistent. The worst part is that many issues are not resolved, and there is often no accountability or clear action taken.

### What is difficult about the current experience?

The current UI is often poor and difficult to use. Complaints are not always resolved, and users receive little to no clear feedback about what is happening with their complaints. There is also no effective way to verify whether an engineer has actually worked on an issue or has provided false or incomplete details. In many cases, citizens have no clear way to escalate the issue or take further action.

### What did you change?

We created a complete end-to-end system where consumers and engineers can use the same platform. Citizens can easily submit complaints, while engineers can manage and resolve them through the same system.

We improved the UI and overall user experience, shortened the complaint submission flow, and removed unnecessary CAPTCHA steps. We also introduced better server scaling capabilities to support a growing number of users and complaints.

Complaint data can be made publicly available, allowing citizens to see what issues are being reported and how they are being handled across different states. This creates greater transparency and accountability.

### Why is your version better?

Our version provides:

- Better UI and user experience
- Shorter and simpler complaint flows
- Higher performance
- Better server scaling capabilities
- Greater transparency
- Improved notification systems
- Automatic notifications to officials when complaints are raised
- Automatic complaint categorization and filtering
- Better tracking and accountability for complaint resolution
