# JeevanSetu – Smart Emergency Medical Coordination System (PBL Project)

An intelligent emergency medical bridge that eliminates delays during the **Golden Hour** by interconnecting patients, nearest ambulances, and trauma hospitals.

---

## 📌 Problem Statement (As defined in Project Specification)
- **Delay in ambulance arrival** due to unoptimized manual dispatch.
- **No real-time information** about nearby hospital bed and ICU availability.
- **Critical time wasted** searching for the right hospital with specialized facilities (Level-1 Trauma, Cardiac Cath Lab, Burns Unit).
- **Poor coordination** between patient, ambulance paramedic, and receiving emergency room.
- **The Golden Hour is often lost**, resulting in preventable fatalities.

---

## 🎯 Objectives
1. **Automatic Location Detection**: Accurately resolves GPS coordinates of the accident scene.
2. **Smart Hospital Recommendation**: Evaluates nearby hospitals using a multi-criteria algorithm.
3. **Live Emergency & ICU Bed Booking**: Atomically reserves ICU/Oxygen beds before ambulance arrival to prevent hospital refusal.
4. **Nearest Ambulance Assignment**: Automatically dispatches the closest ALS/BLS unit.
5. **Real-time Blood Bank Availability**: Instant check for universal (O-) and compatible blood units.
6. **Family Notifications**: Sends automated SMS & WhatsApp tracking links.
7. **Communication in Low-Network Areas (LoRa)**: Generates 16-byte telemetry packets for remote highways with no 4G/5G coverage.

---

## 🔄 Emergency Coordination Lifecycle Flow
```
Accident Happens
      │
      ▼
User presses Emergency SOS
      │
      ▼
Patient location detected (GPS)
      │
      ▼
System searches nearby hospitals
      │
      ▼
Checks:
  ✔ Emergency Beds
  ✔ ICU Beds
  ✔ Doctors Available
  ✔ Blood Availability
  ✔ Ambulance Availability
      │
      ▼
Ranks hospitals automatically (C++ Priority Queue)
      │
      ▼
Assigns nearest ambulance (ALS / BLS)
      │
      ▼
Reserves bed (Digital Emergency Token)
      │
      ▼
Sends patient details to hospital ER
      │
      ▼
Family receives live updates (SMS / WhatsApp)
```

---

## 💻 C++ Architecture & Data Structures
The C++ core in `pbl/` contains:
- **`HospitalManager.hpp`**: OOP models for Hospitals, Haversine Great-Circle distance formula, Bed inventory (atomic lock/release).
- **`AmbulanceDispatcher.hpp`**: Ambulance fleet tracking, Advanced Life Support (ALS) vs Basic Life Support (BLS), ETA calculation.
- **`SmartRanker.hpp`**: Multi-objective priority queue (Max-Heap) evaluating:
  $$\text{Score} = w_1 \cdot \frac{10}{\text{Distance}} + w_2 \cdot \text{ICU} + w_3 \cdot \text{Oxygen} + w_4 \cdot \text{Doctors} + w_5 \cdot \text{Blood} + \text{TraumaBonus}$$
- **`LoRaProtocol.hpp`**: Compact 16-byte packed binary frame serialization for low-bandwidth Sub-GHz emergency transmitters.
- **`main.cpp`**: Interactive demonstration program executing the entire sequence.

### How to Compile & Run C++:
```bash
# Using g++ (MinGW / GCC)
g++ -std=c++17 -O2 main.cpp -o jeevansetu.exe
./jeevansetu.exe

# Using MSVC (Visual Studio Developer Command Prompt)
cl /EHsc /std:c++17 main.cpp /Fe:jeevansetu.exe
jeevansetu.exe
```

---

## 🌐 Modern Web Interface (`website shiven/`)
The web application is located in `website shiven/`:
- **Dark Theme Medical Interface**: Exactly matching the provided design specs with glowing neon indicators, hospital cards, and live badges.
- **SOS Emergency Multi-step Flow**: Interactive 5-step modal executing the flow from Image 1 & 3.
- **Live Fleet Map & Radar**: Simulated GPS tracking of ambulances across Delhi NCR.
- **Admin Dashboard**: Live incoming emergency feed and bed inventory adjuster.
- **LoRa Hex Telemetry Inspector**: Interactive 16-byte packet generator.

### How to Run the Website:
1. Double-click `website shiven/index.html` to open directly in any browser.
2. Or run the zero-dependency local server:
   ```bash
   node server.js
   ```
   and visit `http://localhost:3000`.
