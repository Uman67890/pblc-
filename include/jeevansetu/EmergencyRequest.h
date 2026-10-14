
#ifndef JEEVANSETU_EMERGENCY_REQUEST_H
#define JEEVANSETU_EMERGENCY_REQUEST_H

#include <string>
#include "Models.h"
using namespace std;

struct EmergencyRequest {
    int requestId;
    string patientName;
    int age;
    string bloodGroup;

    GPSLocation liveLocation;

    int chosenHospitalId;
    int assignedAmbulanceId;

    string emergencyType;
    string status;

    EmergencyRequest(
        int id,
        string pName,
        int pAge,
        string bGroup,
        double lat,
        double lon,
        string eType
    )
        : requestId(id),
          patientName(pName),
          age(pAge),
          bloodGroup(bGroup),
          chosenHospitalId(-1),
          assignedAmbulanceId(-1),
          emergencyType(eType),
          status("PENDING")
    {
        liveLocation.latitude = lat;
        liveLocation.longitude = lon;
        liveLocation.timestamp = "JUST NOW";
    }
};

#endif
