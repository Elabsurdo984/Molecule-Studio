# Gemini Project Context: Molecule-Studio

## Project Overview

This is a web application designed to be a 3D molecule visualizer. The project is built using React and TypeScript, bootstrapped with Vite. The core functionality allows users to search for a chemical substance by name and view its molecular structure rendered in a 3D space. The application loads molecule data from `.pdb` files and displays informational details like the molecular formula.

**Key Technologies:**
- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **3D Rendering:** `three.js` (using `PDBLoader` for molecule data and `OrbitControls` for interaction)
- **Styling:** Bootstrap, with a custom chemistry-themed "dark lab" stylesheet in `src/index.css`.

## Architecture
- The main application entry point is `src/main.tsx`, which renders the root `App` component.
- The primary layout is a two-column grid managed in `App.tsx`. It also handles the application's state, including the current molecule's name, its formula, and the elements it contains.
- **State Flow:** The `MoleculeViewer` component calculates the formula and elements from the loaded `.pdb` file and lifts this state up to `App.tsx` via callbacks.
- The application is structured around these key components:
  - `src/components/SearchBar.tsx`: User input for searching molecules.
  - `src/components/MoleculeViewer.tsx`: Renders the 3D molecule and is responsible for parsing the molecule data.
  - `src/components/InfoPanel.tsx`: Displays the molecule's name, formula, and a color legend for the atoms.
- **Utilities**:
  - `src/utils/colors.ts`: A shared module that exports the color map for atoms, used by both the viewer and the info panel.

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
- **Component Structure:** Reusable components are located in the `src/components` directory. Shared utilities like the color map are in `src/utils`.
- **Styling:** Global styles and the application's main theme are defined in `src/index.css`. Bootstrap is used for base layout and components, but is customized by the global stylesheet. Inline styles are avoided.
- **Linting:** The project is configured with ESLint. Run `npm run lint` to check for issues.