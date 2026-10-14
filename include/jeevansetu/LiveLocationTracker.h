
#ifndef JEEVANSETU_LIVE_LOCATION_TRACKER_H
#define JEEVANSETU_LIVE_LOCATION_TRACKER_H

#include <vector>

#include "Models.h"
#include "Ambulance.h"
using namespace std;

class LiveLocationTracker {
private:
    vector<LocationObserver*> observers;

public:
    // Register an observer
    void addObserver(LocationObserver* observer);

    // Broadcast updated patient coordinates
    void updateAndBroadcastLocation(
        int requestId,
        double& currentLat,
        double& currentLon
    );
};

#endif
