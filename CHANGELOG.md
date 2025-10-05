# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2025-10-05

### Added
- Implemented a chemistry-themed "dark lab" visual style across the application.
- Styled the search button as a hexagon to evoke chemical structures.
- Added an instructions card below the viewer to explain camera controls (rotate, zoom, pan).

### Changed
- Centralized all styling into `src/index.css` for better maintainability.
- Refactored the `MoleculeViewer` component to remove inline styles in favor of a global CSS class.

## [0.2.0] - 2025-10-05

### Added
- Implemented atom coloring in the 3D viewer based on standard CPK color conventions (e.g., Oxygen is red, Carbon is gray).

### Fixed
- Corrected a TypeScript error in `MoleculeViewer.tsx` caused by improper material assignment in Three.js, ensuring stable rendering.

### Changed
- Updated `GEMINI.md` to accurately reflect the project's current architecture, including details about the new coloring feature.

## [0.1.0] - 2025-10-04

### Added
- Initial project setup using React, TypeScript, and Vite.
- 3D molecule viewer component using Three.js.
- PDB loader to parse and render molecule data.
- Atoms are rendered as spheres and bonds as cylinders.
- Interactive camera controls (zoom, pan, rotate) via OrbitControls.
- Search bar to dynamically load different molecules.
- State management to connect the search bar with the viewer.
- Support for `water`, `caffeine`, and `methane` molecules.
- Custom `README.md` and this `CHANGELOG.md`.
