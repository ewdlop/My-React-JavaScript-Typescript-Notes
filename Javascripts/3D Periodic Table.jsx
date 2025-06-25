import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ThreeJSPeriodicTable = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const elementsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMouseDownRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const [selectedElement, setSelectedElement] = useState(null);
  const raycasterRef = useRef(new THREE.Raycaster());

  const elements = [
    // Simplified element data for better performance
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, x: 0, y: 0, category: 'nonmetal' },
    { symbol: 'He', name: 'Helium', atomicNumber: 2, x: 17, y: 0, category: 'noble-gas' },
    
    { symbol: 'Li', name: 'Lithium', atomicNumber: 3, x: 0, y: 1, category: 'alkali-metal' },
    { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, x: 1, y: 1, category: 'alkaline-earth' },
    { symbol: 'B', name: 'Boron', atomicNumber: 5, x: 12, y: 1, category: 'metalloid' },
    { symbol: 'C', name: 'Carbon', atomicNumber: 6, x: 13, y: 1, category: 'nonmetal' },
    { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, x: 14, y: 1, category: 'nonmetal' },
    { symbol: 'O', name: 'Oxygen', atomicNumber: 8, x: 15, y: 1, category: 'nonmetal' },
    { symbol: 'F', name: 'Fluorine', atomicNumber: 9, x: 16, y: 1, category: 'halogen' },
    { symbol: 'Ne', name: 'Neon', atomicNumber: 10, x: 17, y: 1, category: 'noble-gas' },
    
    { symbol: 'Na', name: 'Sodium', atomicNumber: 11, x: 0, y: 2, category: 'alkali-metal' },
    { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, x: 1, y: 2, category: 'alkaline-earth' },
    { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, x: 12, y: 2, category: 'post-transition' },
    { symbol: 'Si', name: 'Silicon', atomicNumber: 14, x: 13, y: 2, category: 'metalloid' },
    { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, x: 14, y: 2, category: 'nonmetal' },
    { symbol: 'S', name: 'Sulfur', atomicNumber: 16, x: 15, y: 2, category: 'nonmetal' },
    { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, x: 16, y: 2, category: 'halogen' },
    { symbol: 'Ar', name: 'Argon', atomicNumber: 18, x: 17, y: 2, category: 'noble-gas' },
    
    // Period 4
    { symbol: 'K', name: 'Potassium', atomicNumber: 19, x: 0, y: 3, category: 'alkali-metal' },
    { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, x: 1, y: 3, category: 'alkaline-earth' },
    { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, x: 2, y: 3, category: 'transition-metal' },
    { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, x: 3, y: 3, category: 'transition-metal' },
    { symbol: 'V', name: 'Vanadium', atomicNumber: 23, x: 4, y: 3, category: 'transition-metal' },
    { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, x: 5, y: 3, category: 'transition-metal' },
    { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, x: 6, y: 3, category: 'transition-metal' },
    { symbol: 'Fe', name: 'Iron', atomicNumber: 26, x: 7, y: 3, category: 'transition-metal' },
    { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, x: 8, y: 3, category: 'transition-metal' },
    { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, x: 9, y: 3, category: 'transition-metal' },
    { symbol: 'Cu', name: 'Copper', atomicNumber: 29, x: 10, y: 3, category: 'transition-metal' },
    { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, x: 11, y: 3, category: 'transition-metal' },
    { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, x: 12, y: 3, category: 'post-transition' },
    { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, x: 13, y: 3, category: 'metalloid' },
    { symbol: 'As', name: 'Arsenic', atomicNumber: 33, x: 14, y: 3, category: 'metalloid' },
    { symbol: 'Se', name: 'Selenium', atomicNumber: 34, x: 15, y: 3, category: 'nonmetal' },
    { symbol: 'Br', name: 'Bromine', atomicNumber: 35, x: 16, y: 3, category: 'halogen' },
    { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, x: 17, y: 3, category: 'noble-gas' },

    // Period 5
    { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, x: 0, y: 4, category: 'alkali-metal' },
    { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, x: 1, y: 4, category: 'alkaline-earth' },
    { symbol: 'Y', name: 'Yttrium', atomicNumber: 39, x: 2, y: 4, category: 'transition-metal' },
    { symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, x: 3, y: 4, category: 'transition-metal' },
    { symbol: 'Nb', name: 'Niobium', atomicNumber: 41, x: 4, y: 4, category: 'transition-metal' },
    { symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, x: 5, y: 4, category: 'transition-metal' },
    { symbol: 'Tc', name: 'Technetium', atomicNumber: 43, x: 6, y: 4, category: 'transition-metal' },
    { symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, x: 7, y: 4, category: 'transition-metal' },
    { symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, x: 8, y: 4, category: 'transition-metal' },
    { symbol: 'Pd', name: 'Palladium', atomicNumber: 46, x: 9, y: 4, category: 'transition-metal' },
    { symbol: 'Ag', name: 'Silver', atomicNumber: 47, x: 10, y: 4, category: 'transition-metal' },
    { symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, x: 11, y: 4, category: 'transition-metal' },
    { symbol: 'In', name: 'Indium', atomicNumber: 49, x: 12, y: 4, category: 'post-transition' },
    { symbol: 'Sn', name: 'Tin', atomicNumber: 50, x: 13, y: 4, category: 'post-transition' },
    { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, x: 14, y: 4, category: 'metalloid' },
    { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, x: 15, y: 4, category: 'metalloid' },
    { symbol: 'I', name: 'Iodine', atomicNumber: 53, x: 16, y: 4, category: 'halogen' },
    { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, x: 17, y: 4, category: 'noble-gas' },

    // Period 6
    { symbol: 'Cs', name: 'Cesium', atomicNumber: 55, x: 0, y: 5, category: 'alkali-metal' },
    { symbol: 'Ba', name: 'Barium', atomicNumber: 56, x: 1, y: 5, category: 'alkaline-earth' },
    { symbol: 'La', name: 'Lanthanum', atomicNumber: 57, x: 2, y: 5, category: 'lanthanide' },
    { symbol: 'Hf', name: 'Hafnium', atomicNumber: 72, x: 3, y: 5, category: 'transition-metal' },
    { symbol: 'Ta', name: 'Tantalum', atomicNumber: 73, x: 4, y: 5, category: 'transition-metal' },
    { symbol: 'W', name: 'Tungsten', atomicNumber: 74, x: 5, y: 5, category: 'transition-metal' },
    { symbol: 'Re', name: 'Rhenium', atomicNumber: 75, x: 6, y: 5, category: 'transition-metal' },
    { symbol: 'Os', name: 'Osmium', atomicNumber: 76, x: 7, y: 5, category: 'transition-metal' },
    { symbol: 'Ir', name: 'Iridium', atomicNumber: 77, x: 8, y: 5, category: 'transition-metal' },
    { symbol: 'Pt', name: 'Platinum', atomicNumber: 78, x: 9, y: 5, category: 'transition-metal' },
    { symbol: 'Au', name: 'Gold', atomicNumber: 79, x: 10, y: 5, category: 'transition-metal' },
    { symbol: 'Hg', name: 'Mercury', atomicNumber: 80, x: 11, y: 5, category: 'transition-metal' },
    { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, x: 12, y: 5, category: 'post-transition' },
    { symbol: 'Pb', name: 'Lead', atomicNumber: 82, x: 13, y: 5, category: 'post-transition' },
    { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, x: 14, y: 5, category: 'post-transition' },
    { symbol: 'Po', name: 'Polonium', atomicNumber: 84, x: 15, y: 5, category: 'metalloid' },
    { symbol: 'At', name: 'Astatine', atomicNumber: 85, x: 16, y: 5, category: 'halogen' },
    { symbol: 'Rn', name: 'Radon', atomicNumber: 86, x: 17, y: 5, category: 'noble-gas' },

    // Period 7
    { symbol: 'Fr', name: 'Francium', atomicNumber: 87, x: 0, y: 6, category: 'alkali-metal' },
    { symbol: 'Ra', name: 'Radium', atomicNumber: 88, x: 1, y: 6, category: 'alkaline-earth' },
    { symbol: 'Ac', name: 'Actinium', atomicNumber: 89, x: 2, y: 6, category: 'actinide' },
    { symbol: 'Rf', name: 'Rutherfordium', atomicNumber: 104, x: 3, y: 6, category: 'transition-metal' },
    { symbol: 'Db', name: 'Dubnium', atomicNumber: 105, x: 4, y: 6, category: 'transition-metal' },
    { symbol: 'Sg', name: 'Seaborgium', atomicNumber: 106, x: 5, y: 6, category: 'transition-metal' },
    { symbol: 'Bh', name: 'Bohrium', atomicNumber: 107, x: 6, y: 6, category: 'transition-metal' },
    { symbol: 'Hs', name: 'Hassium', atomicNumber: 108, x: 7, y: 6, category: 'transition-metal' },
    { symbol: 'Mt', name: 'Meitnerium', atomicNumber: 109, x: 8, y: 6, category: 'transition-metal' },
    { symbol: 'Ds', name: 'Darmstadtium', atomicNumber: 110, x: 9, y: 6, category: 'transition-metal' },
    { symbol: 'Rg', name: 'Roentgenium', atomicNumber: 111, x: 10, y: 6, category: 'transition-metal' },
    { symbol: 'Cn', name: 'Copernicium', atomicNumber: 112, x: 11, y: 6, category: 'transition-metal' },
    { symbol: 'Nh', name: 'Nihonium', atomicNumber: 113, x: 12, y: 6, category: 'post-transition' },
    { symbol: 'Fl', name: 'Flerovium', atomicNumber: 114, x: 13, y: 6, category: 'post-transition' },
    { symbol: 'Mc', name: 'Moscovium', atomicNumber: 115, x: 14, y: 6, category: 'post-transition' },
    { symbol: 'Lv', name: 'Livermorium', atomicNumber: 116, x: 15, y: 6, category: 'post-transition' },
    { symbol: 'Ts', name: 'Tennessine', atomicNumber: 117, x: 16, y: 6, category: 'halogen' },
    { symbol: 'Og', name: 'Oganesson', atomicNumber: 118, x: 17, y: 6, category: 'noble-gas' },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'alkali-metal': 0xff6b6b,
      'alkaline-earth': 0xffa726,
      'transition-metal': 0xffeb3b,
      'post-transition': 0x66bb6a,
      'metalloid': 0x42a5f5,
      'nonmetal': 0xab47bc,
      'halogen': 0xec407a,
      'noble-gas': 0x5c6bc0,
      'lanthanide': 0x26c6da,
      'actinide': 0x66bb6a
    };
    return colors[category] || 0x9e9e9e;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 20);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create element cubes
    const elementObjects = [];
    const group = new THREE.Group();

    elements.forEach((element) => {
      // Create cube geometry
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshLambertMaterial({
        color: getCategoryColor(element.category)
      });
      
      const cube = new THREE.Mesh(geometry, material);
      
      // Position the cube
      cube.position.set(
        (element.x - 8.5) * 1.2,
        -(element.y - 3) * 1.2,
        0
      );
      
      cube.castShadow = true;
      cube.receiveShadow = true;
      cube.userData = element;
      
      group.add(cube);
      elementObjects.push(cube);

      // Create text for element symbol
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 64;
      canvas.height = 64;
      
      context.fillStyle = '#ffffff';
      context.font = 'bold 20px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(element.symbol, 32, 32);
      
      const texture = new THREE.CanvasTexture(canvas);
      const textMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
      });
      
      const textGeometry = new THREE.PlaneGeometry(0.6, 0.6);
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.copy(cube.position);
      textMesh.position.z += 0.41;
      textMesh.userData = element;
      
      group.add(textMesh);
      elementObjects.push(textMesh);
    });

    scene.add(group);
    elementsRef.current = elementObjects;

    // Mouse interaction
    const handleMouseMove = (event) => {
      if (isMouseDownRef.current) {
        const deltaX = event.clientX - mouseRef.current.x;
        const deltaY = event.clientY - mouseRef.current.y;
        
        rotationRef.current.y += deltaX * 0.01;
        rotationRef.current.x += deltaY * 0.01;
        
        group.rotation.y = rotationRef.current.y;
        group.rotation.x = rotationRef.current.x;
      }
      
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseDown = (event) => {
      isMouseDownRef.current = true;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const handleClick = (event) => {
      if (isMouseDownRef.current) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouse, camera);
      const intersects = raycasterRef.current.intersectObjects(elementObjects);

      if (intersects.length > 0) {
        const element = intersects[0].object.userData;
        setSelectedElement(element);
      }
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Auto-rotation when not interacting
      if (!isMouseDownRef.current) {
        group.rotation.y += 0.002;
        rotationRef.current.y = group.rotation.y;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('click', handleClick);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const legend = [
    { category: 'alkali-metal', name: 'Alkali Metals', color: '#ff6b6b' },
    { category: 'alkaline-earth', name: 'Alkaline Earth', color: '#ffa726' },
    { category: 'transition-metal', name: 'Transition Metals', color: '#ffeb3b' },
    { category: 'post-transition', name: 'Post-transition', color: '#66bb6a' },
    { category: 'metalloid', name: 'Metalloids', color: '#42a5f5' },
    { category: 'nonmetal', name: 'Nonmetals', color: '#ab47bc' },
    { category: 'halogen', name: 'Halogens', color: '#ec407a' },
    { category: 'noble-gas', name: 'Noble Gases', color: '#5c6bc0' },
    { category: 'lanthanide', name: 'Lanthanides', color: '#26c6da' },
    { category: 'actinide', name: 'Actinides', color: '#66bb6a' }
  ];

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold mb-4">3D Periodic Table</h1>
        <div className="text-sm space-y-1">
          <p>• Click and drag to rotate</p>
          <p>• Click on elements for details</p>
          <p>• Auto-rotates when not interacting</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10 max-w-xs">
        <h3 className="text-lg font-bold mb-2">Element Categories</h3>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {legend.map((item) => (
            <div key={item.category} className="flex items-center space-x-1">
              <div 
                className="w-3 h-3 border border-gray-400" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-300">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedElement && (
        <div className="absolute bottom-4 left-4 z-10 bg-gray-900 bg-opacity-90 rounded-lg p-4 max-w-sm">
          <h2 className="text-xl font-bold text-white mb-2">{selectedElement.name}</h2>
          <div className="space-y-1 text-gray-300 text-sm">
            <p><span className="font-semibold">Symbol:</span> {selectedElement.symbol}</p>
            <p><span className="font-semibold">Atomic Number:</span> {selectedElement.atomicNumber}</p>
            <p><span className="font-semibold">Category:</span> {selectedElement.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          </div>
          <button 
            onClick={() => setSelectedElement(null)}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      )}

      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};

export default ThreeJSPeriodicTable;
