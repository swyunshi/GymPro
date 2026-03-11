<h1 align="center">
  💪 GymPro — Full-Stack Gym Management Website
</h1>

<p align="center">
  A modern, full-stack gym management platform built with <strong>React</strong>, <strong>Vite</strong>, and <strong>Supabase</strong> — featuring a public website, a member dashboard, and a powerful admin panel.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Framer_Motion-Animations-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Supabase Setup](#-supabase-setup)
- [Available Scripts](#-available-scripts)
- [Role-Based Access](#-role-based-access)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**GymPro** is a complete gym management solution that covers three distinct portals:

| Portal | Audience | Purpose |
|--------|----------|---------|
| 🌐 **Public Website** | Visitors | Marketing, info, contact & sign-up |
| 🏋️ **Member Dashboard** | Registered Members | View memberships, workouts, diet & attendance |
| 🛡️ **Admin Panel** | Admins / Staff | Full control over members, trainers, plans, payments & more |

---

## ✨ Features

### 🌐 Public Pages
- **Home** — Hero section, features, testimonials & CTA with smooth animations
- **About** — Gym history, mission, and team highlights
- **Trainers** — Trainer profiles fetched from the database
- **Membership Plans** — Dynamic pricing cards with plan details from Supabase
- **Gallery** — Photo gallery grid
- **Contact** — Contact form with validation

### 🔐 Authentication
- **Login** — Email/password login with Supabase Auth
- **Register** — New member registration with role assignment

### 🏋️ Member Dashboard
- **Dashboard** — Overview of active membership, upcoming sessions
- **Membership** — View current plan, expiry, and status
- **Attendance** — Personal attendance history
- **Workout Plan** — Trainer-assigned workout programs
- **Diet Plan** — Nutritional guidance from trainers

### 🛡️ Admin Panel
- **Admin Dashboard** — KPI cards, revenue charts, and membership analytics (Recharts)
- **Member Management** — View, search, edit, and delete members
- **Trainer Management** — Add and manage gym trainers
- **Plans Management** — Create, update, and delete membership plans
- **Payment Management** — Track and manage member payments
- **Attendance Management** — Log and monitor gym attendance
- **Content Management** — Manage public-facing content

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|---------|
| [React 19](https://react.dev/) | UI framework |
| [Vite 7](https://vitejs.dev/) | Fast build tool & dev server |
| [Supabase](https://supabase.com/) | Backend-as-a-Service (Auth, Database, RLS) |
| [React Router DOM v7](https://reactrouter.com/) | Client-side routing |
| [Framer Motion](https://www.framer.com/motion/) | Page & component animations |
| [Recharts](https://recharts.org/) | Admin dashboard data visualization |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |
| Vanilla CSS | Styling (no CSS framework dependency) |

---

## 📁 Project Structure

```
gym-website/
├── public/                   # Static assets
├── src/
│   ├── assets/               # Images and other assets
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── ProtectedRoute.jsx
│   │   ├── admin/            # Admin-specific components
│   │   └── member/           # Member-specific components
│   ├── context/              # React Context (Auth, etc.)
│   ├── lib/
│   │   └── supabaseClient.js # Supabase client initialization
│   ├── pages/
│   │   ├── public/           # Home, About, Trainers, Plans, Gallery, Contact
│   │   ├── auth/             # Login, Register
│   │   ├── member/           # Member Dashboard, Membership, Attendance, Workout, Diet
│   │   └── admin/            # Admin Dashboard, Member/Trainer/Plan/Payment Management
│   ├── App.jsx               # Root component with routes
│   ├── App.css
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── .env.example              # Environment variable template
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [Supabase](https://supabase.com/) account (free tier is sufficient)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/gym-website.git
   cd gym-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then fill in your Supabase credentials in the `.env` file (see [Environment Variables](#-environment-variables)).

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173`

---

## 🔑 Environment Variables

Create a `.env` file in the root of your project (copy from `.env.example`):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **⚠️ Important:** Never commit your `.env` file to version control. It is already listed in `.gitignore`.

You can find these values in your Supabase project:
1. Go to [supabase.com](https://supabase.com/) → Your Project
2. Navigate to **Settings** → **API**
3. Copy the **Project URL** and **anon public** key

---

## 🗄️ Supabase Setup

This project uses Supabase for:
- **Authentication** — Email/password sign-up and login
- **PostgreSQL Database** — Members, trainers, plans, payments, attendance
- **Row Level Security (RLS)** — Role-based data access

### Key Database Tables

| Table | Description |
|-------|-------------|
| `profiles` | User profiles with `role` field (`admin`, `member`) |
| `trainers` | Trainer information |
| `membership_plans` | Available gym plans with pricing |
| `memberships` | Member–plan assignments with dates |
| `payments` | Payment records per member |
| `attendance` | Daily check-in logs |
| `workouts` | Workout plans assigned to members |
| `diet_plans` | Diet plans assigned to members |

### User Roles

The system supports two roles stored in the `profiles` table:

| Role | Access |
|------|--------|
| `admin` | Full access to the admin panel and all management features |
| `member` | Access to personal dashboard, attendance, workout, and diet plans |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server at `localhost:5173` |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## 🔒 Role-Based Access

Routes are protected using a custom `ProtectedRoute` component that checks the user's session and role from Supabase Auth + the `profiles` table:

```
/                        → Public (Home)
/about                   → Public
/trainers                → Public
/plans                   → Public
/gallery                 → Public
/contact                 → Public
/login                   → Auth only (redirects if logged in)
/register                → Auth only (redirects if logged in)
/member/*                → Protected (role: member)
/admin/*                 → Protected (role: admin)
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure to follow the existing code style and add comments where necessary.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ using React & Supabase · GymPro
</p>
