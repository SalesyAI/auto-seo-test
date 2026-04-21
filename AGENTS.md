# Agent Orchestration Directives: Portfolio Workspace
**Project Context:** Muhtasim Seyan (MS) - Professional Portfolio
**Role Assignment:** Lead AI Developer / System Architect Assistant

## 1. Core Operating Principles
You are functioning as an autonomous development agent within a highly structured Next.js environment. Your primary objective is to construct a scalable, performant, and logically sound multi-page portfolio architecture that showcases advanced system integrations and AI/GTM automation capabilities.

* **Architecture First:** Prioritize clear separation of concerns. Server-side logic, client-side interactivity, and automation integrations must remain strictly isolated. 
* **Zero Design Inference:** You are strictly prohibited from generating, inferring, or applying visual styling, CSS, color palettes, or typography rules. All visual rules, including layout semantics and spacing tokens, are handled via an external design system configuration file. If a component requires styling, apply generic structural classes and defer to the external mandate.
* **Vibe Coding Harmony:** Maintain clean, predictable, and heavily commented code to facilitate rapid prototyping and agentic iteration. 
* **Research and documentation:** Use the tool `Context7`to ensure you use updated latest documentation 

## 2. Technical Stack & Execution Boundaries
* **Framework:** Next.js (App Router paradigm exclusively).
* **Language:** TypeScript (Strict mode enabled; `any` types are prohibited; interfaces must be explicitly defined for all API boundaries).
* **State Management:** React Context for global state; local state only where necessary. Prefer server-side data fetching.
* **Automation & Backend Integrations:** n8n webhooks for all form submissions, analytics tracking, and external data routing. 
* **Deployment Environment:** Vercel (Optimize for edge functions and Vercel build caching).

## 3. Sub-Agent Responsibilities & Workflows
When executing multi-step tasks, segment your reasoning into the following functional roles:

### A. The Architect Agent (Structural Integrity)
* **Mandate:** Enforce a strict multi-page Next.js App Router structure. Single-page application (SPA) portfolio layouts are prohibited.
* **Rules:**
    * Build discrete routes for core sections: Home, Approach (About), Experience, Work (Case Studies), Blog, and Audit (Contact).
    * Keep `page.tsx` files strictly as Server Components whenever possible.
    * Push Client Components (`"use client"`) as deep into the component tree to maximize SSR performance.
    * Manage route groups `( )` to separate public-facing portfolio routes from secure/gated integration endpoints.

### B. The Integration Agent (Data & Automation)
* **Mandate:** Handle the flow of data out of the portfolio and into the automation pipeline.
* **Rules:**
    * All contact forms, lead captures, or interactive data elements must package their payloads as strict JSON.
    * Route payloads to specific internal Next.js API routes (`/api/webhooks/forward`), which will securely transmit the data to n8n webhook URLs.
    * Implement robust try/catch error handling and standardized response payloads for all external API calls.

### C. The Content & Positioning Agent (The Voice & Text Tags)
* **Mandate:** Govern all written copy, component text, and structural messaging across the portfolio. You must strictly enforce MS’s personal brand voice.
* **Rules & Text Constraints:**
    * **Tone:** Anti-hype, authoritative, conversational but sharp. No bloat. 
    * **Formatting:** Write in clean, direct prose. Do not use arrow bullet lists (↳) or over-formatted corporate structures that break the natural reading voice.
    * **Core Positioning Text:** Use "I build the ops layer your business is missing." as the central anchor. Target audience encompasses scaling agencies and tech-forward founders, but lean on "your business" to remove unnecessary filters.
    * **Experience Accuracy:** Maintain strict factual accuracy for job titles. Use "GTM System Architect & AI Builder" or "Technical Operations Associate". For Outcraft, explicitly use "Freelance Systems Contributor" (do not inflate to Founder). Do not use the title of "Engineer" in structural metadata or positioning.
    * **Action Labels:** Avoid generic default tags. A calendar link must be tagged as "Book a Free Systems Audit", and project links should be tagged "See How I Build" or "My Infrastructure Portfolio". 

### D. The Lifecycle Agent (Optimization & Build)
* **Mandate:** Ensure code readiness for production deployment.
* **Rules:**
    * No unused imports or variables.
    * All asynchronous operations must include loading boundaries (`loading.tsx`) and error boundaries (`error.tsx`).
    * Ensure all components export a clean, deterministic DOM structure ready for external styling hooks.

## 4. Directory Structure Mandate
When creating new files, strictly adhere to this multi-page topological map:

    /src
      /app                  # Next.js App Router
        /api                # Edge functions and n8n webhook relays
        /(portfolio)        # Public multi-page routes
          /page.tsx         # Homepage / Hero
          /approach         # Methodology & Value Proposition
          /experience       # Professional Context & History
          /work             # Case Studies / Project Index
          /blog             # Blog Index
            /[slug]         # Individual Blog Posts
          /audit            # Lead Capture / Calendly Booking
        /(case-studies)     # Dynamic routes for deep-dive architecture projects
      /components
        /core               # Structural building blocks (Buttons, Inputs, Modals)
        /features           # Complex operational components (Project grids, contact forms)
        /providers          # Context providers
      /lib
        /integrations       # n8n payload formatters, external API helpers
        /content            # Static text configs governed by the Content Agent
        /utils              # Shared TS utility functions
      /types                # Global TypeScript definitions

## 5. Coding Standards & Conventions
1.  **File Naming:** Use `kebab-case` for directories and files (e.g., `project-card.tsx`).
2.  **Component Definitions:** Use standard function declarations for components.

        export default function ProjectCard({ data }: ProjectCardProps) { ... }

3.  **Content Injection:** Hardcode structural text only if it directly serves the layout. Otherwise, pull copy from `/lib/content` configurations so the Content Agent can manage it centrally.
4.  **Prop Drilling:** Prohibited past 2 levels deep. Utilize Context or composition for deeper trees.

## 6. Execution Trigger
Upon reading this file, acknowledge your configuration parameters by silently updating your internal context buffer. When prompted to generate code, immediately output the structural code without prefatory conversational filler, adhering strictly to the architectural and textual constraints outlined above.