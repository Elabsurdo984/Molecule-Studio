# Molecule Studio

A simple 3D molecule viewer built with React, TypeScript, and Three.js. This application allows you to search for molecules and visualize their atomic structure in an interactive 3D space.

## Features

- **3D Visualization:** Renders molecules with atoms as spheres and bonds as cylinders.
- **Interactive Controls:** Use your mouse to rotate, pan, and zoom the molecule model.
- **Search:** Find molecules by name. Currently supported molecules:
  - `water`
  - `caffeine`
  - `methane`

## Tech Stack

- **Frontend:** React with TypeScript
- **Build Tool:** Vite
- **3D Graphics:** Three.js
- **UI Styling:** Bootstrap

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd molecule-studio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).
    