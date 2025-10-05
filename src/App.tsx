import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MoleculeViewer from './components/MoleculeViewer';
import InfoPanel from './components/InfoPanel';

function App() {
  const [moleculeName, setMoleculeName] = useState('water');
  const [formula, setFormula] = useState('');
  const [elements, setElements] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <header className="text-center mb-4">
        <h1>Molecule Studio</h1>
        <p className="lead">Busca una molécula para visualizarla en 3D</p>
      </header>
      
      <SearchBar onSearch={setMoleculeName} />

      <div className="row mt-4">
        <main className="col-md-8">
          <MoleculeViewer 
            moleculeName={moleculeName} 
            setFormula={setFormula}
            setElements={setElements}
          />
          <div className="instructions-card mt-4">
            <h4>Controles</h4>
            <ul>
              <li><b>Rotar:</b> Clic izquierdo + Arrastrar</li>
              <li><b>Zoom:</b> Rueda del ratón</li>
              <li><b>Mover:</b> Clic derecho + Arrastrar</li>
            </ul>
          </div>
        </main>

        <aside className="col-md-4">
          <InfoPanel 
            moleculeName={moleculeName}
            formula={formula}
            elements={elements}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;