
#include "jeevansetu/JeevanSetuEngine.h"

#include <iostream>
#include <iomanip>
#include <thread>
#include <chrono>
#include <limits>
using namespace std;

// ==========================================
// 1. HOSPITAL COMPARATOR
// ==========================================

HospitalComparator::HospitalComparator(
    double lat,
    double lon,
    bool icu
)
    : patientLat(lat),
      patientLon(lon),
      requireICU(icu) {}

bool HospitalComparator::operator()(
    const shared_ptr<Hospital>& h1,
    const shared_ptr<Hospital>& h2
) const {

    double dist1 = calculateDistance(
        patientLat, patientLon,
        h1->getLat(), h1->getLon()
    );

    double dist2 = calculateDistance(
        patientLat, patientLon,
        h2->getLat(), h2->getLon()
    );

    double score1 =
        (dist1 * 0.5) - (h1->getRating() * 0.3);

    double score2 =
        (dist2 * 0.5) - (h2->getRating() * 0.3);

    if (requireICU) {
        if (h1->getIcuBeds() == 0)
            score1 += 100.0;

        if (h2->getIcuBeds() == 0)
            score2 += 100.0;
    } else {
        if (h1->getEmergencyBeds() == 0)
            score1 += 50.0;

        if (h2->getEmergencyBeds() == 0)
            score2 += 50.0;
    }

    // Lower score receives higher priority
    return score1 > score2;
}

// ==========================================
// 2. ENGINE CONSTRUCTOR
// ==========================================

JeevanSetuEngine::JeevanSetuEngine()
    : requestCounter(1000) {

    smsNotifier =
        make_unique<SMSNotificationService>();

    loraNotifier =
        make_unique<LoRaMeshNotificationService>();

    seedData();
}

// ==========================================
// 3. INITIALIZE SAMPLE DATA
// ==========================================

void JeevanSetuEngine::seedData() {

    hospitals.push_back(
        make_shared<Hospital>(
            1, "City Trauma Center",
            28.6139, 77.2090,
            5, 2, true, 4.8
        )
    );

    hospitals.push_back(
        make_shared<Hospital>(
            2, "Metro Super Specialty",
            28.5355, 77.3910,
            1, 0, true, 4.2
        )
    );

    hospitals.push_back(
        make_shared<Hospital>(
            3, "Apex Life Hospital",
            28.7041, 77.1025,
            0, 3, false, 3.9
        )
    );

    ambulances.push_back(
        make_shared<Ambulance>(
            101, "Rajesh Kumar",
            "+91 9876543210",
            28.6100, 77.2000
        )
    );

    ambulances.push_back(
        make_shared<Ambulance>(
            102, "Amit Singh",
            "+91 9876543211",
            28.5300, 77.3800
        )
    );
}

// ==========================================
// 4. RANK HOSPITALS USING PRIORITY QUEUE
// ==========================================

vector<shared_ptr<Hospital>>
JeevanSetuEngine::getRankedHospitals(
    double lat,
    double lon,
    bool reqICU
) {

    HospitalComparator comparator(lat, lon, reqICU);

    priority_queue<
        shared_ptr<Hospital>,
        vector<shared_ptr<Hospital>>,
        HospitalComparator
    > pq(comparator);

    for (const auto& hospital : hospitals) {
        pq.push(hospital);
    }

    vector<shared_ptr<Hospital>> ranked;

    while (!pq.empty()) {
        ranked.push_back(pq.top());
        pq.pop();
    }

    return ranked;
}

// ==========================================
// 5. ASSIGN NEAREST AVAILABLE AMBULANCE
// ==========================================

shared_ptr<Ambulance>
JeevanSetuEngine::assignNearestAmbulance(
    double lat,
    double lon
) {

    shared_ptr<Ambulance> nearest = nullptr;

    double minDistance =
        numeric_limits<double>::max();

    for (const auto& ambulance : ambulances) {

        if (!ambulance->getIsBusy()) {

            double distance = calculateDistance(
                lat, lon,
                ambulance->getLat(),
                ambulance->getLon()
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearest = ambulance;
            }
        }
    }

    if (nearest != nullptr) {
        nearest->setBusy(true);
    }

    return nearest;
}

// ==========================================
// 6. TRIGGER EMERGENCY SOS
// ==========================================

void JeevanSetuEngine::triggerEmergencySOS() {

    cout
        << "\n======================================================\n"
        << "            ONE-TAP EMERGENCY SOS ACTIVATED            \n"
        << "======================================================\n";

    string name;
    string bloodGroup;
    string emergencyType;
    string familyPhone;

    int age;
    char reqICUChoice;

    // Simulated initial GPS coordinates
    double lat = 28.6150;
    double lon = 77.2099;

    cin.ignore(
        numeric_limits<streamsize>::max(),
        '\n'
    );

    cout << "Enter Patient Name: ";
    getline(cin, name);

    cout << "Enter Patient Age: ";
    cin >> age;

    cout << "Enter Blood Group: ";
    cin >> bloodGroup;

    cout << "Enter Emergency Type: ";
    cin >> emergencyType;

    cout << "Require ICU Bed? (y/n): ";
    cin >> reqICUChoice;

    bool reqICU =
        (reqICUChoice == 'y' ||
         reqICUChoice == 'Y');

    cout << "Enter Emergency Contact Phone Number: ";
    cin >> familyPhone;

    cout
        << "\n[GPS SYSTEM] Initial Fix Acquired -> Lat: "
        << lat << ", Lon: " << lon << '\n';

    // Create emergency request
    int reqId = ++requestCounter;

    EmergencyRequest request(
        reqId, name, age, bloodGroup,
        lat, lon, emergencyType
    );

    // Rank hospitals
    auto rankedHospitals =
        getRankedHospitals(lat, lon, reqICU);

    // Select a hospital with the required bed
    shared_ptr<Hospital> selectedHospital = nullptr;

    for (const auto& hospital : rankedHospitals) {

        bool hasRequiredBed = reqICU
            ? hospital->getIcuBeds() > 0
            : hospital->getEmergencyBeds() > 0;

        if (hasRequiredBed) {
            selectedHospital = hospital;
            break;
        }
    }

    if (selectedHospital == nullptr) {

        request.status = "NO_HOSPITAL_BED_AVAILABLE";

        emergencyRegistry.emplace(reqId, request);

        cout
            << "\n[WARNING] No hospital has the required bed.\n"
            << "Emergency Request ID: " << reqId << '\n';

        return;
    }

    // Reserve the required bed
    bool bedReserved = reqICU
        ? selectedHospital->reserveIcuBed()
        : selectedHospital->reserveEmergencyBed();

    if (!bedReserved) {
        cout << "[ERROR] Bed reservation failed.\n";
        return;
    }

    request.chosenHospitalId =
        selectedHospital->getId();

    cout
        << "[HOSPITAL] Selected: "
        << selectedHospital->getName()
        << " | Hospital ID: "
        << selectedHospital->getId() << '\n';

    // Assign nearest available ambulance
    auto ambulance =
        assignNearestAmbulance(lat, lon);

    if (ambulance != nullptr) {

        request.assignedAmbulanceId =
            ambulance->getId();

        request.status = "AMBULANCE_DISPATCHED";

        cout
            << "[DISPATCH] Assigned Ambulance ID: "
            << ambulance->getId()
            << " | Driver: "
            << ambulance->getDriverName()
            << '\n';

    } else {

        request.status = "NO_AMBULANCE_AVAILABLE";

        cout
            << "[WARNING] No ambulance is available.\n";
    }

    // Store emergency in registry
    emergencyRegistry.emplace(reqId, request);

    // Generate tracking link
    string trackingLink =
        "https://jeevansetu.app/track/live?id="
        + to_string(reqId);

    string alertMessage =
        "EMERGENCY ALERT for " + name +
        ". Track location here: " + trackingLink;

    // Send simulated notifications
    smsNotifier->sendAlert(
        familyPhone, alertMessage
    );

    loraNotifier->sendAlert(
        "HOSPITAL_NODE_" +
        to_string(selectedHospital->getId()),
        alertMessage
    );

    // Start simulated live location tracking
    cout
        << "\n>>> STARTING LIVE ACCIDENT SITE STREAMING SERVICE <<<\n";

    LiveLocationTracker tracker;

    if (ambulance != nullptr) {
        tracker.addObserver(ambulance.get());
    }

    for (int i = 1; i <= 3; ++i) {

        this_thread::sleep_for(
            chrono::milliseconds(1200)
        );

        tracker.updateAndBroadcastLocation(
            reqId, lat, lon
        );

        // Update stored GPS coordinates
        auto& storedRequest = emergencyRegistry.at(reqId);

        storedRequest.liveLocation.latitude = lat;
        storedRequest.liveLocation.longitude = lon;
        storedRequest.liveLocation.timestamp = "LIVE_STREAM";
    }

    cout
        << "\n>>> LIVE LOCATION FEED ACTIVE. Emergency Response ["
        << reqId << "] En Route. <<<\n";
}

// ==========================================
// 7. ADMIN DASHBOARD
// ==========================================

void JeevanSetuEngine::viewAdminDashboard() {

    cout
        << "\n======================================================\n"
        << "            JEEVANSETU ADMIN DASHBOARD                \n"
        << "======================================================\n";

    if (emergencyRegistry.empty()) {
        cout << "No emergency requests registered.\n";
        return;
    }

    for (const auto& [id, request] : emergencyRegistry) {

        cout
            << "Request ID: " << id
            << " | Patient: " << request.patientName
            << "\n   Last Known Live GPS: [Lat: "
            << request.liveLocation.latitude
            << ", Lon: "
            << request.liveLocation.longitude
            << "]"
            << " | Status: "
            << request.status
            << "\n   Hospital ID: "
            << request.chosenHospitalId
            << " | Ambulance ID: "
            << request.assignedAmbulanceId
            << "\n\n";
    }
}
