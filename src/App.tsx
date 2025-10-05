import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MoleculeViewer from './components/MoleculeViewer';

function App() {
  const [moleculeName, setMoleculeName] = useState('water');

  return (
    <div className="container mt-4">
      <header className="text-center mb-4">
        <h1>Molecule Studio</h1>
        <p className="lead">Busca una molécula para visualizarla en 3D</p>
      </header>
      
      <SearchBar onSearch={setMoleculeName} />
      <main className="mt-4">
        <MoleculeViewer moleculeName={moleculeName} />

        <div className="instructions-card mt-4">
          <h4>Controles</h4>
          <ul>
            <li><b>Rotar:</b> Clic izquierdo + Arrastrar</li>
            <li><b>Zoom:</b> Rueda del ratón</li>
            <li><b>Mover:</b> Clic derecho + Arrastrar</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
