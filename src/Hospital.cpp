
#include "jeevansetu/Hospital.h"
#include "jeevansetu/GeoUtils.h"

#include <iostream>
#include <iomanip>
using namespace std;

// Initialize blood bank stock
BloodBank::BloodBank() {
    units["A+"] = 5;
    units["A-"] = 2;

    units["B+"] = 8;
    units["B-"] = 1;

    units["O+"] = 10;
    units["O-"] = 4;

    units["AB+"] = 3;
    units["AB-"] = 0;
}

// Check blood availability
bool BloodBank::hasUnits(
    const string& type,
    int requested
) const {
    auto it = units.find(type);

    return it != units.end()
        && requested >= 0
        && it->second >= requested;
}

// Display blood stock
void BloodBank::displayBloodStock() const {
    for (const auto& [type, count] : units) {
        cout << type << ": "
                  << count << " units | ";
    }

    cout << '\n';
}

// Hospital constructor
Hospital::Hospital(
    int id,
    string name,
    double lat,
    double lon,
    int emBeds,
    int icu,
    bool docAvail,
    double rating
)
    : id(id),
      name(name),
      latitude(lat),
      longitude(lon),
      emergencyBeds(emBeds),
      icuBeds(icu),
      doctorAvailable(docAvail),
      rating(rating) {}

// Getter functions
int Hospital::getId() const {
    return id;
}

string Hospital::getName() const {
    return name;
}

double Hospital::getLat() const {
    return latitude;
}

double Hospital::getLon() const {
    return longitude;
}

int Hospital::getEmergencyBeds() const {
    return emergencyBeds;
}

int Hospital::getIcuBeds() const {
    return icuBeds;
}

bool Hospital::isDoctorAvailable() const {
    return doctorAvailable;
}

double Hospital::getRating() const {
    return rating;
}

BloodBank& Hospital::getBloodBank() {
    return bloodBank;
}

// Reserve an emergency bed
bool Hospital::reserveEmergencyBed() {
    if (emergencyBeds > 0) {
        --emergencyBeds;
        return true;
    }

    return false;
}

// Reserve an ICU bed
bool Hospital::reserveIcuBed() {
    if (icuBeds > 0) {
        --icuBeds;
        return true;
    }

    return false;
}

// Release beds
void Hospital::releaseEmergencyBed() {
    ++emergencyBeds;
}

void Hospital::releaseIcuBed() {
    ++icuBeds;
}

// Display hospital information
void Hospital::displayStatus(
    double patientLat,
    double patientLon
) const {
    double distance = calculateDistance(
        patientLat,
        patientLon,
        latitude,
        longitude
    );

    cout << "[" << id << "] "
              << name
              << " | Distance: "
              << fixed
              << setprecision(2)
              << distance << " km\n";

    cout << "    Emergency Beds: "
              << emergencyBeds
              << " | ICU Beds: "
              << icuBeds
              << " | On-call Specialist: "
              << (doctorAvailable ? "YES" : "NO")
              << " | Rating: "
              << rating << "/5.0\n";
}
