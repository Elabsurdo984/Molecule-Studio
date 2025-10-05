import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js';
import { atomColors, defaultAtomColor } from '../utils/colors';

interface MoleculeViewerProps {
  moleculeName: string;
  setFormula: (formula: string) => void;
  setElements: (elements: string[]) => void;
}

const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ moleculeName, setFormula, setElements }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!mountRef.current) return;

    cleanupRef.current();

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xcccccc, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(0, 0, 10);
    scene.add(directionalLight);

    const root = new THREE.Group();
    scene.add(root);

    const pdbLoader = new PDBLoader();

    pdbLoader.load(
      `/models/${moleculeName}.pdb`,
      (pdb) => {
        const { geometryAtoms, geometryBonds, json } = pdb;
        root.clear();

        const formulaMap: { [element: string]: number } = {};

        for (let i = 0; i < json.atoms.length; i++) {
          const element = json.atoms[i][4].trim().toUpperCase();
          formulaMap[element] = (formulaMap[element] || 0) + 1;

          const position = new THREE.Vector3().fromBufferAttribute(geometryAtoms.getAttribute('position'), i);
          const color = atomColors[element] || defaultAtomColor;
          
          const atom = new THREE.Mesh(
              new THREE.SphereGeometry(0.4),
              new THREE.MeshPhongMaterial({ color })
          );
          atom.position.copy(position);
          root.add(atom);
        }

        const formulaString = Object.entries(formulaMap)
          .map(([element, count]) => `${element}${count > 1 ? count : ''}`)
          .join(' ');
        setFormula(formulaString);
        setElements(Object.keys(formulaMap));

        const bondPositions = geometryBonds.getAttribute('position');
        const bondMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
        const start = new THREE.Vector3();
        const end = new THREE.Vector3();

        for (let i = 0; i < bondPositions.count; i += 2) {
            start.fromBufferAttribute(bondPositions, i);
            end.fromBufferAttribute(bondPositions, i + 1);

            const bondDir = new THREE.Vector3().subVectors(end, start);
            const bondLength = bondDir.length();
            
            const cylinder = new THREE.Mesh(
                new THREE.CylinderGeometry(0.1, 0.1, bondLength, 8),
                bondMaterial
            );
            cylinder.position.copy(start).add(bondDir.multiplyScalar(0.5));
            cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), bondDir.normalize());
            root.add(cylinder);
        }

        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        root.position.sub(center);
      },
      undefined,
      (error) => {
        console.error(`Error loading molecule: ${moleculeName}`, error);
        root.clear();
        setFormula('Error al cargar');
        setElements([]);
      }
    );

    let animationFrameId: number;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (currentMount) {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }
    };
    window.addEventListener('resize', handleResize);

    cleanupRef.current = () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        if (currentMount) {
            currentMount.removeChild(renderer.domElement);
        }
        renderer.dispose();
        scene.remove(root);
        root.clear();
    };

  }, [moleculeName, setFormula, setElements]);

  return <div ref={mountRef} className="molecule-viewer-container" />;
};

export default MoleculeViewer;