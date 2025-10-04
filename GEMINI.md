# Gemini Project Context: Molecule-Studio

## Project Overview

This is a web application designed to be a 3D molecule visualizer. The project is built using React and TypeScript, bootstrapped with Vite. The core functionality allows users to search for a chemical substance and view its molecular structure rendered in a 3D space.

**Key Technologies:**
- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **3D Rendering:** `three.js`
- **Styling:** Bootstrap

**Architecture:**
- The main application entry point is `src/main.tsx`, which renders the root `App` component.
- The primary layout is defined in `src/App.tsx`.
- The application is structured around two main components:
  - `src/components/SearchBar.tsx`: For user input to search for molecules.
  - `src/components/MoleculeViewer.tsx`: For rendering the 3D model of the selected molecule.

## Building and Running

The following scripts are available in `package.json` to manage the application:

- **Install Dependencies:**
  ```bash
  npm install
  ```

- **Run Development Server:**
  ```bash
  npm run dev
  ```

- **Build for Production:**
  ```bash
  npm run build
  ```

- **Lint Code:**
  ```bash
  npm run lint
  ```

- **Preview Production Build:**
  ```bash
  npm run preview
  ```

## Development Conventions

- **Language:** The project uses TypeScript, and type safety should be maintained.
- **Component Structure:** Reusable components are located in the `src/components` directory.
- **Styling:** Global styles and Bootstrap CSS are imported in `src/main.tsx`. Component-specific styling should be co-located with components or follow established patterns.
- **Linting:** The project is configured with ESLint. Run `npm run lint` to check for issues.
