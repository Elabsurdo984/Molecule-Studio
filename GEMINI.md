# Gemini Project Context: Molecule-Studio

## Project Overview

This is a web application designed to be a 3D molecule visualizer. The project is built using React and TypeScript, bootstrapped with Vite. The core functionality allows users to search for a chemical substance by name and view its molecular structure rendered in a 3D space. The application loads molecule data from `.pdb` files.

**Key Technologies:**
- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **3D Rendering:** `three.js` (using `PDBLoader` for molecule data and `OrbitControls` for interaction)
- **Styling:** Bootstrap, with a custom chemistry-themed "dark lab" stylesheet in `src/index.css`.

**Available Molecules:**
The `public/models` directory contains the following example molecules that can be loaded:
- `caffeine.pdb`
- `methane.pdb`
- `water.pdb`

## Architecture
- The main application entry point is `src/main.tsx`, which renders the root `App` component.
- The primary layout and state management are handled in `src/App.tsx`. It holds the name of the molecule to be displayed and also renders the main UI structure, including the header, search bar, viewer, and an instructions card.
- The application is structured around three main parts:
  - `src/components/SearchBar.tsx`: A controlled component that takes user input to update the application's state with a new molecule name.
  - `src/components/MoleculeViewer.tsx`: This component receives the molecule name as a prop and uses `three.js` to render the corresponding `.pdb` file. It features CPK atom coloring.
  - **Instructions Card**: A simple JSX element within `App.tsx` that displays the camera controls to the user.

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
- **Styling:** Global styles and the application's main theme are defined in `src/index.css`. Bootstrap is used for base layout and components, but is customized by the global stylesheet. Inline styles are avoided.
- **Linting:** The project is configured with ESLint. Run `npm run lint` to check for issues.
