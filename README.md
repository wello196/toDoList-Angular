# Angular To-Do List Application

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://todolist-agwst8yfe-waleed-mohamed-s-projects.vercel.app/)

A professional, component-driven Angular 18 task management application featuring standalone components, reactive state handling, user profile switching, and persistent browser storage via `localStorage`.

---

## 🔗 Live Demo

Experience the live application online:  
🚀 **[View Live Demo](https://todolist-agwst8yfe-waleed-mohamed-s-projects.vercel.app/)** 

---

## 📋 Table of Contents

* [Project Overview](#-project-overview)
* [Main Features](#-main-features)
* [Technologies & Tech Stack](#-technologies--tech-stack)
* [Application Architecture](#-application-architecture)
* [Folder Structure](#-folder-structure)
* [Models & Interfaces](#-models--interfaces)
* [Services Documentation](#-services-documentation)
* [Components Documentation](#-components-documentation)
* [Data Flow](#-data-flow)
* [Installation & Setup](#-installation--setup)
* [Development Commands](#-development-commands)

---

## 🌟 Project Overview

This project is built using modern **Angular 18** and strictly follows a modular **Standalone Component** pattern (completely omitting traditional `NgModule` declarations). The application simulates a multi-user workspace where selecting a specific user profile dynamically filters and displays their assigned tasks. Users can create new tasks through an interactive dialog overlay (`NewTaskComponent`) using Angular FormsModule template bindings, and remove completed tasks via `SingleTaskComponent`. All mutations persist automatically across browser sessions via the Web Storage API (`localStorage`).

---

## ✨ Main Features

* **Multi-User Profile Switching:** Allows users to select from a predefined list of profiles rendered via `UserComponent`. Selecting a user updates the active context in the `UserService` and filters tasks instantly.
* **Dynamic Task Filtering:** Filters the central task list based on the active `userId` injected from `TaskService.selectedTasks(userId)`.
* **Interactive Task Creation Dialog:** Features a dedicated modal form (`NewTaskComponent`) with a backdrop overlay capturing task titles, descriptive summaries, and strict due dates using two-way binding (`[(ngModel)]`).
* **Persistent Task Storage:** Automatically serializes and saves task collections into the browser's `localStorage` on every insertion (`submitTask`) or deletion (`deletedTask`).
* **Formatted Date Pipelines:** Leverages Angular's built-in `DatePipe` (`date:'fullDate'`) inside `SingleTaskComponent` templates to present user-friendly due dates.

---

## 🛠️ Technologies & Tech Stack

* **Core Framework:** Angular 18.0.0 (`@angular/core`, `@angular/forms`, `@angular/router`)
* **Language:** TypeScript (~5.4.2)
* **Styling & Assets:** Custom CSS3 with flexbox/grid layouts and avatar graphic assets
* **Persistence:** Browser `localStorage` API
* **Build & CLI:** Angular CLI 18.0.0

---

## 🏛️ Application Architecture

The application is structured into domain-specific features and shared atomic components:

```text
AppComponent
 ├── HeaderComponent (Static hero banner layout)
 ├── UserComponent (User profile selection card)
 │    └── CardComponent (Reusable UI card container wrapper via <ng-content>)
 └── TaskComponent (User-specific task manager pane)
      ├── SingleTaskComponent (Individual task display card)
      │    └── CardComponent (Reusable UI card wrapper)
      └── NewTaskComponent (Modal dialog form for task creation)
```

* **`HeaderComponent`**: Renders the top hero section showcasing application branding and value propositions.
* **`UserComponent`**: Encapsulates individual user profiles using a reusable `CardComponent` wrapper.
* **`TaskComponent`**: Acts as the container for tasks corresponding to the currently selected user, managing task deletion, tracking modal toggle state (`isAdded`), and handling form submissions.
* **`SingleTaskComponent`**: Renders individual task cards inside `<article>` wrappers, displaying formatted dates and triggering completion actions.
* **`NewTaskComponent`**: Handles form input states (`enteredTitle`, `enteredSummary`, `enteredDate`) and emits output events to parent components.
* **`CardComponent`**: A shared atomic layout wrapper leveraging `<ng-content>` to provide consistent box-shadow and border radii.
* **Services Layer**: Centralizes business logic and data state (`UserService` and `TaskService`), completely decoupling data manipulation from presentation components.

---

## 📂 Folder Structure

```text
src/
├── app/
│   ├── shared/
│   │   └── card/
│   │       ├── card.component.css
│   │       ├── card.component.html
│   │       └── card.component.ts
│   ├── task/
│   │   ├── new-task/
│   │   │   ├── new-task.component.css
│   │   │   ├── new-task.component.html
│   │   │   └── new-task.component.ts
│   │   ├── single-task/
│   │   │   ├── single-task.component.css
│   │   │   ├── single-task.component.html
│   │   │   ├── single-task.component.ts
│   │   │   └── task.model.ts
│   │   ├── task.component.css
│   │   ├── task.component.html
│   │   ├── task.component.ts
│   │   └── task.service.ts
│   ├── user/
│   │   ├── user.component.css
│   │   ├── user.component.html
│   │   ├── user.component.ts
│   │   ├── user.model.ts
│   │   └── user.service.ts
│   ├── header/
│   │   ├── header.component.css
│   │   ├── header.component.html
│   │   └── header.component.ts
│   ├── app.component.css
│   ├── app.component.html
│   └── app.component.ts
├── assets/
│   ├── users/
│   │   ├── user-1.jpg through user-6.jpg
│   │   └── ...
│   ├── toDo.png
│   └── angular-logo.png
├── index.html
├── main.ts
└── styles.css
```

---

## 📐 Models & Interfaces

Defined across `user.model.ts` and `task/single-task/task.model.ts`:

```typescript
export interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
}

export interface newTaskData {
  title: string;
  summary: string;
  dueDate: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
```

---

## ⚙️ Services Documentation

### 1. `UserService` (`user.service.ts`)
* **Purpose:** Manages user profile catalogs and tracks the currently selected active user state.
* **State / Data:**
  * `DUMMY_USERS`: Array of mock user records (`User[]`) containing predefined IDs, names, and avatar filenames (`user-1.jpg` through `user-6.jpg`).
  * `selectedUser?: User`: Optional property tracking the active user object.
* **Methods:**
  * `onSelectUser(userId: string)`: Searches `DUMMY_USERS` by `id` and updates the `selectedUser` reference.

### 2. `TaskService` (`task.service.ts`)
* **Purpose:** Manages the task data lifecycle, filtering tasks per user, adding new items, and removing tasks.
* **Constructor Logic:** Initializes tasks from `localStorage` under the `'tasks'` key if available; otherwise, falls back to default dummy tasks.
* **Methods:**
  * `selectedTasks(userId: string): Task[]`: Filters and returns tasks matching the provided `userId`.
  * `deletedTask(id: string)`: Removes a task by its unique `id` and triggers storage persistence.
  * `submitTask(taskData: newTaskData, userId: string)`: Creates a new task object with a randomized ID, unshifts it into the beginning of the task array, and saves to storage.
  * `private saveTasks()`: Serializes the current task array into `localStorage`.

---

## 🧩 Components Documentation

* **`HeaderComponent`**: Pure presentation component displaying the application header hero canvas, background styling, and value statements.
* **`UserComponent`**:
  * *Inputs:* `@Input({ required: true }) user!: User;` and `@Input({ required: true }) selected!: boolean;`.
  * *Functionality:* Displays user avatars and names wrapped inside an `app-card`. Triggers `UserService.onSelectUser()` when clicked and toggles the `.active` style binding.
* **`CardComponent`**: Reusable wrapper layout component using `<ng-content>` to project child elements into styled container boxes.
* **`TaskComponent`**:
  * *Inputs:* `name?: string` and `userId!: string`.
  * *Functionality:* Coordinates user tasks display, toggles `isAdded` boolean to show/hide the task creation dialog, and relays deletion/submission requests to `TaskService`.
* **`SingleTaskComponent`**:
  * *Inputs:* `task!: Task`.
  * *Functionality:* Renders individual task articles, formats due dates with `DatePipe`, and invokes `TaskService.deletedTask()` upon clicking "Complete".
* **`NewTaskComponent`**:
  * *Outputs:* `cancel` EventEmitter and `add` EventEmitter emitting `newTaskData`.
  * *Functionality:* Provides a backdrop dialog form using `FormsModule` two-way bindings (`[(ngModel)]`) to capture user inputs.

---

## 🔄 Data Flow

```text
User Input (Form / Click)
       │
       ▼
Component Event Handler
       │
       ▼
Injected Service Method Call (TaskService / UserService)
       │
       ▼
State Mutation + LocalStorage Sync
       │
       ▼
Template Data Re-evaluation (@for / @if control flow loops)
```

1. **User Selection:** The user clicks a profile card (`UserComponent`), which calls `UserService.onSelectUser(userId)`.
2. **State Propagation:** The application container reads the selected user context and queries `TaskService.selectedTasks(userId)`.
3. **Task Filtering:** `TaskService` filters the internal task array and returns only tasks belonging to that specific `userId`.
4. **Task Mutation:** When a user creates a new task through `NewTaskComponent` or completes/deletes an existing task via `SingleTaskComponent`, `TaskService` updates the in-memory array and automatically writes the synchronized state to browser `localStorage`.

---

## 🚀 Installation & Setup

1. Clone or download the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd essentials
   ```

2. Open your terminal in the root project folder and install dependencies:
   ```bash
   npm install
   ```

---

## 🛠️ Development Commands

* **Run Development Server:**
  ```bash
  ng serve
  ```
  Navigate to `http://localhost:4200/`. The application automatically reloads if you change any of the source files.

* **Build for Production:**
  ```bash
  ng build
  ```
  Artifacts will be stored in the `dist/` directory.
