import React from 'react';
import { atomColors } from '../utils/colors';

interface InfoPanelProps {
  formula: string;
  elements: string[];
  moleculeName: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ formula, elements, moleculeName }) => {
  return (
    <div className="info-panel">
      <h3 className="text-capitalize">{moleculeName}</h3>
      <div className="formula-display my-3">
        <span>Fórmula:</span>
        <strong className="ms-2">{formula}</strong>
      </div>

      <h5>Leyenda de Colores</h5>
      <ul className="legend-list list-unstyled">
        {elements.map(element => {
          const color = atomColors[element];
          const colorString = color ? `#${color.getHexString()}` : '#ffffff';
          return (
            <li key={element} className="d-flex align-items-center mb-2">
              <div 
                className="legend-swatch me-2"
                style={{ backgroundColor: colorString }}
              ></div>
              <span>{element}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InfoPanel;
