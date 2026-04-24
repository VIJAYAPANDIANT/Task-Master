# 🌌 Task Master: The Cosmic Productivity Suite

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel&logoColor=white)](https://task-master-chi-three.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)

**Task Master** is a premium, full-stack task management application designed with a futuristic "Cosmic" aesthetic. Built on the modern React framework, it offers a seamless, real-time experience with a stunning glassmorphism UI and a dynamic galaxy background.

🚀 **[View Live Demo](https://task-master-chi-three.vercel.app/)**

---

## 📸 Project Preview

![Task Master Preview](file:///C:/Users/VIJAYA%20PANDIAN.T/.gemini/antigravity/brain/9992719b-1b33-41c5-a7a1-107e1a439546/task_master_preview_1777047279793.png)

---

## ✨ Key Features

- **🎨 Stunning Aesthetics**: 
  - **Vibrant Neon Theme**: A premium Dark Mode featuring deep purple nebula gradients and neon accents.
  - **Animated Galaxy Background**: A moving starfield with three-layer parallax effects that follows you throughout the app.
  - **Glassmorphism UI**: Semi-transparent, blurred cards and modern form elements.
- **🛡️ Secure Authentication**: Integrated login, registration, and password reset flows with persistent session management.
- **📈 Task Intelligence**:
  - **Real-Time Updates**: Instant task syncing (currently using a robust LocalStorage-based mock for easy portability).
  - **Activity History**: View a beautiful timeline of when tasks were created or updated.
  - **Smart Filtering**: Quickly sort tasks by completion status.
- **🔍 Magic Search**: Instantly find specific tasks using the integrated search system in the navigation bar.
- **🌗 Theme Toggle**: Switch between **Cosmic Dark** and **High-Tech Light** modes with a single click.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (v18), React Router v6 |
| **Styling** | Vanilla CSS (Variables), Bootstrap 5, Glassmorphism |
| **State Management** | React Hooks (useState, useEffect) |
| **Data Persistence** | Firebase Realtime Database (Mocked via LocalStorage) |
| **Components** | React-Bootstrap, React Datepicker, React Toastify |

---

## 📂 Project Structure

```text
Task/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Auth/           # Login, Register, PasswordReset
│   │   ├── Tasks/          # TaskList, CreateTask, TaskDetail, TaskHistory
│   │   └── GalaxyBackground # Cosmic background components
│   ├── services/
│   │   └── firebase.js     # Mock Firebase service implementation
│   ├── App.js              # Main application logic & routing
│   ├── index.js            # Entry point
│   └── App.css             # Global cosmic styles
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

### Installation

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd Task
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 📝 Usage Guide

1. **Onboard**: Register a new account or log in with existing credentials (data is persisted locally in your browser).
2. **Organize**: Use the **Create Task** button to add new items with titles, descriptions, and due dates.
3. **Track**: Monitor your progress in the **Dashboard**. Click on tasks to see detailed info.
4. **History**: Visit the **History** tab to see your productivity timeline.
5. **Theme**: Click the ☀️/🌙 icon in the navbar to change the atmosphere.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for any features or bug fixes.

---

## 📜 License

Distributed under the MIT License.

---
*Created with ❤️ for premium productivity.*
