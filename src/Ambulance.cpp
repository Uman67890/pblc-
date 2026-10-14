
#include "jeevansetu/Ambulance.h"
#include "jeevansetu/GeoUtils.h"

#include <iostream>
#include <iomanip>
using namespace std;

// Constructor
Ambulance::Ambulance(
    int id,
    string name,
    string phone,
    double lat,
    double lon
)
    : id(id),
      driverName(name),
      phone(phone),
      latitude(lat),
      longitude(lon),
      isBusy(false) {}

// Getter functions
int Ambulance::getId() const {
    return id;
}

string Ambulance::getDriverName() const {
    return driverName;
}

string Ambulance::getPhone() const {
    return phone;
}

double Ambulance::getLat() const {
    return latitude;
}

double Ambulance::getLon() const {
    return longitude;
}

bool Ambulance::getIsBusy() const {
    return isBusy;
}

// Update ambulance availability
void Ambulance::setBusy(bool state) {
    isBusy = state;
}

// Receive live patient location updates
void Ambulance::onLocationUpdated(
    int requestId,
    GPSLocation loc
) {
    double distance = calculateDistance(
        loc.latitude,
        loc.longitude,
        latitude,
        longitude
    );

    cout
        << "  [LIVE GPS AMBULANCE #" << id << "] "
        << "Navigation re-calculated to Patient "
        << "(Req #" << requestId << ")"
        << " -> Lat: " << loc.latitude
        << ", Lon: " << loc.longitude
        << " | Dist: "
        << fixed << setprecision(2)
        << distance << " km\n";
}
