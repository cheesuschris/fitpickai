# FitPickAI

WardrobeAI is a full-stack web application that helps users organize their virtual wardrobe and automatically generates a **daily outfit of the day (OOTD)**. Users can upload their clothes, mark availability (e.g., laundry), and get personalized outfit suggestions displayed on an avatar.  

Built with **Next.js, Tailwind CSS, Supabase, and Vercel**, this project demonstrates modern full-stack web development, cloud deployment, and UX-focused product design.

---

## ✨ Features
- **User Accounts** – Secure authentication with Supabase Auth.  
- **Wardrobe Management** – Upload clothing images and categorize by type (shirts, pants, shoes, etc.).  
- **Outfit Generator** – Algorithm selects a daily outfit (avoids unavailable/repeated items).  
- **Outfit of the Day** – See your auto-generated look on a customizable avatar.  
- **History & Stats** – Track past outfits, most-worn items, and usage trends.  
- **Responsive UI** – Clean design with Tailwind + shadcn/ui, optimized for desktop & mobile.  

---

## 🖼️ Screenshots
*(Add screenshots/gifs of key flows: Wardrobe page, Outfit of the Day, History view, Avatar)*  

---

## 🛠️ Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/) (React + TypeScript)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Framer Motion](https://www.framer.com/motion/)  
- **Backend / Database**: [Supabase](https://supabase.com/) (Postgres, Auth, Storage)  
- **Hosting**: [Vercel](https://vercel.com/) (CI/CD from GitHub)  
- **Media Storage**: Supabase Storage (or [Cloudinary](https://cloudinary.com/))  
- **Optional ML**: [Hugging Face](https://huggingface.co/) models for clothing auto-tagging  

---

## 🚀 Getting Started

### 1. Clone Repo
```bash
git clone https://github.com/yourusername/wardrobeai.git
cd wardrobeai
