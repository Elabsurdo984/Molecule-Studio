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
      </main>
    </div>
  );
}

export default App;
