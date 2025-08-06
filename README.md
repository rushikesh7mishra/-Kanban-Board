# 🧠 Kanban App

A modern, full-stack Kanban task board built with **React + TypeScript**, **Vite**, **Tailwind CSS**, and **Node.js (Express)** with **Type-safe APIs (Zod)**, **Jest/Vitest tests**, and **Swagger/OpenAPI** documentation.

## 📁 Project Structure

```
kanban-app/
├── client/            # Frontend with Vite + React + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── __tests__/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env
│   └── vite.config.ts
├── server/            # Backend with Express + Zod + Swagger
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── validators/
│   │   ├── index.ts
│   │   └── swagger.ts
│   ├── .env
│   └── tsconfig.json
└── .github/workflows/ci.yml
```

## 🧪 Features

- ✅ Add, edit, delete, and drag & drop tasks across columns
- 🛡️ Type-safe API validation with Zod
- 🧪 Unit tests with Vitest + Testing Library
- 📦 GitHub Actions CI/CD support
- 📚 Swagger/OpenAPI auto-generated docs

## 🛠️ Tech Stack

| Layer       | Tech                            |
|-------------|----------------------------------|
| Frontend    | React 19, TypeScript, TailwindCSS |
| Backend     | Express, TypeScript, Zod         |
| Validation  | Zod                              |
| Docs        | Swagger + swagger-jsdoc          |
| Testing     | Vitest, React Testing Library    |
| CI/CD       | GitHub Actions                   |

## 🚀 Installation

### 1. Clone and Setup

```bash
git clone https://github.com/your-username/kanban-app.git
cd kanban-app
```

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env  # or manually create .env and add VITE_API_URL
npm run dev
```

### 3. Backend

```bash
cd server
npm install
cp .env.example .env  # add PORT and CORS settings
npm run dev
```

## 🧪 Run Tests

```bash
cd client
npm run test
```

## 🔍 API Docs

Visit: `http://localhost:5050/api-docs` (Swagger UI)
