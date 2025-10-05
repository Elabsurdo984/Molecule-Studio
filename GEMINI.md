# Gemini Project Context: Molecule-Studio

## Project Overview

This is a web application designed to be a 3D molecule visualizer. The project is built using React and TypeScript, bootstrapped with Vite. The core functionality allows users to search for a chemical substance by name and view its molecular structure rendered in a 3D space. The application loads molecule data from `.pdb` files.

**Key Technologies:**
- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **3D Rendering:** `three.js` (using `PDBLoader` for molecule data and `OrbitControls` for interaction)
- **Styling:** Bootstrap

**Available Molecules:**
The `public/models` directory contains the following example molecules that can be loaded:
- `caffeine.pdb`
- `methane.pdb`
- `water.pdb`

## Architecture
- The main application entry point is `src/main.tsx`, which renders the root `App` component.
- The primary layout and state management are handled in `src/App.tsx`. It holds the name of the molecule to be displayed.
- The application is structured around two main components:
  - `src/components/SearchBar.tsx`: A controlled component that takes user input. When the user submits a search, it calls a function passed down from `App.tsx` to update the application's state with the new molecule name.
  - `src/components/MoleculeViewer.tsx`: This component receives the molecule name as a prop. It uses `three.js` to set up a scene, camera, and renderer. It then uses `PDBLoader` to fetch and parse the corresponding `.pdb` file from the `public/models/` directory and renders the atoms and bonds as 3D objects. `OrbitControls` are enabled to allow the user to rotate, pan, and zoom the camera.

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
- **Styling:** Global styles and Bootstrap CSS are imported in `src/main.tsx`. Component-specific styling is done via inline styles or co-located with components.
- **Linting:** The project is configured with ESLint. Run `npm run lint` to check for issues.