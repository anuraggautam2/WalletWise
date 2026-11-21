# WalletWise — Comprehensive Project Audit & Architectural Analysis

**Date:** November 21, 2026  
**Repository:** [https://github.com/anuraggautam2/WalletWise](https://github.com/anuraggautam2/WalletWise)  
**Auditor:** Antigravity AI Engineering

---

## 1. Executive Summary

WalletWise is a full-stack student fintech application designed to help university students track campus income and expenses, monitor monthly allowances, pace budgets, and understand spending habits. 

This audit evaluates the codebase across 9 critical dimensions: frontend architecture, backend API design, database persistence, authentication/authorization, data integrity and analytics calculations, responsive design, Vercel serverless deployment, security, and UI/UX cohesion.

---

## 2. Existing Functionality & Current Architecture

### 2.1 Technology Stack
- **Frontend Framework:** React 18.3.1 (SPA)
- **Build Tool:** Vite 6.1.0 with PostCSS & Autoprefixer
- **Styling:** Tailwind CSS 3.4.17
- **UI & Motion:** Framer Motion 14.14.0, Lucide React 0.475.0, Recharts 3.11.0
- **Backend Runtime:** Node.js 20+ with Express 5.3.0
- **Database Engine:** MongoDB with Mongoose 9.12.2 (with resilient JSON file persistence fallback)
- **Security & Middleware:** Helmet 8.3.0, Express Rate Limit 8.7.5, Cookie-Parser 1.4.7, BcryptJS 3.0.3, JSONWebToken 9.0.3, CORS 2.8.6
- **Deployment Platform:** Vercel (Vite Static Frontend + Vercel Serverless Functions via `/api`)

### 2.2 System Architecture Overview

```
                                      [ Vercel Edge Router ]
                                                │
                       ┌────────────────────────┴────────────────────────┐
                       ▼                                                 ▼
             [ Static CDN: dist/ ]                             [ Serverless API: /api ]
          React 18 Single Page App                             Express 5 App Handler
        (Vite SPA with Client Routing)                        (Mounted on Serverless Node)
                       │                                                 │
            ┌──────────┴──────────┐                                      ▼
            ▼                     ▼                             [ Controllers ]
     [ Public Landing ]    [ Authenticated App ]             Auth / Transactions / Budgets
      Hero / Features /     Overview / Transactions /                    │
      Showcase / FAQ        Budgets / Analytics /                        ▼
                            Settings                           [ Data Access Layer ]
                                                         Mongoose Models (MongoDB Atlas)
                                                                 (with local dev fallback)
```

---

## 3. Discovered Issues & Severity Classification

| Issue ID | Area | Description | Severity | Impact |
|:---------|:-----|:------------|:---------|:-------|
| **AUD-01** | Features | Missing Savings Goals feature completely | **HIGH** | Users cannot create, view, or manage savings goals despite it being a core fintech requirement. |
| **AUD-02** | Database | Silent fallback to in-memory/file storage masking database connectivity failures | **HIGH** | In production, if MongoDB Atlas connection drops or is unconfigured, users could be served ephemeral data that resets across serverless cold starts. |
| **AUD-03** | UI / UX | Visual styling lacks cohesive fintech polish (excessive glows, harsh gradients, inconsistent card elevations) | **HIGH** | Looks like a prototype instead of a top-tier fintech application (Linear / Stripe / Ramp standard). |
| **AUD-04** | Analytics | Date-based filtering missing in Transactions UI; basic charts lack deep financial insights | **MEDIUM** | Frontend `TransactionsTab` has no date range picker even though the backend supports `startDate` and `endDate`. |
| **AUD-05** | Budgeting | Budget calculations lack real-time pacing metrics (daily allowable burn rate vs days left) | **MEDIUM** | Students need to know "can I spend ₹400 today without blowing my budget before the 30th?" |
| **AUD-06** | Currency | Hardcoded currency symbols throughout dashboard components instead of honoring user profile currency | **MEDIUM** | If a student chooses USD ($), EUR (€), or GBP (£) in Settings, overview and budgets continue showing Indian Rupee (₹). |
| **AUD-07** | Data Export | No transaction export capability (CSV / JSON) | **LOW** | Students cannot export their monthly records for personal accounting or parent reports. |
| **AUD-08** | Error States | Empty and error states lack rich, actionable fintech illustrations and contextual recovery | **MEDIUM** | Blank lists lack clear calls-to-action to log the first expense or configure budgets. |
| **AUD-09** | Vercel Deployment | Serverless Mongoose connection pooling requires robust global caching across lambda invocations | **HIGH** | Without connection reuse, serverless functions can exhaust MongoDB connection pools on traffic spikes. |
| **AUD-10** | Security | Strict ownership validation in controllers needs explicit verification across all write operations | **MEDIUM** | Ensure no transaction or budget can ever be altered or viewed by another authenticated user. |

---

## 4. In-Depth Architectural Findings

### 4.1 Frontend Component Architecture
- **State Management:** Handled via React Context (`AuthContext` and `TransactionContext`). While effective, `TransactionContext` was previously managing too many disparate responsibilities (budgets, transactions, stats, toast). Splitting concerns or introducing dedicated hooks makes state management predictable and maintainable.
- **Routing:** Path-based navigation in `App.jsx` cleanly handles `/`, `/login`, `/register`, `/dashboard`, `/forgot-password`, `/reset-password` without external dependencies, properly integrated with `window.history.pushState` and `popstate`.
- **Modals:** Transaction and Budget modals were functional but lacked clean input formatting, quick category chips, and keyboard shortcut accessibility (`Escape` to close, `Enter` to submit).

### 4.2 Backend & Data Integrity
- **Controllers & Middleware:** `auth.js` implements clean Bearer and cookie JWT verification. Ownership checks (`userId`) are properly enforced in `transactionController.js` and `budgetController.js`.
- **Mongoose vs Local Fallback:** `server/config/db.js` had a safe timeout fallback. However, as per user instructions: *one user's transactions must never be accessible to another, and production must never silently switch to ephemeral storage*. We must enforce strict MongoDB Atlas connectivity when `MONGODB_URI` is present, with connection caching in global scope for serverless environments.

### 4.3 Analytics & Calculations
- **Total Balance:** `totalIncome - totalExpense`. Correct.
- **Monthly Income & Monthly Expense:** Computed within `startOfMonth` and `endOfMonth`. Correct.
- **Savings Rate:** Currently absent. Needs a formula: `((monthlyIncome - monthlyExpense) / monthlyIncome) * 100` when `monthlyIncome > 0`.
- **Daily Average Expense:** Missing. Formula: `monthlyExpense / currentDayOfMonth`.
- **Budget Pacing:** Day percentage (`currentDay / totalDaysInMonth * 100`) compared to spend percentage (`spent / budget * 100`).

---

## 5. Recommended Remediation Plan & Priorities

### Phase A: Architecture & Database Hardening (Priority 1)
1. **Serverless MongoDB Connection Pooling:** Update `server/config/db.js` with global connection cache (`global.mongoose = { conn, promise }`) optimized for Vercel Serverless.
2. **Savings Goals Backend:** Create `server/models/SavingsGoal.js`, `server/controllers/savingsController.js`, `server/routes/savingsRoutes.js`, and mount on `/api/savings`.
3. **Strict Validation & User Isolation:** Guarantee that every transaction, budget, and savings goal query enforces `{ _id: id, userId }`.

### Phase B: Premium Fintech UI/UX Redesign (Priority 2)
1. **Aesthetic Direction:** Linear/Stripe/Ramp design language. Deep obsidian background (`#0A0D14`), precision borders (`border-white/[0.08]`), crisp typography (`Inter`), restrained glow, tabular numbers (`font-mono` / `tabular-nums` for financial balances), subtle accent badges.
2. **Landing Page Overhaul:** Clean, high-conversion fintech hero, live product demonstration card, clear value propositions, interactive expense calculator.
3. **Dashboard Canvas:**
   - Unified sidebar with active indicator pill and workspace switcher.
   - Topbar with live account currency, sync status, and quick-add actions.
   - Redesigned Overview Tab with balance hero card, visual budget pacing meter, spending trend area chart, category allocation bars, and recent activity feed.
   - Dedicated Savings Goals Tab with milestone progress bars, remaining target amounts, and deposit modal.
   - Date range selector and CSV export in Transactions Tab.
   - Enhanced Analytics Tab with Income vs. Expense monthly comparison, category breakdown, burn rate insights, and financial health score.

### Phase C: Vercel Production Deployment (Priority 3)
1. Verify `vercel.json` SPA rewrites and serverless function dispatch.
2. Generate comprehensive `VERCEL_DEPLOYMENT.md` with environment variable checklist.
3. Test production build, serverless cold starts, and authenticated flows.

---

*End of Audit Report.*
