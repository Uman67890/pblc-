
#ifndef JEEVANSETU_HOSPITAL_H
#define JEEVANSETU_HOSPITAL_H

#include <string>
#include <map>
using namespace std;

class BloodBank {
private:
    map<string, int> units;

public:
    BloodBank();

    bool hasUnits(
        const string& type,
        int requested
    ) const;

    void displayBloodStock() const;
};

class Hospital {
private:
    int id;
    string name;

    double latitude;
    double longitude;

    int emergencyBeds;
    int icuBeds;

    bool doctorAvailable;
    double rating;

    BloodBank bloodBank;

public:
    Hospital(
        int id,
        string name,
        double lat,
        double lon,
        int emBeds,
        int icu,
        bool docAvail,
        double rating
    );

    int getId() const;
    string getName() const;

    double getLat() const;
    double getLon() const;

    int getEmergencyBeds() const;
    int getIcuBeds() const;

    bool isDoctorAvailable() const;
    double getRating() const;

    BloodBank& getBloodBank();

    bool reserveEmergencyBed();
    bool reserveIcuBed();

    void releaseEmergencyBed();
    void releaseIcuBed();

    void displayStatus(
        double patientLat,
        double patientLon
    ) const;
};

#endif
