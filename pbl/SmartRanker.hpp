#ifndef SMART_RANKER_HPP
#define SMART_RANKER_HPP

#include <iostream>
#include <vector>
#include <queue>
#include <memory>
#include <algorithm>
#include "HospitalManager.hpp"
#include "AmbulanceDispatcher.hpp"

struct RankedHospital {
    Hospital hospital;
    double distanceKm;
    double recommendationScore;
    double etaMinutes;

    // Operator for std::priority_queue (Max-Heap)
    bool operator<(const RankedHospital& other) const {
        return recommendationScore < other.recommendationScore;
    }
};

class SmartHospitalRanker {
public:
    // Optimization Weights (Tunable based on trauma criticality)
    double weightDistance = 3.5;    // Highest priority: reach nearest within golden hour
    double weightIcuBeds = 2.2;     // ICU beds availability guarantee
    double weightOxygenBeds = 1.0;  // Oxygen beds availability
    double weightDoctors = 1.8;     // Trauma surgeons on duty
    double weightBlood = 1.2;       // Matching emergency blood units

    std::vector<RankedHospital> rankHospitals(
        const std::vector<Hospital>& hospitalDirectory,
        const Coordinates& patientLocation,
        const std::string& requiredBloodGroup = "O-",
        bool requireLevel1Trauma = false) 
    {
        std::priority_queue<RankedHospital> maxHeap;

        for (const auto& hosp : hospitalDirectory) {
            double dist = hosp.coords.distanceTo(patientLocation);
            if (dist < 0.1) dist = 0.1; // Avoid divide-by-zero

            // 1. Distance score (Inverse distance: closer gives higher score)
            double distScore = (weightDistance * 10.0) / dist;

            // 2. Bed scores
            double icuScore = weightIcuBeds * hosp.icuBeds;
            double oxyScore = weightOxygenBeds * hosp.oxygenBeds;

            // 3. Specialist doctors score
            double docScore = weightDoctors * hosp.doctorsOnDuty;

            // 4. Blood units score
            double bloodScore = weightBlood * hosp.getBloodUnits(requiredBloodGroup);

            // 5. Trauma bonus
            double traumaBonus = 0.0;
            if (requireLevel1Trauma && hosp.traumaLevel.find("Level-1") != std::string::npos) {
                traumaBonus = 25.0;
            }

            double totalScore = distScore + icuScore + oxyScore + docScore + bloodScore + traumaBonus;
            double eta = (dist / 40.0) * 60.0;

            maxHeap.push(RankedHospital{hosp, dist, totalScore, eta});
        }

        // Extract ranked list
        std::vector<RankedHospital> rankedResults;
        while (!maxHeap.empty()) {
            rankedResults.push_back(maxHeap.top());
            maxHeap.pop();
        }

        return rankedResults;
    }

    Ambulance* findNearestAmbulance(
        std::vector<Ambulance>& fleet,
        const Coordinates& patientLocation,
        bool requireAls = true) 
    {
        Ambulance* bestUnit = nullptr;
        double minDistance = 1e9;

        for (auto& amb : fleet) {
            if (amb.status != AmbulanceStatus::AVAILABLE) continue;
            if (requireAls && amb.type != AmbulanceType::ALS) continue;

            double d = amb.currentCoords.distanceTo(patientLocation);
            if (d < minDistance) {
                minDistance = d;
                bestUnit = &amb;
            }
        }

        // Fallback to BLS if ALS is unavailable
        if (!bestUnit && requireAls) {
            for (auto& amb : fleet) {
                if (amb.status == AmbulanceStatus::AVAILABLE) {
                    double d = amb.currentCoords.distanceTo(patientLocation);
                    if (d < minDistance) {
                        minDistance = d;
                        bestUnit = &amb;
                    }
                }
            }
        }

        return bestUnit;
    }
};

#endif // SMART_RANKER_HPP
