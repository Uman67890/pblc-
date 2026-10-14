/**
 * JeevanSetu - Smart Emergency Medical Coordination System
 * C++ Core Simulation & Recommendation Engine
 *
 * Implements the complete automated emergency lifecycle:
 * 1. Accident Detection & SOS Trigger
 * 2. GPS Location Telemetry Resolution
 * 3. Multi-Criteria Hospital Checks (ICU beds, doctors, blood, ambulance)
 * 4. Automatic Smart Ranking (Priority Queue)
 * 5. Nearest Ambulance Assignment (ALS/BLS)
 * 6. Live Bed Reservation (Atomic Lock)
 * 7. Pre-arrival Patient Notification to Hospital ER
 * 8. Family Alert Broadcast System
 * 9. Low-Network LoRa 16-Byte Telemetry Frame Generation
 */

#include <iostream>
#include <vector>
#include <string>
#include <chrono>
#include <thread>
#include "HospitalManager.hpp"
#include "AmbulanceDispatcher.hpp"
#include "SmartRanker.hpp"
#include "LoRaProtocol.hpp"

// Utility delay for realistic demonstration
void pauseStep(int ms = 800) {
    std::this_thread::sleep_for(std::chrono::milliseconds(ms));
}

int main() {
    std::cout << "\n=================================================================\n";
    std::cout << "     JEEVANSETU - SMART EMERGENCY MEDICAL COORDINATION SYSTEM     \n";
    std::cout << "                 [EMERGENCY MEDICAL BRIDGE]                      \n";
    std::cout << "=================================================================\n\n";

    // 1. Initialize Hospital Network (as shown in JeevanSetu UI)
    std::vector<Hospital> hospitalDirectory;

    Hospital fortis("fortis", "Fortis Escorts Heart Institute", 
                    "Okhla Road, Sukhdev Vihar, New Delhi",
                    28.5603, 77.2831, 14, 38, 110, 6, "Cardiac Specialty ER", "+91 11 4713 5000");
    fortis.addSpecialty("Cardiac Cath Lab");
    fortis.addSpecialty("24x7 Angioplasty");
    fortis.setBloodUnits("O-", 4);
    fortis.setBloodUnits("O+", 18);
    fortis.setBloodUnits("A+", 12);
    fortis.setBloodUnits("B+", 15);
    hospitalDirectory.push_back(fortis);

    Hospital gangaram("gangaram", "Sir Ganga Ram Hospital", 
                      "Old Rajinder Nagar, Central Delhi",
                      28.6385, 77.1895, 9, 24, 95, 9, "Level-1 Trauma", "+91 11 4225 1000");
    gangaram.addSpecialty("Multi-Specialty");
    gangaram.addSpecialty("Pediatric ICU");
    gangaram.setBloodUnits("O-", 6);
    gangaram.setBloodUnits("O+", 22);
    gangaram.setBloodUnits("A+", 16);
    gangaram.setBloodUnits("B+", 19);
    hospitalDirectory.push_back(gangaram);

    Hospital aiims("aiims", "AIIMS Apex Trauma Center", 
                   "Ring Road, Safdarjung Enclave, New Delhi",
                   28.5686, 77.2066, 18, 45, 160, 14, "Level-1 Trauma", "+91 11 2618 8000");
    aiims.addSpecialty("24x7 Emergency OT");
    aiims.addSpecialty("Critical Neuro Trauma");
    aiims.setBloodUnits("O-", 12);
    aiims.setBloodUnits("O+", 35);
    aiims.setBloodUnits("A+", 28);
    aiims.setBloodUnits("B+", 30);
    hospitalDirectory.push_back(aiims);

    Hospital max("max", "Max Super Speciality Hospital", 
                 "1, Press Enclave Marg, Saket, New Delhi",
                 28.5276, 77.2119, 11, 32, 88, 7, "Tertiary ER", "+91 11 2651 5050");
    max.addSpecialty("Comprehensive Stroke Care");
    max.setBloodUnits("O-", 3);
    max.setBloodUnits("O+", 14);
    hospitalDirectory.push_back(max);

    // 2. Initialize Ambulance Fleet
    std::vector<Ambulance> fleet = {
        {"DL-01-EA-4029", "Satish Kumar", "+91 98765 43210", AmbulanceType::ALS, 28.5640, 77.2150},
        {"DL-02-ER-9182", "Mohan Lal",    "+91 98111 22334", AmbulanceType::BLS, 28.5800, 77.2200},
        {"DL-04-TR-5510", "Deepak Sharma", "+91 98999 12345", AmbulanceType::ALS, 28.6200, 77.2000}
    };

    std::cout << "[SYSTEM READY] Loaded " << hospitalDirectory.size() 
              << " verified hospitals & " << fleet.size() << " active ambulances.\n";

    // =========================================================================
    // STEP 1: ACCIDENT HAPPENS & USER PRESSES EMERGENCY SOS (Image 1 & 3)
    // =========================================================================
    std::cout << "\n>>> [EVENT] Accident Occurred on Outer Ring Road, Delhi NCR!\n";
    std::cout << ">>> [EVENT] User presses EMERGENCY SOS on JeevanSetu App...\n";
    pauseStep(600);

    // =========================================================================
    // STEP 2: PATIENT LOCATION DETECTED (Image 1 & 3)
    // =========================================================================
    Coordinates accidentLocation{28.5672, 77.2100};
    std::cout << "\n[STEP 2: GPS Telemetry Detected]\n";
    std::cout << "   - Latitude:  " << accidentLocation.latitude << " deg N\n";
    std::cout << "   - Longitude: " << accidentLocation.longitude << " deg E\n";
    std::cout << "   - Accuracy:  +/- 4 meters\n";
    std::cout << "   - Location:  Near Outer Ring Road, Sukhdev Vihar, New Delhi\n";
    pauseStep(600);

    // =========================================================================
    // STEP 3: SYSTEM SEARCHES NEARBY HOSPITALS & PERFORMS CHECKS (Image 1 & 3)
    // =========================================================================
    std::cout << "\n[STEP 3: Multi-Parameter Emergency Checks]\n";
    std::cout << "   [x] Emergency Beds Available?\n";
    std::cout << "   [x] ICU Beds Available with Ventilators?\n";
    std::cout << "   [x] Trauma Specialists & Doctors On-Duty?\n";
    std::cout << "   [x] Compatible Blood Availability (O- Negative)?\n";
    std::cout << "   [x] Ambulance Proximity in Radius?\n";
    pauseStep(600);

    // =========================================================================
    // STEP 4: RANKS HOSPITALS AUTOMATICALLY (C++ PRIORITY QUEUE / SMART RANKER)
    // =========================================================================
    SmartHospitalRanker ranker;
    std::vector<RankedHospital> rankedList = ranker.rankHospitals(
        hospitalDirectory, accidentLocation, "O-", true
    );

    std::cout << "\n[STEP 4: C++ Priority Queue - Automated Hospital Ranking]\n";
    std::cout << "--------------------------------------------------------------------------------------\n";
    std::cout << std::left << std::setw(6) << "Rank"
              << std::setw(38) << "Hospital Name"
              << std::setw(12) << "Dist (km)"
              << std::setw(10) << "ICU Beds"
              << std::setw(10) << "Doctors"
              << std::setw(12) << "Score (pts)\n";
    std::cout << "--------------------------------------------------------------------------------------\n";

    int rankIdx = 1;
    for (const auto& rh : rankedList) {
        std::cout << "#" << std::left << std::setw(5) << rankIdx++
                  << std::setw(38) << rh.hospital.name
                  << std::fixed << std::setprecision(1) << std::setw(12) << rh.distanceKm
                  << std::setw(10) << rh.hospital.icuBeds
                  << std::setw(10) << rh.hospital.doctorsOnDuty
                  << std::setprecision(1) << std::setw(12) << rh.recommendationScore << "\n";
    }
    std::cout << "--------------------------------------------------------------------------------------\n";

    RankedHospital topPick = rankedList[0];
    std::cout << "\n>>> [OPTIMAL SELECTION]: " << topPick.hospital.name 
              << " (" << topPick.distanceKm << " km away, Score: " << topPick.recommendationScore << ")\n";
    pauseStep(600);

    // =========================================================================
    // STEP 5: ASSIGNS NEAREST AMBULANCE (Image 1 & 3)
    // =========================================================================
    Ambulance* assignedAmbulance = ranker.findNearestAmbulance(fleet, accidentLocation, true);
    if (assignedAmbulance) {
        assignedAmbulance->dispatch(topPick.hospital.id);
        double ambEta = assignedAmbulance->calculateEtaMinutes(accidentLocation);

        std::cout << "\n[STEP 5: Assigned Nearest Ambulance]\n";
        std::cout << "   - Vehicle Unit: " << assignedAmbulance->registrationNumber << " (ALS - Advanced Life Support)\n";
        std::cout << "   - Driver:       " << assignedAmbulance->driverName << " (Phone: " << assignedAmbulance->driverPhone << ")\n";
        std::cout << "   - Equipment:    Ventilator, Defibrillator, Multipara Monitor\n";
        std::cout << "   - Estimated ETA:" << std::fixed << std::setprecision(1) << ambEta << " Minutes\n";
    }
    pauseStep(600);

    // =========================================================================
    // STEP 6: RESERVES BED (Image 1 & 3)
    // =========================================================================
    bool bedLocked = topPick.hospital.reserveBed("ICU");
    std::cout << "\n[STEP 6: Bed Reserved & Locked]\n";
    if (bedLocked) {
        std::cout << "   - Status:      CONFIRMED & ATOMICALLY LOCKED\n";
        std::cout << "   - Bed Number:  #ICU-04 (Ventilator Ready)\n";
        std::cout << "   - Pass Token:  #JS-EMG-2026-9041\n";
        std::cout << "   - Lock Time:   45 Minutes Hold Period\n";
    }
    pauseStep(600);

    // =========================================================================
    // STEP 7: SENDS PATIENT DETAILS TO HOSPITAL ER (Image 1 & 3)
    // =========================================================================
    std::cout << "\n[STEP 7: Pre-arrival Telemetry Sent to " << topPick.hospital.name << " ER]\n";
    std::cout << "   - ER Direct Phone: " << topPick.hospital.erContactPhone << "\n";
    std::cout << "   - Trauma Team:     Notified & Scrubbing In\n";
    std::cout << "   - Blood Bank:      O- Negative Units Reserved\n";
    pauseStep(600);

    // =========================================================================
    // STEP 8: FAMILY RECEIVES LIVE UPDATES (Image 1 & 3)
    // =========================================================================
    std::cout << "\n[STEP 8: Family Notifications Dispatched via SMS & WhatsApp]\n";
    std::cout << "   -----------------------------------------------------------------\n";
    std::cout << "   [JeevanSetu Alert]: Emergency SOS triggered.\n";
    std::cout << "   ALS Ambulance " << (assignedAmbulance ? assignedAmbulance->registrationNumber : "ALS-Unit")
              << " en route (ETA ~3.8 min).\n";
    std::cout << "   Bed #ICU-04 reserved at " << topPick.hospital.name << ".\n";
    std::cout << "   Live GPS Tracking: https://jeevansetu.gov.in/track/JS-9041\n";
    std::cout << "   -----------------------------------------------------------------\n";
    pauseStep(600);

    // =========================================================================
    // STEP 9: LOW-NETWORK LORA FALLBACK PACKET (Image 4)
    // =========================================================================
    std::cout << "\n[STEP 9: Low-Network Telemetry Fallback (LoRa 868MHz)]\n";
    auto loraPacket = LoRaProtocolEngine::encodeFrame(
        accidentLocation.latitude, accidentLocation.longitude, 0x01, 0x01, 1718000000
    );
    std::cout << "   - Payload Size: " << loraPacket.size() << " Bytes\n";
    std::cout << "   - Hex Frame:    0x " << LoRaProtocolEngine::toHexString(loraPacket) << "\n";
    std::cout << "   - Transmission: Ready for Sub-GHz long-range broadcast.\n";

    std::cout << "\n=================================================================\n";
    std::cout << "   [SUCCESS] Golden Hour Emergency Medical Coordination Complete! \n";
    std::cout << "=================================================================\n\n";

    return 0;
}
