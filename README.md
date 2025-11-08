# 📌 Memosaic

Memosaic is a modern web application for creating and managing visual notes. Its name, a fusion of "memo" and "mosaic," reflects its core philosophy: allowing users to arrange their thoughts, tasks, and media into a beautiful and intuitive visual collage. With Memosaic, you can quickly capture ideas on digital sticky notes, attach images, and customize colors to build an interactive board that is uniquely yours. It's the perfect tool for visual thinkers, creatives, and anyone who wants to organize their ideas beautifully.

## ✨ Features

*   **Create Notes:** Easily add new sticky notes with a dedicated "Add" button (Plus icon).
*   **Edit Notes:** Click on any note to edit its content.
*   **Autosave:** Notes are automatically saved 2 seconds after you stop typing, preventing excessive save operations while ensuring your work isn't lost.
*   **Delete Notes:** Remove notes you no longer need with a dedicated delete button (Trash icon) on each note.
*   **Color Customization:** Personalize your notes by choosing from a palette of available colors via the note controls.
*   **Active Note Prioritization:** Selected or currently modified notes are automatically brought to the front (z-index management) for better visibility and focus.
*   **Centralized State Management:** Utilizes React Context API for efficient state management and easier access to note data across components.
*   **Component-Based Architecture:** Built with reusable React components for better maintainability and scalability.

## 🛠️ Tech Stack

*   **Frontend:**
    *   React.js
    *   React Context API (for state management)
    *   JavaScript (ES6+)
    *   HTML5
    *   CSS3 
*   **Build Tool / Development Environment:**
    *   Vite
    
## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v14.x or higher recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/BirtukanDegu/StickyNote.git
    cd StickyNote
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    Using npm:
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    This will usually open the app in your default browser (often at `http://localhost:5173` or the next available port). Check your terminal for the exact address.

4.  **Build for production:**
    Using npm:
    ```bash
    npm run build
    ```
    Or using yarn:
    ```bash
    yarn build
    ```
    This will create a `dist` folder with the production-ready assets.
