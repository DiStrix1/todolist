# 📝 Zen Todo Manager (Monorepo)

A beautiful, modern, and premium full-stack Todo List application built with a **React (Vite + TanStack Start)** frontend and a **Spring Boot (Java + JPA)** backend, using **MySQL** for persistent data storage.

---

## 📂 Project Structure

This project is organized as a monorepo combining the frontend and backend in one repository:

```text
todolist/
├── frontend/                 # React frontend application (Vite + TypeScript)
│   ├── src/                  # React source files, routes, and UI components
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.ts        # Vite build configuration
├── src/                      # Spring Boot backend source files (Java)
│   ├── main/java/com/dishu/  # Spring MVC controller, JPA repository, and models
│   └── main/resources/       # Backend application configurations
├── pom.xml                   # Maven project configuration
├── mvnw / mvnw.cmd           # Maven wrapper scripts
└── README.md                 # Project documentation
```

---

## 🚀 Key Features

* **Consolidated Monorepo:** Clean directory layout separating frontend and backend logic.
* **Modern UI:** Vibrant priority badges, responsive grids, and clean design.
* **Fully Integrated REST API:** Enabled CORS support, with unified mapping between Java models and frontend API payloads.
* **Title Case Priorities:** Formatted priority levels (`High`, `Medium`, `Low`) dynamically.
* **Stripe-like Notifications:** Toast status indicators for successful additions, edits, and deletions.

---

## 🛠️ Prerequisites

Ensure you have the following installed on your local machine:
1. **Java Development Kit (JDK) 17** or higher.
2. **Node.js** (v18.0.0 or higher) & **npm**.
3. **MySQL Server** (running on port `3306`).

---

## ⚙️ Getting Started

### 1. Database Setup
Make sure MySQL is running and create the `todolist` database:

```sql
CREATE DATABASE IF NOT EXISTS todolist;
```

Update your database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/todolist
spring.datasource.username=your_mysql_user
spring.datasource.password=your_mysql_password
```

---

### 2. Running the Spring Boot Backend

From the project root directory, run the Maven wrapper command to compile and start the backend:

* **Windows:**
  ```powershell
  .\mvnw.cmd spring-boot:run
  ```
* **macOS / Linux:**
  ```bash
  ./mvnw spring-boot:run
  ```

The backend server will start on **`http://localhost:8080`**.

---

### 3. Running the React Frontend

Open a new terminal session, navigate to the `frontend/` directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will launch on **`http://localhost:8081`** (or `8080` if port 8080 was free, though standard setup launches backend first).

---

## 🔌 API Endpoints

The Spring Boot backend exposes the following endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/showTasks` | Retrieves all tasks |
| **GET** | `/showTasks/{id}` | Retrieves a single task by ID |
| **GET** | `/showTasks/status/{status}` | Filter tasks by status (`pending`, `in-progress`, `completed`) |
| **POST** | `/addTasks` | Adds a new task (body: `Todo`) |
| **PUT** | `/updateTask/{id}` | Updates an existing task by ID (body: `Todo`) |
| **DELETE**| `/delete/{id}` | Deletes a task by ID |
