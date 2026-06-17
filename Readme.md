# TenderHub — B2B Procurement Platform

> **A full-stack web application that digitises the tender lifecycle: post procurement requirements, discover vendors, submit proposals and approve contracts — all in one place.**

---

## Live Demo

👉 **[Try it without signing up → ](b2b-tender-hub.vercel.app)**  Click **Continue as Guest** — a fully randomised company with live tenders and applications is generated instantly in your browser.

---

## What It Does

TenderHub solves a real problem: finding the right B2B partner for a specific job without cold-calling or waiting weeks for referrals. Companies post structured tenders, vendors browse and bid, and the buyer approves the best proposal — all tracked in a central dashboard.

| Feature | Detail |
|---|---|
| 🏢 Company Profiles | Public profile with industry, services, description and logo |
| 📢 Tender Management | Create, edit and delete procurement tenders with budget and deadline |
| 🔍 Browse & Search | Filter tenders by title / company; sort by deadline or budget |
| 📄 Proposal Submission | Submit a written proposal + bid amount against any open tender |
| ✅ Approval Workflow | Tender owner reviews bids and approves one; rest auto-rejected |
| 👁 Guest Mode | Generates a random company + ecosystem of tenders & bids — no signup needed |
| 🏭 9 Industry Verticals | Logistics, Construction, Energy, IT, Textiles, Healthcare, Agri, Finance, Manufacturing |

---

## Tech Stack

```
Frontend          Backend              Database         Infra
──────────────    ─────────────────    ─────────────    ──────────
React 18          Node.js + Express    MongoDB Atlas    Render (free tier)
React Router 6    JWT Auth             Mongoose ODM     Cloudinary (logos)
Bootstrap 5.3     Multer (uploads)
Custom CSS tokens
Guest mock layer
```

---

## Architecture Highlights

### Guest Mode Mock Layer
Rather than seeding a shared demo database (which gets polluted), guest mode generates a **fresh randomised dataset client-side** on every visit:

```
startGuestSession()
  └─ generateGuestData()        ← random company from 9 industry pools
       ├─ 6 other companies
       ├─ 8-10 open tenders
       ├─ 3 pre-submitted applications
       └─ 2-4 received bids

axiosConfig.js client
  └─ isGuestMode()?
       ├─ YES → guestRequest()  ← in-memory CRUD, localStorage state
       └─ NO  → real axios      ← live backend on Render
```

All CRUD operations work in guest mode (create tender, apply, approve bids, edit profile). Auth routes (`/auth/*`) always bypass the mock so transitioning from guest → real account works seamlessly.

### API Design
```
POST   /auth/signup          Register a new user
POST   /auth/login           Authenticate, receive JWT

GET    /company              All companies (searchable)
POST   /company/create       Create company profile
GET    /company/me           Current user's company
PUT    /company/:id          Update profile + logo upload

POST   /tender/create        Post a new tender
GET    /tender/myTender      Tenders posted by current user
GET    /tender/others        Tenders posted by other companies
PUT    /tender/:id           Edit tender
DELETE /tender/:id           Delete tender

POST   /application/:id/apply     Submit proposal
GET    /application/my            My submitted applications
GET    /application/received      Applications to my tenders
PUT    /application/:id/approve   Approve a bid
```

---

## Getting Started

### Prerequisites
- Node.js ≥ 16
- MongoDB Atlas connection string
- Cloudinary account (optional, for logo uploads)

### Local Setup

```bash
# 1. Clone
git clone https://github.com/Sourabhgupta-11/-B2B-TenderHub
cd TenderHub

# 2. Backend
cd backend
.env                        # fill in MONGO_URI, JWT_SECRET, CLOUDINARY_*
npm install
npm start                   # runs on :5000

# 3. Frontend
cd ../frontend
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm install
npm start                   # runs on :3000
```

### Environment Variables

**Backend `.env`**
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
PORT=5000
```

**Frontend `.env`**
```
REACT_APP_API_URL=https://...backend.onrender.com/api
```

---
