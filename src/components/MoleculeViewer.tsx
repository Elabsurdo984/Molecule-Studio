import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js';

interface MoleculeViewerProps {
  moleculeName: string;
}

const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ moleculeName }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!mountRef.current) return;

    // Cleanup previous instance
    cleanupRef.current();

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    scene.add(new THREE.AmbientLight(0xcccccc, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(0, 0, 10);
    scene.add(directionalLight);

    const root = new THREE.Group();
    scene.add(root);

    const pdbLoader = new PDBLoader();

    const atomColors: { [element: string]: THREE.Color } = {
      'H': new THREE.Color(0xffffff),  // White
      'C': new THREE.Color(0x808080),  // Gray
      'N': new THREE.Color(0x0000ff),  // Blue
      'O': new THREE.Color(0xff0000),  // Red
      'F': new THREE.Color(0x00ff00),  // Green
      'CL': new THREE.Color(0x00ff00), // Green
      'BR': new THREE.Color(0xa52a2a), // Brown
      'I': new THREE.Color(0x9400d3),  // Dark Violet
      'P': new THREE.Color(0xffa500),  // Orange
      'S': new THREE.Color(0xffff00),  // Yellow
    };
    const defaultAtomColor = new THREE.Color(0xffc0cb); // Pink as default

    pdbLoader.load(
      `/models/${moleculeName}.pdb`,
      (pdb) => {
        console.log(`Successfully loaded molecule: ${moleculeName}`);
        const { geometryAtoms, geometryBonds, json } = pdb;

        root.clear(); // Clear previous molecule

        // Draw atoms
        const atomPositions = geometryAtoms.getAttribute('position');

        for (let i = 0; i < atomPositions.count; i++) {
            const position = new THREE.Vector3().fromBufferAttribute(atomPositions, i);
            const element = json.atoms[i][4].trim().toUpperCase();
            const color = atomColors[element] || defaultAtomColor;
            
            const atom = new THREE.Mesh(
                new THREE.SphereGeometry(0.4),
                new THREE.MeshPhongMaterial({ color })
            );
            atom.position.copy(position);
            root.add(atom);
        }

        // Draw bonds
        const start = new THREE.Vector3();
        const end = new THREE.Vector3();
        const bondPositions = geometryBonds.getAttribute('position');
        const bondMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });

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

        // Center the molecule
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        root.position.sub(center);
      },
      undefined, // onProgress callback not implemented
      (error) => {
        console.error(`Error loading molecule: ${moleculeName}`, error);
        root.clear();
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

  }, [moleculeName]);

  return <div ref={mountRef} style={{ width: '100%', height: '500px', border: '1px solid #ccc', borderRadius: '4px' }} />;
};

export default MoleculeViewer;
