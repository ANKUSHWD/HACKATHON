# OptiHire — AI-Powered Placement Intelligence Dashboard

⚡ An intelligent platform that helps students track skills, predict placement chances, and get AI-driven recommendations.

![OptiHire](https://img.shields.io/badge/OptiHire-AI%20Placement%20Intelligence-7c3aed?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Landing Page** | Hero, stats, features, company logos, testimonials, FAQ |
| 🔐 **Auth System** | Login/Signup with animated glassmorphism UI |
| 📋 **Smart Onboarding** | 4-step guided setup (skills, resume, college, extras) |
| 📊 **Dashboard** | Real-time summary cards, company matches, AI panel |
| 🎯 **AI Matching** | Match % + placement probability per company |
| 🤖 **AI Recommendations** | "Apply / Improve / Build" with prioritized tasks |
| 🎤 **Mock Interviews** | AI-scored practice interviews with detailed feedback |
| 🛡️ **Admin Panel** | Student analytics, charts, filters, and at-risk tracking |
| 📈 **Skills Tracker** | Animated progress bars by skill category |
| ✅ **Daily Tasks** | XP-based task system to stay on track |
| 🔔 **Notifications** | Real-time toast alerts for deadlines and updates |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the project
cd hack

# Install frontend
cd frontend
npm install

# Install backend
cd ../backend
npm install
```

### Run

```bash
# Terminal 1 — Frontend
cd frontend
npm run dev
# → http://localhost:5173

# Terminal 2 — Backend
cd backend
node server.js
# → http://localhost:5000
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 👩‍💼 Admin | `admin@optihire.com` | `admin123` |
| 👨‍🎓 Student | Sign up with any email | Any password |

---

## 🧠 AI Logic (Rule-Based)

| Metric | Formula |
|--------|---------|
| **Match %** | `intersect(userSkills, requiredSkills) / requiredSkills × 100` |
| **Probability** | `matchScore×0.60 + GPA×0.20 + projects×0.20 + resumeBonus` |
| **Action** | `≥75% → Apply Now` · `≥40% → Improve Skills` · `<40% → Build Foundation` |
| **Interview** | `keywordMatch% + lengthBonus + structureBonus` |

---

## 📁 Project Structure

```
hack/
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, Sidebar, CompanyCard, SkillsTracker, etc.
│   │   ├── pages/          # Landing, Auth, Onboarding, Dashboard, Interview, Admin
│   │   ├── context/        # AuthContext, DataContext
│   │   ├── utils/          # matchEngine, probabilityEngine, aiRecommender, interviewEvaluator
│   │   ├── data/           # dummyData (companies, students, questions, testimonials)
│   │   ├── App.jsx         # Router
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Glassmorphism design system
│   └── index.html
├── backend/
│   ├── server.js           # Express API
│   └── package.json
└── README.md
```

---

## 🎨 Design System

- **Theme**: Dark mode with blue/purple gradients
- **Style**: Glassmorphism with frosted glass cards
- **Typography**: Inter (Google Fonts)
- **Animations**: Floating orbs, hover effects, progress transitions
- **Icons**: Lucide React

---

## 🏆 Built for Hackathon

This project is a complete MVP designed for hackathon demonstration. All data is stored in localStorage — no external database or API keys required.

---

Made with ⚡ by OptiHire Team
