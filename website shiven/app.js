/**
 * JeevanSetu - Smart Emergency Medical Coordination System
 * Frontend Controller & C++ Engine Simulation Bridge
 */

// ==================== STATE & DATA ====================
const state = {
  activeTab: 'livemap',
  currentFilter: 'all',
  currentLocation: {
    lat: 28.5672,
    lon: 77.2100,
    address: 'Near Outer Ring Road, Sukhdev Vihar, New Delhi',
    accuracy: 4
  },
  activeSosStep: 1,
  sosInterval: null,
  hospitals: [
    {
      id: 'fortis',
      name: 'Fortis Escorts Heart Institute',
      distanceKm: 5.3,
      distanceText: '5.3 km away',
      address: 'Okhla Road, Sukhdev Vihar',
      badges: [],
      specialties: ['Cardiac Cath Lab', '24x7 Angioplasty'],
      icuBeds: 14,
      oxygenBeds: 38,
      generalBeds: 110,
      phone: '+91 11 4713 5000',
      doctorsOnDuty: 6,
      traumaLevel: 'Cardiac Specialty ER',
      bloodStock: { 'O-': 4, 'O+': 18, 'A+': 12, 'B+': 15, 'AB+': 8, platelets: 25 },
      coordinates: { lat: 28.5603, lon: 77.2831 }
    },
    {
      id: 'gangaram',
      name: 'Sir Ganga Ram Hospital',
      distanceKm: 3.4,
      distanceText: '3.4 km away',
      address: 'Old Rajinder Nagar, Central Delhi',
      badges: [
        { text: 'Level-1 Trauma', type: 'red' },
        { text: 'Specialized Burns Unit', type: 'slate' }
      ],
      specialties: ['Multi-Specialty', 'Pediatric ICU'],
      icuBeds: 9,
      oxygenBeds: 24,
      generalBeds: 95,
      phone: '+91 11 4225 1000',
      doctorsOnDuty: 9,
      traumaLevel: 'Level-1 Trauma',
      bloodStock: { 'O-': 6, 'O+': 22, 'A+': 16, 'B+': 19, 'AB+': 10, platelets: 38 },
      coordinates: { lat: 28.6385, lon: 77.1895 }
    },
    {
      id: 'aiims',
      name: 'AIIMS Jai Prakash Narayan Apex Trauma Center',
      distanceKm: 1.8,
      distanceText: '1.8 km away',
      address: 'Ring Road, Safdarjung Enclave, New Delhi',
      badges: [
        { text: 'Apex Level-1 Trauma', type: 'red' },
        { text: 'Neuro Trauma Center', type: 'slate' }
      ],
      specialties: ['24x7 Emergency OT', 'Organ Transplant ER', 'Critical Care'],
      icuBeds: 18,
      oxygenBeds: 45,
      generalBeds: 160,
      phone: '+91 11 2618 8000',
      doctorsOnDuty: 14,
      traumaLevel: 'Level-1 Trauma',
      bloodStock: { 'O-': 12, 'O+': 35, 'A+': 28, 'B+': 30, 'AB+': 14, platelets: 52 },
      coordinates: { lat: 28.5686, lon: 77.2066 }
    },
    {
      id: 'max',
      name: 'Max Super Speciality Hospital',
      distanceKm: 4.1,
      distanceText: '4.1 km away',
      address: '1, 2 Press Enclave Marg, Saket',
      badges: [
        { text: 'Stroke Care ER', type: 'slate' }
      ],
      specialties: ['Cardiac Care', 'Comprehensive Stroke Center'],
      icuBeds: 11,
      oxygenBeds: 32,
      generalBeds: 88,
      phone: '+91 11 2651 5050',
      doctorsOnDuty: 7,
      traumaLevel: 'Tertiary ER',
      bloodStock: { 'O-': 3, 'O+': 14, 'A+': 15, 'B+': 11, 'AB+': 5, platelets: 18 },
      coordinates: { lat: 28.5276, lon: 77.2119 }
    },
    {
      id: 'safdarjung',
      name: 'Safdarjung Hospital Emergency Block',
      distanceKm: 2.2,
      distanceText: '2.2 km away',
      address: 'Ansari Nagar East, Ring Road',
      badges: [
        { text: 'Largest Burns Unit', type: 'red' },
        { text: 'Govt Level-1', type: 'slate' }
      ],
      specialties: ['Specialized Burns ICU', '24x7 Free ER', 'Disaster Ward'],
      icuBeds: 16,
      oxygenBeds: 50,
      generalBeds: 210,
      phone: '+91 11 2670 7444',
      doctorsOnDuty: 12,
      traumaLevel: 'Level-1 Trauma & Burns',
      bloodStock: { 'O-': 8, 'O+': 40, 'A+': 25, 'B+': 32, 'AB+': 12, platelets: 44 },
      coordinates: { lat: 28.5702, lon: 77.2081 }
    },
    {
      id: 'apollo',
      name: 'Indraprastha Apollo Hospital',
      distanceKm: 6.2,
      distanceText: '6.2 km away',
      address: 'Delhi-Mathura Road, Sarita Vihar',
      badges: [
        { text: 'JCI Accredited ER', type: 'slate' }
      ],
      specialties: ['Cardio-Thoracic ER', 'Pediatric Intensive Care'],
      icuBeds: 12,
      oxygenBeds: 29,
      generalBeds: 125,
      phone: '+91 11 2692 5858',
      doctorsOnDuty: 8,
      traumaLevel: 'Tertiary ER',
      bloodStock: { 'O-': 5, 'O+': 20, 'A+': 18, 'B+': 16, 'AB+': 9, platelets: 30 },
      coordinates: { lat: 28.5398, lon: 77.2882 }
    }
  ],
  ambulances: [
    {
      id: 'DL-01-EA-4029',
      driver: 'Satish Kumar',
      phone: '+91 98765 43210',
      type: 'ALS',
      equipment: ['Ventilator', 'Defibrillator', 'Oxygen', 'ECG'],
      etaMins: 3.2,
      status: 'AVAILABLE',
      base: 'AIIMS Apex Depot'
    },
    {
      id: 'DL-02-ER-9182',
      driver: 'Mohan Lal',
      phone: '+91 98111 22334',
      type: 'BLS',
      equipment: ['Oxygen', 'Stretcher', 'AED', 'First Aid'],
      etaMins: 5.8,
      status: 'AVAILABLE',
      base: 'Safdarjung Station'
    },
    {
      id: 'DL-04-TR-5510',
      driver: 'Deepak Sharma',
      phone: '+91 98999 12345',
      type: 'ALS',
      equipment: ['Advanced Ventilator', 'Infusion Pump', 'Trauma Kit'],
      etaMins: 7.9,
      status: 'ON_ROUTE',
      base: 'Sir Ganga Ram Depot'
    },
    {
      id: 'DL-07-EM-3301',
      driver: 'Rakesh Yadav',
      phone: '+91 97110 54321',
      type: 'BLS',
      equipment: ['Basic Life Support Kit', 'Suction Machine'],
      etaMins: 11.0,
      status: 'AVAILABLE',
      base: 'Okhla ER Station'
    }
  ],
  incomingCases: [
    {
      token: 'JS-EMG-2026-9041',
      patient: 'Rahul Verma',
      condition: 'Road Trauma (Multiple abrasions)',
      bedType: 'ICU Bed #04',
      ambulance: 'DL-01-EA-4029 (ALS)',
      hospital: 'Sir Ganga Ram Hospital',
      eta: '3.8 mins',
      status: 'En Route'
    },
    {
      token: 'JS-EMG-2026-8812',
      patient: 'Anjali Gupta (Age 54)',
      condition: 'Acute STEMI (Heart Attack)',
      bedType: 'Cardiac ICU #02',
      ambulance: 'DL-04-TR-5510 (ALS)',
      hospital: 'Fortis Escorts Heart Inst.',
      eta: '6.5 mins',
      status: 'En Route'
    }
  ],
  selectedHospitalForReserve: null
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  renderHospitals();
  renderAmbulances();
  renderBedsTable();
  renderBloodBank();
  renderAdminDashboard();
  renderAlgoRankings();
  updateTotalBedCounts();

  // Initialize and show interactive live map immediately on page load
  initFullLiveMap();

  // Acquire real-time satellite GPS location immediately
  fetchLiveLocation();

  // Set default coordinates in LoRa section
  const latEl = document.getElementById('lora-lat');
  const lonEl = document.getElementById('lora-lon');
  if (latEl && lonEl) {
    latEl.value = state.currentLocation.lat;
    lonEl.value = state.currentLocation.lon;
  }
});

// ==================== TAB NAVIGATION ====================
function switchTab(tabId) {
  state.activeTab = tabId;

  // Update nav buttons
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Switch view panes
  const views = document.querySelectorAll('.tab-view');
  views.forEach(view => {
    if (view.id === `view-${tabId}`) {
      view.classList.add('active-view');
    } else {
      view.classList.remove('active-view');
    }
  });

  // Specific refresh per view
  if (tabId === 'livemap') {
    initFullLiveMap();
  } else if (tabId === 'ambulances') {
    initFleetMap();
  } else if (tabId === 'admin') {
    renderAdminDashboard();
    renderAlgoRankings();
  } else if (tabId === 'beds') {
    renderBedsTable();
    updateTotalBedCounts();
  } else if (tabId === 'blood') {
    renderBloodBank();
  }
}

// ==================== VIEW 1: HOSPITALS RENDERING (MATCHING IMAGE 2) ====================
function renderHospitals() {
  const container = document.getElementById('hospitals-card-container');
  if (!container) return;

  const filtered = state.hospitals.filter(h => {
    if (state.currentFilter === 'trauma') return h.traumaLevel.toLowerCase().includes('trauma');
    if (state.currentFilter === 'cardiac') return h.specialties.some(s => s.toLowerCase().includes('cardiac') || s.toLowerCase().includes('angioplasty'));
    if (state.currentFilter === 'burns') return h.badges.some(b => b.text.toLowerCase().includes('burns')) || h.specialties.some(s => s.toLowerCase().includes('burns'));
    if (state.currentFilter === 'available-icu') return h.icuBeds >= 10;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #94a3b8;">
        <h3>No hospitals found matching current filter.</h3>
        <p>Try resetting filters or search query.</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(h => `
    <div class="hospital-card" id="card-${h.id}">
      <!-- Top badges (Level-1 Trauma, Specialized Burns Unit from Image 2) -->
      ${h.badges && h.badges.length > 0 ? `
        <div class="card-top-tags">
          ${h.badges.map(b => `
            <span class="${b.type === 'red' ? 'badge-red' : 'badge-slate'}">${escapeHtml(b.text)}</span>
          `).join('')}
        </div>
      ` : ''}

      <!-- Header row: Hospital Name & Distance Pill (Image 2) -->
      <div class="card-header-row">
        <h3 class="hospital-name">${escapeHtml(h.name)}</h3>
        <span class="distance-pill">${escapeHtml(h.distanceText)}</span>
      </div>

      <!-- Address location with map pin -->
      <div class="hospital-location">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 21s-8-7.5-8-12a8 8 0 1 1 16 0c0 4.5-8 12-8 12z"/>
          <circle cx="12" cy="9" r="3"/>
        </svg>
        <span>${escapeHtml(h.address)}</span>
      </div>

      <!-- Specialty tags (e.g., Cardiac Cath Lab, 24x7 Angioplasty, Multi-Specialty, Pediatric ICU) -->
      <div class="specialty-tags">
        ${h.specialties.map(spec => `
          <span class="specialty-chip">${escapeHtml(spec)}</span>
        `).join('')}
      </div>

      <!-- Recessed Bed Stats Box (Image 2 exact: 14 ICU BEDS | 38 OXYGEN BEDS | 110 GENERAL) -->
      <div class="bed-stats-box">
        <div class="stat-col">
          <span class="stat-number green">${h.icuBeds}</span>
          <span class="stat-label">ICU BEDS</span>
        </div>
        <div class="stat-col">
          <span class="stat-number yellow">${h.oxygenBeds}</span>
          <span class="stat-label">OXYGEN BEDS</span>
        </div>
        <div class="stat-col">
          <span class="stat-number white">${h.generalBeds}</span>
          <span class="stat-label">GENERAL</span>
        </div>
      </div>

      <!-- Extra realtime indicator row -->
      <div class="quick-indicators">
        <div class="indicator-item">
          <span class="indicator-icon">●</span>
          <span>${h.doctorsOnDuty} ER Trauma Specialists On-Duty</span>
        </div>
        <div class="indicator-item">
          <span>O- Universal Blood: <strong>${h.bloodStock['O-']} Units</strong></span>
        </div>
      </div>

      <!-- Action Buttons (Call ER & Reserve Bed from Image 2) -->
      <div class="card-actions">
        <button class="btn-call-er" onclick="triggerErCall('${h.phone}')">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>
          </svg>
          Call ER
        </button>
        <button class="btn-reserve-bed" onclick="openBedReserveModal('${h.id}')">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Reserve Bed
        </button>
      </div>
    </div>
  `).join('');
}

function filterHospitals() {
  const query = document.getElementById('hospital-search').value.toLowerCase();
  const cards = document.querySelectorAll('.hospital-card');
  
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? 'flex' : 'none';
  });
}

function applyHospitalFilter(filterKey) {
  state.currentFilter = filterKey;
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-filter') === filterKey);
  });
  renderHospitals();
}

// ==================== VIEW 2: AMBULANCES ====================
function renderAmbulances() {
  const container = document.getElementById('fleet-units-list');
  if (!container) return;

  container.innerHTML = state.ambulances.map(amb => `
    <div class="ambulance-unit-card" onclick="selectAmbulance('${amb.id}')">
      <div class="unit-top-row">
        <span class="unit-id">${escapeHtml(amb.id)}</span>
        <span class="unit-type-tag ${amb.type === 'ALS' ? 'tag-als' : 'tag-bls'}">
          ${amb.type} ${amb.type === 'ALS' ? '(Advanced Life Support)' : '(Basic Life Support)'}
        </span>
      </div>
      <div class="unit-details-row">
        <span>Driver: <strong>${escapeHtml(amb.driver)}</strong></span>
        <span>ETA to you: <strong class="highlight-cyan">${amb.etaMins} mins</strong></span>
      </div>
      <div class="unit-details-row">
        <span class="text-muted">Equipped: ${amb.equipment.join(' • ')}</span>
        <span class="${amb.status === 'AVAILABLE' ? 'text-green' : 'text-yellow'}">● ${amb.status}</span>
      </div>
    </div>
  `).join('');

  const countBadge = document.getElementById('active-ambulance-count');
  if (countBadge) {
    countBadge.innerText = `${state.ambulances.filter(a => a.status === 'AVAILABLE').length} Available`;
  }
}

function selectAmbulance(ambId) {
  const amb = state.ambulances.find(a => a.id === ambId);
  if (!amb) return;
  showToast(`Ambulance ${amb.id} selected. Driver: ${amb.driver} (${amb.phone}). ETA: ${amb.etaMins} min`, 'info');
}

function requestAmbulanceQuick() {
  openSosModal();
  advanceToStep2();
}

// ==================== VIEW 3: ICU BEDS TABLE ====================
function renderBedsTable() {
  const tbody = document.getElementById('beds-table-body');
  if (!tbody) return;

  tbody.innerHTML = state.hospitals.map(h => `
    <tr>
      <td>
        <strong style="color: #fff; font-size: 0.95rem;">${escapeHtml(h.name)}</strong>
        <div style="font-size: 0.75rem; color: #94a3b8;">${escapeHtml(h.address)}</div>
      </td>
      <td><span class="distance-pill">${h.distanceText}</span></td>
      <td><span class="badge-slate">${escapeHtml(h.traumaLevel)}</span></td>
      <td><span class="text-green" style="font-size: 1.1rem; font-weight: 800;">${h.icuBeds} Free</span></td>
      <td><span class="text-yellow" style="font-size: 1.1rem; font-weight: 800;">${h.oxygenBeds} Free</span></td>
      <td><span class="text-blue" style="font-weight: 700;">${h.doctorsOnDuty} Doctors</span></td>
      <td>
        <button class="btn-reserve-bed" style="padding: 0.45rem 0.9rem; font-size: 0.8rem;" onclick="openBedReserveModal('${h.id}')">
          Reserve Now
        </button>
      </td>
    </tr>
  `).join('');
}

function updateTotalBedCounts() {
  const icuTotal = state.hospitals.reduce((acc, h) => acc + h.icuBeds, 0);
  const oxyTotal = state.hospitals.reduce((acc, h) => acc + h.oxygenBeds, 0);
  const genTotal = state.hospitals.reduce((acc, h) => acc + h.generalBeds, 0);

  const icuEl = document.getElementById('total-icu-available');
  const oxyEl = document.getElementById('total-oxygen-available');
  const genEl = document.getElementById('total-general-available');

  if (icuEl) icuEl.innerText = icuTotal;
  if (oxyEl) oxyEl.innerText = oxyTotal;
  if (genEl) genEl.innerText = genTotal;
}

// ==================== VIEW 4: BLOOD BANK ====================
function renderBloodBank() {
  const groupsContainer = document.getElementById('blood-groups-container');
  const stockBody = document.getElementById('blood-stock-body');

  const bloodGroups = ['O-', 'O+', 'A+', 'B+', 'AB+', 'A-', 'B-', 'AB-'];
  const totals = {};
  bloodGroups.forEach(g => {
    totals[g] = state.hospitals.reduce((sum, h) => sum + (h.bloodStock[g] || 0), 0);
  });

  if (groupsContainer) {
    groupsContainer.innerHTML = Object.entries(totals).map(([group, units]) => `
      <div class="blood-chip-card ${units < 15 ? 'critical' : ''}">
        <span class="blood-group-name">${group}</span>
        <span class="blood-units-count">${units}</span>
        <span class="blood-unit-label">Units Available</span>
        ${units < 15 ? '<small style="color: #ef4444; font-size: 0.65rem; font-weight:700;">LOW RESERVE</small>' : ''}
      </div>
    `).join('');
  }

  if (stockBody) {
    stockBody.innerHTML = state.hospitals.map(h => `
      <tr>
        <td><strong>${escapeHtml(h.name)}</strong></td>
        <td><span class="distance-pill">${h.distanceText}</span></td>
        <td><strong class="text-green">${h.bloodStock['O-']} Units</strong></td>
        <td>${h.bloodStock['O+']} Units</td>
        <td>${h.bloodStock['A+']} Units</td>
        <td>${h.bloodStock['B+']} Units</td>
        <td>${h.bloodStock['AB+']} Units</td>
        <td><span class="text-blue">${h.bloodStock.platelets} Units</span></td>
        <td>
          <button class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" onclick="requestBloodUnits('${h.id}')">
            Request
          </button>
        </td>
      </tr>
    `).join('');
  }
}

function requestBloodUnits(hospitalId) {
  const h = state.hospitals.find(item => item.id === hospitalId);
  if (!h) return;
  showToast(`Blood reserve request sent to ${h.name} Blood Bank. Contact: ${h.phone}`, 'success');
}

function openBloodRequestModal() {
  showToast('Connecting to Centralized Red Cross & Delhi Blood Transfusion Council...', 'info');
}

// ==================== VIEW 5: ADMIN & C++ ALGORITHM ====================
function renderAdminDashboard() {
  const feed = document.getElementById('incoming-cases-feed');
  if (!feed) return;

  feed.innerHTML = state.incomingCases.map(c => `
    <div class="case-item">
      <div class="case-info">
        <h4>${escapeHtml(c.patient)} <small style="color: #38bdf8; font-family: monospace;">(${c.token})</small></h4>
        <p>${escapeHtml(c.condition)} • <strong>${escapeHtml(c.bedType)}</strong></p>
        <p class="text-muted">${escapeHtml(c.ambulance)} &rarr; ${escapeHtml(c.hospital)}</p>
      </div>
      <div>
        <span class="case-status-badge status-enroute">ETA ${c.eta}</span>
      </div>
    </div>
  `).join('');
}

function renderAlgoRankings() {
  const tableContainer = document.getElementById('algo-rankings-table');
  if (!tableContainer) return;

  // C++ Ranking Algorithm Formula Implementation:
  // Score = (w_dist * 10 / dist) + (w_icu * icu) + (w_doc * docs) + (w_blood * bloodO_neg)
  // Weights: w_dist=3.0, w_icu=2.0, w_doc=1.5, w_blood=1.2
  const rankedHospitals = state.hospitals.map(h => {
    const distScore = (3.0 * 10) / Math.max(h.distanceKm, 0.5);
    const icuScore = 2.0 * h.icuBeds;
    const docScore = 1.5 * h.doctorsOnDuty;
    const bloodScore = 1.2 * h.bloodStock['O-'];
    const totalScore = (distScore + icuScore + docScore + bloodScore).toFixed(1);

    return {
      ...h,
      totalScore: parseFloat(totalScore),
      distScore: distScore.toFixed(1),
      icuScore: icuScore.toFixed(1),
      docScore: docScore.toFixed(1)
    };
  }).sort((a, b) => b.totalScore - a.totalScore);

  tableContainer.innerHTML = `
    <table class="beds-table">
      <thead>
        <tr>
          <th>C++ Rank</th>
          <th>Hospital Name</th>
          <th>Distance</th>
          <th>ICU Beds</th>
          <th>Doctors</th>
          <th>Universal Blood</th>
          <th>Recommendation Score</th>
        </tr>
      </thead>
      <tbody>
        ${rankedHospitals.map((h, idx) => `
          <tr style="${idx === 0 ? 'background: rgba(0, 168, 255, 0.08);' : ''}">
            <td><strong style="color: ${idx === 0 ? '#38bdf8' : '#94a3b8'};">#${idx + 1}</strong></td>
            <td><strong>${escapeHtml(h.name)}</strong></td>
            <td>${h.distanceText}</td>
            <td><span class="text-green">${h.icuBeds}</span></td>
            <td>${h.doctorsOnDuty}</td>
            <td>${h.bloodStock['O-']}</td>
            <td>
              <strong style="color: #38bdf8; font-family: monospace; font-size: 1.05rem;">${h.totalScore} pts</strong>
              ${idx === 0 ? '<span class="match-badge" style="position: static; margin-left: 6px;">OPTIMAL</span>' : ''}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function adjustBeds(hospId, type, delta) {
  const h = state.hospitals.find(item => item.id === hospId);
  if (!h) return;

  if (type === 'icu') {
    h.icuBeds = Math.max(0, h.icuBeds + delta);
    const el = document.getElementById('admin-aiims-icu');
    if (el) el.innerText = h.icuBeds;
  } else if (type === 'oxygen') {
    h.oxygenBeds = Math.max(0, h.oxygenBeds + delta);
    const el = document.getElementById('admin-aiims-oxy');
    if (el) el.innerText = h.oxygenBeds;
  }

  renderHospitals();
  renderAlgoRankings();
  updateTotalBedCounts();
  showToast(`Updated ${h.name} bed inventory. Recalculating C++ dispatch scores.`, 'info');
}

function adjustDoctors(hospId, delta) {
  const h = state.hospitals.find(item => item.id === hospId);
  if (!h) return;
  h.doctorsOnDuty = Math.max(1, h.doctorsOnDuty + delta);
  const el = document.getElementById('admin-aiims-docs');
  if (el) el.innerText = h.doctorsOnDuty;
  renderAlgoRankings();
}

function simulateIncomingEmergency() {
  const newCase = {
    token: `JS-EMG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    patient: 'Siddharth Roy (Multiple Trauma)',
    condition: 'Vehicular Collision on DND Flyway',
    bedType: 'Apex ICU #07',
    ambulance: 'DL-01-EA-4029 (ALS)',
    hospital: 'AIIMS Apex Trauma Center',
    eta: '4.2 mins',
    status: 'En Route'
  };
  state.incomingCases.unshift(newCase);
  renderAdminDashboard();
  showToast(`Emergency Incident Dispatched! Token: ${newCase.token}`, 'danger');
}

function resetDemoData() {
  location.reload();
}

// ==================== VIEW 6: LORA OFFLINE PROTOCOL SIMULATOR ====================
function generateAndTransmitLoRa() {
  const lat = parseFloat(document.getElementById('lora-lat').value);
  const lon = parseFloat(document.getElementById('lora-lon').value);
  const sev = document.getElementById('lora-severity').value;
  const bld = document.getElementById('lora-blood').value;

  const terminal = document.getElementById('lora-terminal');
  if (!terminal) return;

  // Generate simulated 16-byte hex frame
  // Format: [SYNC 2B][LAT 3B][LON 3B][SEV 1B][BLD 1B][TIMESTAMP 4B][CRC 2B]
  const hexSync = '5345'; // "SE" (Setu Emergency)
  const hexLat = Math.round(lat * 10000).toString(16).toUpperCase().padStart(6, '0');
  const hexLon = Math.round(lon * 10000).toString(16).toUpperCase().padStart(6, '0');
  const hexSev = (sev === 'CRITICAL_TRAUMA' ? '01' : sev === 'CARDIAC' ? '02' : '03');
  const hexBld = (bld === 'O_NEG' ? '01' : '02');
  const hexTime = Math.floor(Date.now() / 1000).toString(16).toUpperCase().slice(-8);
  const hexCrc = 'A9C2';

  const fullPacket = `${hexSync} ${hexLat} ${hexLon} ${hexSev} ${hexBld} ${hexTime} ${hexCrc}`;

  const timestamp = new Date().toLocaleTimeString();
  terminal.innerHTML += `
    <div class="term-line text-warn">[${timestamp}] [LORA TX] Broadcasting packet via 868.100MHz...</div>
    <div class="term-line text-cyan">&gt;&gt; FRAME: 0x ${fullPacket} (16 Bytes)</div>
    <div class="term-line text-green">[ACK RECEIVED] Gateway "GW-DELHI-SOUTH-09" verified frame (RSSI -88dBm, SNR +9.2dB)</div>
    <div class="term-line text-muted">&gt;&gt; Injected packet into C++ Emergency Dispatch Pipeline.</div>
  `;
  terminal.scrollTop = terminal.scrollHeight;

  // Update hex badges
  const hexContainer = document.getElementById('hex-badges');
  if (hexContainer) {
    hexContainer.innerHTML = `
      <span class="hex-chip">SYNC: 0x${hexSync}</span>
      <span class="hex-chip">LAT: 0x${hexLat}</span>
      <span class="hex-chip">LON: 0x${hexLon}</span>
      <span class="hex-chip">SEV: 0x${hexSev}</span>
      <span class="hex-chip">BLD: 0x${hexBld}</span>
      <span class="hex-chip">TIME: 0x${hexTime}</span>
      <span class="hex-chip">CRC: 0x${hexCrc}</span>
    `;
  }

  showToast('LoRa Sub-GHz emergency packet broadcast successfully!', 'success');
}

// ==================== SOS MODAL & MULTI-STEP WORKFLOW (IMAGES 1 & 3) ====================
function openSosModal() {
  const modal = document.getElementById('sos-modal-backdrop');
  if (!modal) return;
  modal.classList.add('open');
  setSosStep(1);
  // Proactively start high-accuracy GPS acquisition immediately
  fetchLiveLocation();
}

function closeSosModal() {
  const modal = document.getElementById('sos-modal-backdrop');
  if (modal) modal.classList.remove('open');
}

function setSosStep(stepNum) {
  state.activeSosStep = stepNum;

  // Update stepper UI
  for (let i = 1; i <= 5; i++) {
    const node = document.getElementById(`step-node-${i}`);
    const pane = document.getElementById(`pane-step-${i}`);
    const line = document.getElementById(`step-line-${i}`);

    if (node) {
      node.classList.remove('active', 'completed');
      if (i < stepNum) node.classList.add('completed');
      if (i === stepNum) node.classList.add('active');
    }

    if (line) {
      line.classList.toggle('active', i < stepNum);
    }

    if (pane) {
      pane.classList.toggle('active', i === stepNum);
    }
  }

  // Update Modal Footer Buttons
  const prevBtn = document.getElementById('modal-prev-btn');
  const nextBtn = document.getElementById('modal-next-btn');

  if (prevBtn) {
    prevBtn.style.display = stepNum > 1 ? 'block' : 'none';
  }

  if (nextBtn) {
    if (stepNum === 1) nextBtn.innerText = 'Detect Location & Proceed →';
    else if (stepNum === 2) nextBtn.innerText = 'Evaluate C++ Recommendation →';
    else if (stepNum === 3) nextBtn.innerText = 'Confirm Bed & Ambulance Dispatch →';
    else if (stepNum === 4) nextBtn.innerText = 'Send Family Notifications →';
    else if (stepNum === 5) nextBtn.innerText = 'Finish & View Dashboard';
  }

  // Trigger step-specific animations
  if (stepNum === 2) {
    simulateGpsLock();
    setTimeout(() => {
      initStep2Map();
    }, 250);
  } else if (stepNum === 3) {
    simulateChecks();
  } else if (stepNum === 4) {
    simulateEtaProgress();
  } else if (stepNum === 5) {
    updateFamilyMessage();
  }
}

function advanceToStep2() {
  setSosStep(2);
}

function nextSosStep() {
  if (state.activeSosStep < 5) {
    setSosStep(state.activeSosStep + 1);
  } else {
    closeSosModal();
    switchTab('admin');
  }
}

function previousSosStep() {
  if (state.activeSosStep > 1) {
    setSosStep(state.activeSosStep - 1);
  }
}

// ==================== LIVE GEOLOCATION & DISTANCE ENGINE ====================
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371.0; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180.0;
  const dLon = (lon2 - lon1) * Math.PI / 180.0;
  const a = Math.sin(dLat / 2.0) * Math.sin(dLat / 2.0) +
            Math.cos(lat1 * Math.PI / 180.0) * Math.cos(lat2 * Math.PI / 180.0) *
            Math.sin(dLon / 2.0) * Math.sin(dLon / 2.0);
  const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
  return R * c;
}

function fetchLiveLocation(callback) {
  const addrEl = document.getElementById('detected-address');
  const latEl = document.getElementById('gps-lat-val');
  const lonEl = document.getElementById('gps-lon-val');
  const accEl = document.getElementById('gps-accuracy-val');

  if (addrEl) {
    addrEl.innerHTML = `<span style="color: #38bdf8;">📡 Interfacing with device GPS sensor for live satellite lock...</span>`;
  }

  if (!navigator.geolocation) {
    showToast('HTML5 Geolocation is not supported by your browser.', 'danger');
    if (addrEl) addrEl.innerText = state.currentLocation.address;
    if (callback) callback(state.currentLocation);
    return;
  }

  showToast('Acquiring high-precision live GPS coordinates...', 'info');

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const accuracy = Math.round(position.coords.accuracy || 5);

      state.currentLocation.lat = parseFloat(lat.toFixed(6));
      state.currentLocation.lon = parseFloat(lon.toFixed(6));
      state.currentLocation.accuracy = accuracy;

      // Update UI modal numbers
      if (latEl) latEl.innerText = `${state.currentLocation.lat.toFixed(4)}° N`;
      if (lonEl) lonEl.innerText = `${state.currentLocation.lon.toFixed(4)}° E`;
      if (accEl) accEl.innerText = `± ${accuracy} meters (High Precision GPS)`;

      // Update LoRa inputs
      const loraLat = document.getElementById('lora-lat');
      const loraLon = document.getElementById('lora-lon');
      if (loraLat) loraLat.value = state.currentLocation.lat.toFixed(4);
      if (loraLon) loraLon.value = state.currentLocation.lon.toFixed(4);

      // Attempt reverse-geocoding for exact real street name
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
        if (response.ok) {
          const data = await response.json();
          const road = data.address?.road || data.address?.suburb || data.address?.neighbourhood || '';
          const city = data.address?.city || data.address?.town || data.address?.state_district || data.address?.state || '';
          const fullAddr = [road, city].filter(Boolean).join(', ') || data.display_name;

          if (fullAddr) {
            state.currentLocation.address = fullAddr;
          }
        }
      } catch (err) {
        console.warn('Reverse geocoding network notice:', err);
        state.currentLocation.address = `Live GPS: ${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`;
      }

      if (addrEl) {
        addrEl.innerHTML = `<strong>Live Spot:</strong> ${escapeHtml(state.currentLocation.address)}`;
      }

      // Update top navbar location badge
      const locText = document.getElementById('current-location-text');
      if (locText) {
        locText.innerText = `${state.currentLocation.lat.toFixed(3)}°N, ${state.currentLocation.lon.toFixed(3)}°E`;
      }

      // Dynamically recalculate all hospital distances from user's live position
      recalculateHospitalDistances();

      showToast(`Real-time GPS locked: ${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E (±${accuracy}m)`, 'success');
      if (callback) callback(state.currentLocation);
    },
    (error) => {
      console.warn('Geolocation sensor notice:', error);
      let errMsg = 'Location notice: ';
      if (error.code === 1) {
        errMsg += 'Location access was not granted in browser prompt. Using calibrated emergency grid coordinates.';
      } else if (error.code === 2) {
        errMsg += 'GPS position unavailable. Using nearest calibrated emergency tower.';
      } else {
        errMsg += 'GPS lookup timed out.';
      }

      if (addrEl) {
        addrEl.innerHTML = `<strong>Fallback Location:</strong> ${escapeHtml(state.currentLocation.address)}`;
      }
      showToast(errMsg, 'info');
      recalculateHospitalDistances();
      if (callback) callback(state.currentLocation);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function recalculateHospitalDistances() {
  const userLat = state.currentLocation.lat;
  const userLon = state.currentLocation.lon;

  state.hospitals.forEach(h => {
    const dist = haversineDistance(userLat, userLon, h.coordinates.lat, h.coordinates.lon);
    h.distanceKm = parseFloat(dist.toFixed(1));
    h.distanceText = `${h.distanceKm} km away`;
  });

  // Re-render views with new real-time distances
  renderHospitals();
  renderBedsTable();
  renderAlgoRankings();

  // Update live maps
  if (fullLiveMap) renderGoogleMapMarkers(fullLiveMap);
  if (fleetLiveMap) renderGoogleMapMarkers(fleetLiveMap);
  if (step2LiveMap) renderGoogleMapMarkers(step2LiveMap, true);
  updateMapHud();
}

// ==================== GOOGLE MAPS ENGINE & CONTROLS ====================
let fullLiveMap = null;
let fleetLiveMap = null;
let step2LiveMap = null;
let currentMapLayer = 'streets';
let isTrafficActive = false;

// Authentic Google Maps tile layers (Subdomains mt0-mt3 with Google Servers)
function getGoogleTileLayer(type) {
  const layerMap = {
    streets: 'm',        // Google Maps Standard Streets
    satellite: 'y',      // Google Maps Satellite with Road Labels (Hybrid)
    terrain: 'p',        // Google Maps Terrain / Topography
    traffic: 'm,traffic' // Google Maps Live Traffic
  };
  const lyrs = layerMap[type] || 'm';
  return L.tileLayer(`https://{s}.google.com/vt/lyrs=${lyrs}&x={x}&y={y}&z={z}`, {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google Maps'
  });
}

let activeGoogleLayer = null;
let activeTrafficOverlay = null;

function initFullLiveMap() {
  const container = document.getElementById('full-live-map');
  if (!container || typeof L === 'undefined') return;

  const userLat = state.currentLocation.lat;
  const userLon = state.currentLocation.lon;

  if (!fullLiveMap) {
    fullLiveMap = L.map('full-live-map', {
      zoomControl: false, // Using clean Google Maps controls
      attributionControl: false
    }).setView([userLat, userLon], 14);

    activeGoogleLayer = getGoogleTileLayer('streets').addTo(fullLiveMap);
    
    // Add Google Maps standard zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(fullLiveMap);
  } else {
    fullLiveMap.setView([userLat, userLon], 14);
  }

  renderGoogleMapMarkers(fullLiveMap);
  updateMapHud();

  setTimeout(() => {
    if (fullLiveMap) fullLiveMap.invalidateSize();
  }, 250);
}

function setMapLayer(layerName) {
  currentMapLayer = layerName;
  ['streets', 'satellite', 'terrain'].forEach(name => {
    const btn = document.getElementById(`btn-layer-${name}`);
    if (btn) btn.classList.toggle('active', name === layerName);
  });

  if (fullLiveMap && activeGoogleLayer) {
    fullLiveMap.removeLayer(activeGoogleLayer);
    activeGoogleLayer = getGoogleTileLayer(layerName).addTo(fullLiveMap);
    
    if (isTrafficActive && activeTrafficOverlay) {
      activeTrafficOverlay.bringToFront();
    }
    showToast(`Switched to Google Maps ${layerName.toUpperCase()} view.`, 'info');
  }
}

function toggleTrafficLayer() {
  isTrafficActive = !isTrafficActive;
  const btn = document.getElementById('btn-layer-traffic');
  if (btn) btn.classList.toggle('active', isTrafficActive);

  if (fullLiveMap) {
    if (isTrafficActive) {
      activeTrafficOverlay = getGoogleTileLayer('traffic').addTo(fullLiveMap);
      showToast('🚦 Google Maps Live Traffic Layer Enabled.', 'info');
    } else if (activeTrafficOverlay) {
      fullLiveMap.removeLayer(activeTrafficOverlay);
      activeTrafficOverlay = null;
      showToast('Traffic layer turned off.', 'info');
    }
  }
}

function openDirectionsToNearest() {
  const nearest = [...state.hospitals].sort((a,b) => a.distanceKm - b.distanceKm)[0];
  if (!nearest) return;

  const url = `https://www.google.com/maps/dir/?api=1&origin=${state.currentLocation.lat},${state.currentLocation.lon}&destination=${nearest.coordinates.lat},${nearest.coordinates.lon}&travelmode=driving`;
  window.open(url, '_blank');
  showToast(`Opening Google Maps Navigation to ${nearest.name}...`, 'success');
}

function filterMapMarkers(query) {
  if (!fullLiveMap) return;
  const q = (query || '').toLowerCase().trim();
  renderGoogleMapMarkers(fullLiveMap, false, q);
}

function initFleetMap() {
  const container = document.getElementById('fleet-live-map');
  if (!container || typeof L === 'undefined') return;

  const userLat = state.currentLocation.lat;
  const userLon = state.currentLocation.lon;

  if (!fleetLiveMap) {
    fleetLiveMap = L.map('fleet-live-map', {
      zoomControl: true,
      attributionControl: false
    }).setView([userLat, userLon], 13);

    getGoogleTileLayer('streets').addTo(fleetLiveMap);
  } else {
    fleetLiveMap.setView([userLat, userLon], 13);
  }

  renderGoogleMapMarkers(fleetLiveMap);

  setTimeout(() => {
    if (fleetLiveMap) fleetLiveMap.invalidateSize();
  }, 250);
}

function initStep2Map() {
  const container = document.getElementById('sos-step2-map');
  if (!container || typeof L === 'undefined') return;

  const userLat = state.currentLocation.lat;
  const userLon = state.currentLocation.lon;

  if (!step2LiveMap) {
    step2LiveMap = L.map('sos-step2-map', {
      zoomControl: false,
      attributionControl: false
    }).setView([userLat, userLon], 15);

    getGoogleTileLayer('streets').addTo(step2LiveMap);
  } else {
    step2LiveMap.setView([userLat, userLon], 15);
  }

  renderGoogleMapMarkers(step2LiveMap, true);

  setTimeout(() => {
    if (step2LiveMap) step2LiveMap.invalidateSize();
  }, 250);
}

function renderGoogleMapMarkers(targetMap, isModal = false, filterQuery = '') {
  if (!targetMap || typeof L === 'undefined') return;

  const userLat = state.currentLocation.lat;
  const userLon = state.currentLocation.lon;

  // Clear existing marker layers
  if (targetMap._emergencyLayerGroup) {
    targetMap.removeLayer(targetMap._emergencyLayerGroup);
  }
  const group = L.layerGroup().addTo(targetMap);
  targetMap._emergencyLayerGroup = group;

  // 1. Classic Google Maps Blue GPS Location Dot with Pulsing Halo
  const googleUserIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="position:relative; width:26px; height:26px; display:flex; align-items:center; justify-content:center;">
        <div style="position:absolute; width:26px; height:26px; border-radius:50%; background:rgba(26,115,232,0.3); animation:userPulse 1.8s infinite;"></div>
        <div style="width:16px; height:16px; border-radius:50%; background:#1a73e8; border:3px solid #ffffff; box-shadow:0 1px 6px rgba(0,0,0,0.45);"></div>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });

  const uMarker = L.marker([userLat, userLon], { icon: googleUserIcon })
    .bindPopup(`
      <div class="gmap-infowindow" style="min-width: 200px;">
        <div class="gmap-info-title" style="color:#1a73e8;">📍 Your Location</div>
        <div class="gmap-info-sub" style="margin-bottom:4px;">${escapeHtml(state.currentLocation.address)}</div>
        <div style="font-size:0.75rem; color:#5f6368;">GPS Accuracy: ±${state.currentLocation.accuracy} meters</div>
      </div>
    `)
    .addTo(group);

  // Google Maps light blue accuracy circle
  L.circle([userLat, userLon], {
    radius: Math.max(state.currentLocation.accuracy, 40),
    color: '#1a73e8',
    fillColor: '#1a73e8',
    fillOpacity: 0.12,
    weight: 1.5
  }).addTo(group);

  // 2. Google Maps Red Teardrop Pin with Medical Cross for Hospitals
  const googleHospIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.38)); cursor:pointer;">
        <svg width="34" height="44" viewBox="0 0 32 42" fill="none">
          <path d="M16 0C7.16 0 0 7.16 0 16c0 11.5 14.2 25.1 14.8 25.7.6.6 1.7.6 2.4 0C17.8 41.1 32 27.5 32 16 32 7.16 24.84 0 16 0z" fill="#ea4335"/>
          <circle cx="16" cy="16" r="10.5" fill="#ffffff"/>
          <path d="M14.5 10.5h3v3.5h3.5v3h-3.5v3.5h-3v-3.5H11v-3h3.5v-3.5z" fill="#ea4335"/>
        </svg>
      </div>
    `,
    iconSize: [34, 44],
    iconAnchor: [17, 44],
    popupAnchor: [0, -42]
  });

  const matchingHospitals = state.hospitals.filter(h => {
    if (!filterQuery) return true;
    return h.name.toLowerCase().includes(filterQuery) || 
           h.address.toLowerCase().includes(filterQuery) ||
           h.specialties.some(s => s.toLowerCase().includes(filterQuery));
  });

  matchingHospitals.forEach(h => {
    L.marker([h.coordinates.lat, h.coordinates.lon], { icon: googleHospIcon })
      .bindPopup(`
        <div class="gmap-infowindow">
          <div class="gmap-info-title">${escapeHtml(h.name)}</div>
          <div class="gmap-info-rating">
            <span class="gmap-stars">4.8 ★★★★★</span>
            <span>(2,410 Google Reviews)</span>
          </div>
          <div class="gmap-info-sub">
            <span>${escapeHtml(h.address)}</span> • <span style="color:#188038; font-weight:700;">Open 24 hours</span>
          </div>
          <div class="gmap-info-beds">
            <div><span style="color:#5f6368;">ICU:</span> <strong style="color:#188038;">${h.icuBeds} Beds</strong></div>
            <div><span style="color:#5f6368;">Oxygen:</span> <strong style="color:#e37400;">${h.oxygenBeds} Beds</strong></div>
            <div><span style="color:#5f6368;">Distance:</span> <strong style="color:#1a73e8;">${h.distanceText}</strong></div>
          </div>
          <div class="gmap-info-actions">
            <button class="btn-gmap-reserve" onclick="openBedReserveModal('${h.id}')">Reserve Bed</button>
            <button class="btn-gmap-call" onclick="triggerErCall('${h.phone}')">Call ER</button>
          </div>
        </div>
      `)
      .addTo(group);
  });

  // 3. Google Maps Ambulance Unit Pins
  const googleAmbIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)); cursor:pointer;">
        <svg width="34" height="44" viewBox="0 0 32 42" fill="none">
          <path d="M16 0C7.16 0 0 7.16 0 16c0 11.5 14.2 25.1 14.8 25.7.6.6 1.7.6 2.4 0C17.8 41.1 32 27.5 32 16 32 7.16 24.84 0 16 0z" fill="#1a73e8"/>
          <circle cx="16" cy="16" r="10" fill="#ffffff"/>
          <text x="16" y="20.5" font-size="12" text-anchor="middle">🚑</text>
        </svg>
      </div>
    `,
    iconSize: [34, 44],
    iconAnchor: [17, 44],
    popupAnchor: [0, -42]
  });

  state.ambulances.forEach((amb, idx) => {
    const offsetLat = userLat + (idx === 0 ? 0.006 : idx === 1 ? -0.009 : 0.012);
    const offsetLon = userLon + (idx === 0 ? -0.005 : idx === 1 ? 0.008 : 0.006);

    L.marker([offsetLat, offsetLon], { icon: googleAmbIcon })
      .bindPopup(`
        <div class="gmap-infowindow" style="min-width: 200px;">
          <div class="gmap-info-title" style="color:#1a73e8;">${escapeHtml(amb.id)} (${amb.type})</div>
          <div class="gmap-info-sub">Driver: <strong>${escapeHtml(amb.driver)}</strong></div>
          <div style="display:flex; justify-content:space-between; margin-top:6px; font-size:0.78rem;">
            <span>ETA to you: <strong style="color:#1a73e8;">${amb.etaMins} mins</strong></span>
            <span style="color:#188038; font-weight:700;">● Active</span>
          </div>
        </div>
      `)
      .addTo(group);

    // Google Maps Navigation Polyline (Google Maps Solid Blue Navigation Route)
    if (idx === 0) {
      // Outer border line for Google Navigation style
      L.polyline([[offsetLat, offsetLon], [userLat, userLon]], {
        color: '#1557b0',
        weight: 6,
        opacity: 0.95
      }).addTo(group);

      // Inner Google Blue line
      L.polyline([[offsetLat, offsetLon], [userLat, userLon]], {
        color: '#4285f4',
        weight: 4,
        opacity: 1.0
      }).addTo(group);
    }
  });

  if (isModal) {
    uMarker.openPopup();
  }
}

function updateMapHud() {
  const coordsEl = document.getElementById('hud-coords');
  const addrEl = document.getElementById('hud-address');
  const erEl = document.getElementById('hud-nearest-er');

  if (coordsEl) coordsEl.innerText = `${state.currentLocation.lat.toFixed(4)}° N, ${state.currentLocation.lon.toFixed(4)}° E (±${state.currentLocation.accuracy}m)`;
  if (addrEl) addrEl.innerText = state.currentLocation.address;

  const nearest = [...state.hospitals].sort((a,b) => a.distanceKm - b.distanceKm)[0];
  if (erEl && nearest) erEl.innerText = `${nearest.name} (${nearest.distanceText})`;
}

function centerMapOnUser() {
  if (fullLiveMap) {
    fullLiveMap.setView([state.currentLocation.lat, state.currentLocation.lon], 15);
    fullLiveMap.invalidateSize();
  }
}

function centerStep2Map() {
  if (step2LiveMap) {
    step2LiveMap.setView([state.currentLocation.lat, state.currentLocation.lon], 15);
    step2LiveMap.invalidateSize();
  }
}

function simulateGpsLock() {
  fetchLiveLocation();
}

function simulateChecks() {
  const chkBeds = document.getElementById('chk-beds');
  const chkDocs = document.getElementById('chk-docs');
  const chkBlood = document.getElementById('chk-blood');
  const chkAmb = document.getElementById('chk-amb');
  const banner = document.getElementById('recommended-hospital-banner');

  // Find best hospital by score with live distances
  const best = [...state.hospitals].sort((a, b) => {
    const scoreA = (30 / Math.max(a.distanceKm, 0.5)) + (2 * a.icuBeds) + (1.5 * a.doctorsOnDuty);
    const scoreB = (30 / Math.max(b.distanceKm, 0.5)) + (2 * b.icuBeds) + (1.5 * b.doctorsOnDuty);
    return scoreB - scoreA;
  })[0];

  const hospNameEl = document.getElementById('match-hospital-name');
  const hospDetailsEl = document.getElementById('match-hospital-details');

  if (hospNameEl && best) {
    hospNameEl.innerText = best.name;
    hospDetailsEl.innerText = `${best.distanceText} • ${best.traumaLevel} • ${best.icuBeds} ICU Beds Ready`;
  }
}

function simulateEtaProgress() {
  const bar = document.getElementById('eta-progress-bar');
  if (bar) {
    bar.style.width = '20%';
    setTimeout(() => { bar.style.width = '55%'; }, 600);
    setTimeout(() => { bar.style.width = '85%'; }, 1200);
  }
}

function updateFamilyMessage() {
  const patientName = document.getElementById('patient-name-input')?.value || 'Rahul Verma';
  const familyPhone = document.getElementById('family-phone-input')?.value || '+91 98101 23456';
  const smsBody = document.getElementById('family-sms-text');

  if (smsBody) {
    smsBody.innerText = `[JeevanSetu Emergency Alert]: ${patientName} triggered emergency SOS at ${state.currentLocation.address} (${state.currentLocation.lat.toFixed(4)}°N, ${state.currentLocation.lon.toFixed(4)}°E). Nearest ALS Ambulance (DL-01-EA-4029) assigned. Emergency Bed reserved. Track live: https://jeevansetu.gov.in/track/JS-9041`;
  }
}

// ==================== BED RESERVATION MODAL ====================
function openBedReserveModal(hospitalId) {
  state.selectedHospitalForReserve = hospitalId;
  const hospital = state.hospitals.find(h => h.id === hospitalId);
  if (!hospital) return;

  const modal = document.getElementById('bed-reserve-modal');
  const nameEl = document.getElementById('reserve-modal-hospital-name');
  const subEl = document.getElementById('reserve-modal-subtitle');

  if (nameEl) nameEl.innerText = `Reserve Emergency Bed at ${hospital.name}`;
  if (subEl) subEl.innerText = `Available: ${hospital.icuBeds} ICU Beds, ${hospital.oxygenBeds} Oxygen Beds. Location: ${hospital.address} (${hospital.distanceText})`;
  if (modal) modal.classList.add('open');
}

function closeBedReserveModal() {
  const modal = document.getElementById('bed-reserve-modal');
  if (modal) modal.classList.remove('open');
}

function confirmBedReservation() {
  const hospital = state.hospitals.find(h => h.id === state.selectedHospitalForReserve);
  const patientName = document.getElementById('reserve-patient-name')?.value || 'Emergency Patient';
  const bedType = document.getElementById('reserve-bed-type')?.value || 'icu';

  if (!hospital) return;

  if (bedType === 'icu' && hospital.icuBeds > 0) {
    hospital.icuBeds--;
  } else if (bedType === 'oxygen' && hospital.oxygenBeds > 0) {
    hospital.oxygenBeds--;
  } else if (hospital.generalBeds > 0) {
    hospital.generalBeds--;
  }

  closeBedReserveModal();
  renderHospitals();
  renderBedsTable();
  updateTotalBedCounts();

  showToast(`Bed successfully locked at ${hospital.name} for ${patientName}! Token #JS-BED-${Math.floor(1000 + Math.random() * 9000)} generated.`, 'success');
}

// ==================== UTILITY FUNCTIONS ====================
function triggerErCall(phoneNumber) {
  showToast(`Initiating emergency direct line to: ${phoneNumber}...`, 'info');
  window.location.href = `tel:${phoneNumber.replace(/\s+/g, '')}`;
}

function refreshUserLocation() {
  fetchLiveLocation();
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span style="font-weight: 700;">${type === 'danger' ? '🚨' : type === 'success' ? '✅' : 'ℹ️'}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
