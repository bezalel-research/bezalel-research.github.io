/**
 * Bezalel Parts Cart Logic
 */

const PARTS_DATABASE = [
  { id: 'frame-3x3', name: 'Main Frame (3x3)', category: 'Mechanics', format: 'STL', size: '1.2MB', path: '/assets/files/frame.stl' },
  { id: 'pin-unit', name: 'Single Pin Unit', category: 'Mechanics', format: 'STL', size: '0.4MB', path: '/assets/files/pin.stl' },
  { id: 'bom-3x3', name: '3x3 Bill of Materials', category: 'Electronics', format: 'CSV', size: '12KB', path: '/assets/files/bom.csv' },
  { id: 'firmware-grbl', name: 'GRBL 1.1h Firmware', category: 'Firmware', format: 'HEX', size: '64KB', path: '/assets/files/firmware.hex' },
  { id: 'ai-dashboard-py', name: 'AI Dashboard Connector', category: 'Code', format: 'PY', size: '8KB', path: '/assets/files/ai_dashboard.py' }
];

let cart = JSON.parse(localStorage.getItem('bezalel_cart')) || [];

function toggleCartItem(id) {
  const index = cart.indexOf(id);
  if (index > -1) {
    cart.splice(index, 1);
  } else {
    cart.push(id);
  }
  saveCart();
  updateUI();
}

function saveCart() {
  localStorage.setItem('bezalel_cart', JSON.stringify(cart));
}

function updateUI() {
  // Update card states
  PARTS_DATABASE.forEach(part => {
    const card = document.querySelector(`[data-part-id="${part.id}"]`);
    if (card) {
      card.classList.toggle('is-selected', cart.includes(part.id));
      const btn = card.querySelector('.btn-add');
      if (btn) btn.textContent = cart.includes(part.id) ? 'Remove' : 'Add to pack';
    }
  });

  // Update download button
  const downloadBtn = document.getElementById('download-bundle-btn');
  if (downloadBtn) {
    downloadBtn.disabled = cart.length === 0;
    downloadBtn.textContent = `Download Pack (${cart.length} items)`;
  }
}

function selectPreset(preset) {
  if (preset === '3x3-full') {
    cart = ['frame-3x3', 'pin-unit', 'bom-3x3', 'firmware-grbl'];
  } else if (preset === 'ai-starter') {
    cart = ['frame-3x3', 'pin-unit', 'ai-dashboard-py'];
  }
  saveCart();
  updateUI();
}

function downloadPack() {
  if (cart.length === 0) return;
  
  const selectedParts = PARTS_DATABASE.filter(p => cart.includes(p.id));
  console.log('Downloading bundle:', selectedParts.map(p => p.path));
  
  alert(`Preparing your pack with ${cart.length} items...\n\nNote: In the final version, this will generate a single .zip file using JSZip.`);
  
  // Simulation: triggering one download to show intent
  // window.location.href = selectedParts[0].path; 
}

// Initial UI sync
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  const downloadBtn = document.getElementById('download-bundle-btn');
  if (downloadBtn) downloadBtn.onclick = downloadPack;
});
