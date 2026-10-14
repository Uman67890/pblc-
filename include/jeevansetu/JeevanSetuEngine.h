
#ifndef JEEVANSETU_ENGINE_H
#define JEEVANSETU_ENGINE_H

#include <vector>
#include <unordered_map>
#include <memory>
#include <queue>
#include <limits>
#include <string>

#include "Hospital.h"
#include "Ambulance.h"
#include "EmergencyRequest.h"
#include "NotificationService.h"
#include "LiveLocationTracker.h"
#include "GeoUtils.h"
using namespace std;

// Ranks hospitals based on distance, rating and bed availability
struct HospitalComparator {
    double patientLat;
    double patientLon;
    bool requireICU;

    HospitalComparator(
        double lat,
        double lon,
        bool icu
    );

    bool operator()(
        const shared_ptr<Hospital>& h1,
        const shared_ptr<Hospital>& h2
    ) const;
};

// Main application engine
class JeevanSetuEngine {
private:
    vector<shared_ptr<Hospital>> hospitals;

    vector<shared_ptr<Ambulance>> ambulances;

    unordered_map<int, EmergencyRequest> emergencyRegistry;

    int requestCounter;

    unique_ptr<NotificationService> smsNotifier;
    unique_ptr<NotificationService> loraNotifier;

    void seedData();

public:
    JeevanSetuEngine();

    vector<shared_ptr<Hospital>> getRankedHospitals(
        double lat,
        double lon,
        bool reqICU
    );

    shared_ptr<Ambulance> assignNearestAmbulance(
        double lat,
        double lon
    );

    void triggerEmergencySOS();

    void viewAdminDashboard();
};

#endif
