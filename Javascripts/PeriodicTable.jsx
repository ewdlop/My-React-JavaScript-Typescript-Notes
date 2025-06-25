import React, { useState } from 'react';

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState(null);

  const elements = [
    // Period 1
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, group: 1, period: 1, category: 'nonmetal' },
    { symbol: 'He', name: 'Helium', atomicNumber: 2, group: 18, period: 1, category: 'noble-gas' },
    
    // Period 2
    { symbol: 'Li', name: 'Lithium', atomicNumber: 3, group: 1, period: 2, category: 'alkali-metal' },
    { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, group: 2, period: 2, category: 'alkaline-earth' },
    { symbol: 'B', name: 'Boron', atomicNumber: 5, group: 13, period: 2, category: 'metalloid' },
    { symbol: 'C', name: 'Carbon', atomicNumber: 6, group: 14, period: 2, category: 'nonmetal' },
    { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, group: 15, period: 2, category: 'nonmetal' },
    { symbol: 'O', name: 'Oxygen', atomicNumber: 8, group: 16, period: 2, category: 'nonmetal' },
    { symbol: 'F', name: 'Fluorine', atomicNumber: 9, group: 17, period: 2, category: 'halogen' },
    { symbol: 'Ne', name: 'Neon', atomicNumber: 10, group: 18, period: 2, category: 'noble-gas' },
    
    // Period 3
    { symbol: 'Na', name: 'Sodium', atomicNumber: 11, group: 1, period: 3, category: 'alkali-metal' },
    { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, group: 2, period: 3, category: 'alkaline-earth' },
    { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, group: 13, period: 3, category: 'post-transition' },
    { symbol: 'Si', name: 'Silicon', atomicNumber: 14, group: 14, period: 3, category: 'metalloid' },
    { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, group: 15, period: 3, category: 'nonmetal' },
    { symbol: 'S', name: 'Sulfur', atomicNumber: 16, group: 16, period: 3, category: 'nonmetal' },
    { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, group: 17, period: 3, category: 'halogen' },
    { symbol: 'Ar', name: 'Argon', atomicNumber: 18, group: 18, period: 3, category: 'noble-gas' },
    
    // Period 4
    { symbol: 'K', name: 'Potassium', atomicNumber: 19, group: 1, period: 4, category: 'alkali-metal' },
    { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, group: 2, period: 4, category: 'alkaline-earth' },
    { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, group: 3, period: 4, category: 'transition-metal' },
    { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, group: 4, period: 4, category: 'transition-metal' },
    { symbol: 'V', name: 'Vanadium', atomicNumber: 23, group: 5, period: 4, category: 'transition-metal' },
    { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, group: 6, period: 4, category: 'transition-metal' },
    { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, group: 7, period: 4, category: 'transition-metal' },
    { symbol: 'Fe', name: 'Iron', atomicNumber: 26, group: 8, period: 4, category: 'transition-metal' },
    { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, group: 9, period: 4, category: 'transition-metal' },
    { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, group: 10, period: 4, category: 'transition-metal' },
    { symbol: 'Cu', name: 'Copper', atomicNumber: 29, group: 11, period: 4, category: 'transition-metal' },
    { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, group: 12, period: 4, category: 'transition-metal' },
    { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, group: 13, period: 4, category: 'post-transition' },
    { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, group: 14, period: 4, category: 'metalloid' },
    { symbol: 'As', name: 'Arsenic', atomicNumber: 33, group: 15, period: 4, category: 'metalloid' },
    { symbol: 'Se', name: 'Selenium', atomicNumber: 34, group: 16, period: 4, category: 'nonmetal' },
    { symbol: 'Br', name: 'Bromine', atomicNumber: 35, group: 17, period: 4, category: 'halogen' },
    { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, group: 18, period: 4, category: 'noble-gas' },
    
    // Period 5
    { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, group: 1, period: 5, category: 'alkali-metal' },
    { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, group: 2, period: 5, category: 'alkaline-earth' },
    { symbol: 'Y', name: 'Yttrium', atomicNumber: 39, group: 3, period: 5, category: 'transition-metal' },
    { symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, group: 4, period: 5, category: 'transition-metal' },
    { symbol: 'Nb', name: 'Niobium', atomicNumber: 41, group: 5, period: 5, category: 'transition-metal' },
    { symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, group: 6, period: 5, category: 'transition-metal' },
    { symbol: 'Tc', name: 'Technetium', atomicNumber: 43, group: 7, period: 5, category: 'transition-metal' },
    { symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, group: 8, period: 5, category: 'transition-metal' },
    { symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, group: 9, period: 5, category: 'transition-metal' },
    { symbol: 'Pd', name: 'Palladium', atomicNumber: 46, group: 10, period: 5, category: 'transition-metal' },
    { symbol: 'Ag', name: 'Silver', atomicNumber: 47, group: 11, period: 5, category: 'transition-metal' },
    { symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, group: 12, period: 5, category: 'transition-metal' },
    { symbol: 'In', name: 'Indium', atomicNumber: 49, group: 13, period: 5, category: 'post-transition' },
    { symbol: 'Sn', name: 'Tin', atomicNumber: 50, group: 14, period: 5, category: 'post-transition' },
    { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, group: 15, period: 5, category: 'metalloid' },
    { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, group: 16, period: 5, category: 'metalloid' },
    { symbol: 'I', name: 'Iodine', atomicNumber: 53, group: 17, period: 5, category: 'halogen' },
    { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, group: 18, period: 5, category: 'noble-gas' },
    
    // Period 6
    { symbol: 'Cs', name: 'Cesium', atomicNumber: 55, group: 1, period: 6, category: 'alkali-metal' },
    { symbol: 'Ba', name: 'Barium', atomicNumber: 56, group: 2, period: 6, category: 'alkaline-earth' },
    { symbol: 'La', name: 'Lanthanum', atomicNumber: 57, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Ce', name: 'Cerium', atomicNumber: 58, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Pr', name: 'Praseodymium', atomicNumber: 59, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Nd', name: 'Neodymium', atomicNumber: 60, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Pm', name: 'Promethium', atomicNumber: 61, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Sm', name: 'Samarium', atomicNumber: 62, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Eu', name: 'Europium', atomicNumber: 63, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Gd', name: 'Gadolinium', atomicNumber: 64, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Tb', name: 'Terbium', atomicNumber: 65, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Dy', name: 'Dysprosium', atomicNumber: 66, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Ho', name: 'Holmium', atomicNumber: 67, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Er', name: 'Erbium', atomicNumber: 68, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Tm', name: 'Thulium', atomicNumber: 69, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Yb', name: 'Ytterbium', atomicNumber: 70, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Lu', name: 'Lutetium', atomicNumber: 71, group: 3, period: 6, category: 'lanthanide' },
    { symbol: 'Hf', name: 'Hafnium', atomicNumber: 72, group: 4, period: 6, category: 'transition-metal' },
    { symbol: 'Ta', name: 'Tantalum', atomicNumber: 73, group: 5, period: 6, category: 'transition-metal' },
    { symbol: 'W', name: 'Tungsten', atomicNumber: 74, group: 6, period: 6, category: 'transition-metal' },
    { symbol: 'Re', name: 'Rhenium', atomicNumber: 75, group: 7, period: 6, category: 'transition-metal' },
    { symbol: 'Os', name: 'Osmium', atomicNumber: 76, group: 8, period: 6, category: 'transition-metal' },
    { symbol: 'Ir', name: 'Iridium', atomicNumber: 77, group: 9, period: 6, category: 'transition-metal' },
    { symbol: 'Pt', name: 'Platinum', atomicNumber: 78, group: 10, period: 6, category: 'transition-metal' },
    { symbol: 'Au', name: 'Gold', atomicNumber: 79, group: 11, period: 6, category: 'transition-metal' },
    { symbol: 'Hg', name: 'Mercury', atomicNumber: 80, group: 12, period: 6, category: 'transition-metal' },
    { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, group: 13, period: 6, category: 'post-transition' },
    { symbol: 'Pb', name: 'Lead', atomicNumber: 82, group: 14, period: 6, category: 'post-transition' },
    { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, group: 15, period: 6, category: 'post-transition' },
    { symbol: 'Po', name: 'Polonium', atomicNumber: 84, group: 16, period: 6, category: 'metalloid' },
    { symbol: 'At', name: 'Astatine', atomicNumber: 85, group: 17, period: 6, category: 'halogen' },
    { symbol: 'Rn', name: 'Radon', atomicNumber: 86, group: 18, period: 6, category: 'noble-gas' },
    
    // Period 7
    { symbol: 'Fr', name: 'Francium', atomicNumber: 87, group: 1, period: 7, category: 'alkali-metal' },
    { symbol: 'Ra', name: 'Radium', atomicNumber: 88, group: 2, period: 7, category: 'alkaline-earth' },
    { symbol: 'Ac', name: 'Actinium', atomicNumber: 89, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Th', name: 'Thorium', atomicNumber: 90, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Pa', name: 'Protactinium', atomicNumber: 91, group: 3, period: 7, category: 'actinide' },
    { symbol: 'U', name: 'Uranium', atomicNumber: 92, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Np', name: 'Neptunium', atomicNumber: 93, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Pu', name: 'Plutonium', atomicNumber: 94, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Am', name: 'Americium', atomicNumber: 95, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Cm', name: 'Curium', atomicNumber: 96, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Bk', name: 'Berkelium', atomicNumber: 97, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Cf', name: 'Californium', atomicNumber: 98, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Es', name: 'Einsteinium', atomicNumber: 99, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Fm', name: 'Fermium', atomicNumber: 100, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Md', name: 'Mendelevium', atomicNumber: 101, group: 3, period: 7, category: 'actinide' },
    { symbol: 'No', name: 'Nobelium', atomicNumber: 102, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Lr', name: 'Lawrencium', atomicNumber: 103, group: 3, period: 7, category: 'actinide' },
    { symbol: 'Rf', name: 'Rutherfordium', atomicNumber: 104, group: 4, period: 7, category: 'transition-metal' },
    { symbol: 'Db', name: 'Dubnium', atomicNumber: 105, group: 5, period: 7, category: 'transition-metal' },
    { symbol: 'Sg', name: 'Seaborgium', atomicNumber: 106, group: 6, period: 7, category: 'transition-metal' },
    { symbol: 'Bh', name: 'Bohrium', atomicNumber: 107, group: 7, period: 7, category: 'transition-metal' },
    { symbol: 'Hs', name: 'Hassium', atomicNumber: 108, group: 8, period: 7, category: 'transition-metal' },
    { symbol: 'Mt', name: 'Meitnerium', atomicNumber: 109, group: 9, period: 7, category: 'transition-metal' },
    { symbol: 'Ds', name: 'Darmstadtium', atomicNumber: 110, group: 10, period: 7, category: 'transition-metal' },
    { symbol: 'Rg', name: 'Roentgenium', atomicNumber: 111, group: 11, period: 7, category: 'transition-metal' },
    { symbol: 'Cn', name: 'Copernicium', atomicNumber: 112, group: 12, period: 7, category: 'transition-metal' },
    { symbol: 'Nh', name: 'Nihonium', atomicNumber: 113, group: 13, period: 7, category: 'post-transition' },
    { symbol: 'Fl', name: 'Flerovium', atomicNumber: 114, group: 14, period: 7, category: 'post-transition' },
    { symbol: 'Mc', name: 'Moscovium', atomicNumber: 115, group: 15, period: 7, category: 'post-transition' },
    { symbol: 'Lv', name: 'Livermorium', atomicNumber: 116, group: 16, period: 7, category: 'post-transition' },
    { symbol: 'Ts', name: 'Tennessine', atomicNumber: 117, group: 17, period: 7, category: 'halogen' },
    { symbol: 'Og', name: 'Oganesson', atomicNumber: 118, group: 18, period: 7, category: 'noble-gas' },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'alkali-metal': 'bg-red-300',
      'alkaline-earth': 'bg-orange-300',
      'transition-metal': 'bg-yellow-300',
      'post-transition': 'bg-green-300',
      'metalloid': 'bg-blue-300',
      'nonmetal': 'bg-purple-300',
      'halogen': 'bg-pink-300',
      'noble-gas': 'bg-indigo-300',
      'lanthanide': 'bg-cyan-300',
      'actinide': 'bg-emerald-300',
    };
    return colors[category] || 'bg-gray-300';
  };

  const renderElement = (element) => {
    if (!element) return <div key="empty" className="w-12 h-12"></div>;
    
    return (
      <div
        key={element.atomicNumber}
        className={`w-12 h-12 border border-gray-400 cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg ${getCategoryColor(element.category)} ${
          selectedElement?.atomicNumber === element.atomicNumber ? 'ring-2 ring-blue-500 scale-110' : ''
        }`}
        onClick={() => setSelectedElement(element)}
        title={`${element.name} (${element.symbol})`}
      >
        <div className="h-full flex flex-col items-center justify-center text-xs font-bold">
          <div className="text-xs">{element.atomicNumber}</div>
          <div className="text-sm font-bold">{element.symbol}</div>
        </div>
      </div>
    );
  };

  const createGrid = () => {
    const grid = Array(7).fill(null).map(() => Array(18).fill(null));
    
    elements.forEach(element => {
      // Special positioning for lanthanides and actinides
      if (element.category === 'lanthanide') {
        const lanthanideRow = 8; // Place lanthanides in row 8
        const lanthanideCol = element.atomicNumber - 57; // Ce starts at position 1
        if (!grid[lanthanideRow]) grid[lanthanideRow] = Array(18).fill(null);
        grid[lanthanideRow][lanthanideCol] = element;
      } else if (element.category === 'actinide') {
        const actinideRow = 9; // Place actinides in row 9
        const actinideCol = element.atomicNumber - 89; // Th starts at position 1
        if (!grid[actinideRow]) grid[actinideRow] = Array(18).fill(null);
        grid[actinideRow][actinideCol] = element;
      } else {
        grid[element.period - 1][element.group - 1] = element;
      }
    });
    
    return grid;
  };

  const grid = createGrid();

  const legend = [
    { category: 'alkali-metal', name: 'Alkali Metals', color: 'bg-red-300' },
    { category: 'alkaline-earth', name: 'Alkaline Earth', color: 'bg-orange-300' },
    { category: 'transition-metal', name: 'Transition Metals', color: 'bg-yellow-300' },
    { category: 'post-transition', name: 'Post-transition', color: 'bg-green-300' },
    { category: 'metalloid', name: 'Metalloids', color: 'bg-blue-300' },
    { category: 'nonmetal', name: 'Nonmetals', color: 'bg-purple-300' },
    { category: 'halogen', name: 'Halogens', color: 'bg-pink-300' },
    { category: 'noble-gas', name: 'Noble Gases', color: 'bg-indigo-300' },
    { category: 'lanthanide', name: 'Lanthanides', color: 'bg-cyan-300' },
    { category: 'actinide', name: 'Actinides', color: 'bg-emerald-300' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Periodic Table of Elements</h1>
      
      <div className="flex justify-center mb-6">
        <div className="inline-block">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((element, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="m-0.5">
                  {renderElement(element)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {selectedElement && (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedElement.name}</h2>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-semibold">Symbol:</span> {selectedElement.symbol}</p>
            <p><span className="font-semibold">Atomic Number:</span> {selectedElement.atomicNumber}</p>
            <p><span className="font-semibold">Period:</span> {selectedElement.period}</p>
            <p><span className="font-semibold">Group:</span> {selectedElement.group}</p>
            <p><span className="font-semibold">Category:</span> {selectedElement.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Element Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {legend.map((item) => (
            <div key={item.category} className="flex items-center space-x-2">
              <div className={`w-4 h-4 border border-gray-400 ${item.color}`}></div>
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-600">
        Click on any element to see more details
      </div>
    </div>
  );
};

export default PeriodicTable;
