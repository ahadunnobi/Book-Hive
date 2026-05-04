# BookHive 📖🐝

**BookHive** is a premium, high-performance web application designed for book enthusiasts to discover, explore, and manage their reading journey. Built with a focus on speed and aesthetic excellence, it provides a seamless "borrowing" experience powered by a curated local catalog.

## 🚀 Live Demo
[Coming Soon](https://book-hive-demo.vercel.app)

## ✨ Key Features
- **Curated Catalog**: Explore over 2,000 titles across 20+ specialized categories (Tech, Science, Fiction, etc.).
- **Smart Search**: Find any book instantly with our real-time search functionality.
- **Featured Collection**: Discover top-rated and trending books handpicked for you.
- **Responsive Design**: Optimized for all devices—from desktop to mobile.
- **Blazing Fast**: Powered by Next.js and local JSON data for near-instant page loads.
- **Modern UI**: A premium interface featuring glassmorphism, smooth animations, and a rich color palette.
- **Authentication**: Secure login and registration powered by Better-Auth (Social and Email/Password).

## 🛠️ Tech Stack
- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Authentication**: [Better-Auth](https://www.better-auth.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📦 NPM Packages Used
- `next`
- `react`
- `react-dom`
- `framer-motion`
- `better-auth`
- `daisyui`
- `tailwindcss`
- `typescript`
- `mongodb` (Legacy driver support)

# BookHive Regeneration Prompt 🚀

This prompt is designed to help an AI (like Cursor or Antigravity) rebuild or extend the BookHive project with a consistent vision.

---

## The Vision
Build a premium, state-of-the-art book catalog and borrowing platform called **BookHive**. The aesthetic should be "Modern Academic meets Futuristic Tech"—think glassmorphism, deep navy and golden honey tones, and smooth, staggered animations.

## Part 1: General Website & Catalog
- **Hero Section**: A high-impact hero with a tagline like "Find Your Next Read" and a "Browse Collection" CTA. Include a glassmorphic stats card (e.g., "2,000+ Titles", "20 Categories").
- **Featured Books**: A horizontally scrolling or grid section showing books with `featured: true`. Use `Framer Motion` for entrance animations.
- **Dynamic Catalog**: A searchable and filterable list of books.
    - Fetch data from a local JSON source (`@/data/books.json`).
    - Implement category filtering (e.g., Tech, Science, Fiction).
    - Use a debounced search bar.
- **Book Details**: A dedicated page for each book showing full details (ISBN, Author, Rating, Description).

## Part 2: Authentication & User Experience
- **Sign In / Sign Up**: Implementation of Better-Auth with:
    - Email/Password login.
    - Google Social Auth (placeholder integration).
- **User Profile**: A dashboard where users can see their "borrowed" books (local mock state for now).
- **Navigation**: A sticky, translucent navbar with a user avatar and links to Home, Books, and Profile.

## Technical Requirements
- **Framework**: Next.js 16 (Turbopack).
- **UI Libraries**: Tailwind CSS + DaisyUI.
- **Animations**: Framer Motion for scroll reveals and page transitions.
- **Data**: Server-side fetching from `@/lib/books-json.ts`.
- **SEO**: Meta tags for title "BookHive | Discover & Borrow" and description "Explore a curated collection of 2,000+ books."

---

## Color Palette
- **Primary**: Deep Navy (`#0F172A`)
- **Secondary**: Golden Honey (`#F59E0B`)
- **Accent**: Soft Amber / Glassmorphic White


## 🔧 Installation & Setup
1. Clone the repository: `git clone https://github.com/your-username/BookHive.git`
2. Install dependencies: `npm install`
3. Set up environment variables (copy `.env.example` to `.env`)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---
Built with ❤️ for book lovers everywhere.
