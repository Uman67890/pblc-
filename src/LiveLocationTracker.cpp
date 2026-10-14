
#include "jeevansetu/LiveLocationTracker.h"

#include <iostream>
using namespace std;

// Register an observer
void LiveLocationTracker::addObserver(
    LocationObserver* observer
) {
    if (observer != nullptr) {
        observers.push_back(observer);
    }
}

// Update and broadcast live location
void LiveLocationTracker::updateAndBroadcastLocation(
    int requestId,
    double& currentLat,
    double& currentLon
) {
    // Simulate a small GPS coordinate change
    currentLat += 0.0005;
    currentLon += 0.0005;

    GPSLocation updatedLoc{
        currentLat,
        currentLon,
        "LIVE_STREAM"
    };

    cout
        << "\n>>> [LIVE SOS BROADCAST] "
        << "Updating Accident Coordinates: Lat "
        << currentLat
        << ", Lon "
        << currentLon
        << " <<<\n";

    // Notify every registered observer
    for (LocationObserver* observer : observers) {
        if (observer != nullptr) {
            observer->onLocationUpdated(
                requestId,
                updatedLoc
            );
        }
    }
}
