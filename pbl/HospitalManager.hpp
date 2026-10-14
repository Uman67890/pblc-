#ifndef HOSPITAL_MANAGER_HPP
#define HOSPITAL_MANAGER_HPP

#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <cmath>
#include <iomanip>

struct Coordinates {
    double latitude;
    double longitude;

    // Haversine formula to compute great-circle distance in kilometers
    double distanceTo(const Coordinates& other) const {
        const double R = 6371.0; // Earth radius in km
        double dLat = (other.latitude - latitude) * M_PI / 180.0;
        double dLon = (other.longitude - longitude) * M_PI / 180.0;

        double a = std::sin(dLat / 2.0) * std::sin(dLat / 2.0) +
                   std::cos(latitude * M_PI / 180.0) * std::cos(other.latitude * M_PI / 180.0) *
                   std::sin(dLon / 2.0) * std::sin(dLon / 2.0);

        double c = 2.0 * std::atan2(std::sqrt(a), std::sqrt(1.0 - a));
        return R * c;
    }
};

class Hospital {
public:
    std::string id;
    std::string name;
    std::string address;
    Coordinates coords;
    
    int icuBeds;
    int oxygenBeds;
    int generalBeds;
    int doctorsOnDuty;
    std::string traumaLevel; // "Level-1 Trauma", "Cardiac Specialty", etc.
    std::vector<std::string> specialties;
    std::unordered_map<std::string, int> bloodUnits;
    std::string erContactPhone;

    Hospital(std::string id, std::string name, std::string address, 
             double lat, double lon, int icu, int oxy, int gen, 
             int docs, std::string trauma, std::string phone)
        : id(std::move(id)), name(std::move(name)), address(std::move(address)),
          coords{lat, lon}, icuBeds(icu), oxygenBeds(oxy), generalBeds(gen),
          doctorsOnDuty(docs), traumaLevel(std::move(trauma)), erContactPhone(std::move(phone)) {}

    void addSpecialty(const std::string& spec) {
        specialties.push_back(spec);
    }

    void setBloodUnits(const std::string& group, int units) {
        bloodUnits[group] = units;
    }

    int getBloodUnits(const std::string& group) const {
        auto it = bloodUnits.find(group);
        return (it != bloodUnits.end()) ? it->second : 0;
    }

    bool reserveBed(const std::string& bedType) {
        if (bedType == "ICU" && icuBeds > 0) {
            --icuBeds;
            return true;
        } else if (bedType == "OXYGEN" && oxygenBeds > 0) {
            --oxygenBeds;
            return true;
        } else if (generalBeds > 0) {
            --generalBeds;
            return true;
        }
        return false;
    }

    void releaseBed(const std::string& bedType) {
        if (bedType == "ICU") ++icuBeds;
        else if (bedType == "OXYGEN") ++oxygenBeds;
        else ++generalBeds;
    }

    void displayCard() const {
        std::cout << "\n+-------------------------------------------------------------+\n";
        std::cout << "| Hospital: " << std::left << std::setw(49) << name << " |\n";
        std::cout << "| Address:  " << std::left << std::setw(49) << address << " |\n";
        std::cout << "| ER Phone: " << std::left << std::setw(49) << erContactPhone << " |\n";
        std::cout << "+-------------------------------------------------------------+\n";
        std::cout << "| Bed Availability:                                           |\n";
        std::cout << "|   [ " << std::setw(2) << icuBeds << " ] ICU BEDS     [ " 
                  << std::setw(2) << oxygenBeds << " ] OXYGEN BEDS     [ " 
                  << std::setw(3) << generalBeds << " ] GENERAL     |\n";
        std::cout << "| On-Duty ER Doctors: " << std::setw(2) << doctorsOnDuty 
                  << "  | Trauma Level: " << std::left << std::setw(22) << traumaLevel << " |\n";
        std::cout << "+-------------------------------------------------------------+\n";
    }
};

#endif // HOSPITAL_MANAGER_HPP
