# 🛠️ System Design: Kanban Board

## 📌 Overview
A Kanban-style task board where users can create, update, delete, and drag tasks between `todo`, `in-progress`, and `done` columns.

---

## 🧱 Architecture Overview

[ React + Vite Frontend ]
        |
        | REST API (Axios)
        ▼
[ Express + Node.js API Server ]
        |
        | Type Validation (Zod)
        ▼
[ In-memory Storage ]

## 📁 Folder Structure

### Frontend (`client/`)

components/       --> UI components like TaskCard, Column, EditTaskModal
pages/            --> Pages like KanbanBoard
types/            --> TypeScript interfaces
__tests__/        --> Vitest test files
test/             --> Test setup files
main.tsx          --> Entry point
vite.config.ts    --> Vite config
.env              --> API base URL

### Backend (`server/`)

controllers/      --> Route logic (CRUD)
routes/           --> Express routes
types/            --> Type definitions
validators/       --> Zod validation schemas
swagger.ts        --> Swagger spec generation
index.ts          --> Main server entry point
.env              --> Port

---

## ⚙️ Technologies

| Layer         | Stack                                  |
|---------------|-----------------------------------------|
| Frontend      | React, Vite, Tailwind CSS              |
| Backend       | Node.js, Express, TypeScript           |
| Validation    | Zod                                    |
| Drag & Drop   | @dnd-kit/core                          |
| API Docs      | Swagger (swagger-ui-express)           |
| Testing       | Vitest, Testing Library                |
| CI            | GitHub Actions                         |

---

## 📡 API Endpoints

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| GET    | /api/tasks       | Get all tasks      |
| POST   | /api/tasks       | Create new task    |
| PUT    | /api/tasks/:id   | Update task        |
| DELETE | /api/tasks/:id   | Delete task        |

---

## ✅ Zod Validation Example

```ts
import { z } from 'zod';
export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'done']),
});
```

---

## 📄 Swagger Docs

- Route: `http://localhost:5050/api-docs`
- Uses `swagger-jsdoc` and `swagger-ui-express`

---

## 🔁 CI/CD

GitHub Actions workflow:
- Runs `vitest` on PR/push
- Ensures code compiles and tests pass

---

## 📂 Environment Variables

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:5050
```

**Backend (.env):**
```
PORT=5050
```

---

## ✅ Features Done

- [x] CRUD Operations
- [x] Drag & Drop
- [x] Zod Validation
- [x] Swagger Docs
- [x] GitHub CI Tests
- [x] Responsive UI (Tailwind)
- [x] Component Tests

---