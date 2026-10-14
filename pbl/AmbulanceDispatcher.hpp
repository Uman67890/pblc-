#ifndef AMBULANCE_DISPATCHER_HPP
#define AMBULANCE_DISPATCHER_HPP

#include <iostream>
#include <string>
#include <vector>
#include "HospitalManager.hpp"

enum class AmbulanceType {
    ALS, // Advanced Life Support (Ventilator, Defibrillator)
    BLS  // Basic Life Support (Oxygen, AED, Stretcher)
};

enum class AmbulanceStatus {
    AVAILABLE,
    DISPATCHED,
    EN_ROUTE,
    AT_HOSPITAL
};

class Ambulance {
public:
    std::string registrationNumber;
    std::string driverName;
    std::string driverPhone;
    AmbulanceType type;
    Coordinates currentCoords;
    AmbulanceStatus status;
    std::vector<std::string> equipment;
    std::string assignedHospitalId;

    Ambulance(std::string reg, std::string driver, std::string phone, 
              AmbulanceType t, double lat, double lon)
        : registrationNumber(std::move(reg)), driverName(std::move(driver)),
          driverPhone(std::move(phone)), type(t), currentCoords{lat, lon},
          status(AmbulanceStatus::AVAILABLE) {
        if (t == AmbulanceType::ALS) {
            equipment = {"Mechanical Ventilator", "Multipara Monitor", "Defibrillator", "Oxygen Support", "Infusion Pump"};
        } else {
            equipment = {"Oxygen Cylinder", "Automated External Defibrillator (AED)", "Spine Board", "Suction Unit"};
        }
    }

    double calculateEtaMinutes(const Coordinates& patientLoc) const {
        double distKm = currentCoords.distanceTo(patientLoc);
        // Assuming average urban emergency response speed of 40 km/h with traffic priority
        double timeHours = distKm / 40.0;
        return timeHours * 60.0; // Minutes
    }

    void dispatch(const std::string& hospitalId) {
        status = AmbulanceStatus::DISPATCHED;
        assignedHospitalId = hospitalId;
    }

    void reset() {
        status = AmbulanceStatus::AVAILABLE;
        assignedHospitalId = "";
    }
};

#endif // AMBULANCE_DISPATCHER_HPP
