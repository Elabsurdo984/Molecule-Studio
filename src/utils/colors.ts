import * as THREE from 'three';

export const atomColors: { [element: string]: THREE.Color } = {
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

export const defaultAtomColor = new THREE.Color(0xffc0cb); // Pink as default
