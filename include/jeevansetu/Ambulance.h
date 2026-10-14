
#ifndef JEEVANSETU_AMBULANCE_H
#define JEEVANSETU_AMBULANCE_H

#include <string>
#include "Models.h"
using namespace std;

// Interface for live location updates
class LocationObserver {
public:
    virtual void onLocationUpdated(
        int requestId,
        GPSLocation loc
    ) = 0;

    virtual ~LocationObserver() = default;
};

// Ambulance model
class Ambulance : public LocationObserver {
private:
    int id;
    string driverName;
    string phone;

    double latitude;
    double longitude;

    bool isBusy;

public:
    Ambulance(
        int id,
        string name,
        string phone,
        double lat,
        double lon
    );

    int getId() const;
    string getDriverName() const;
    string getPhone() const;

    double getLat() const;
    double getLon() const;

    bool getIsBusy() const;

    void setBusy(bool state);

    void onLocationUpdated(
        int requestId,
        GPSLocation loc
    ) override;
};

#endif
