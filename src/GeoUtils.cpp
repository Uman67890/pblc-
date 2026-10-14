
#include "jeevansetu/GeoUtils.h"
#include <cmath>
using namespace std;

double calculateDistance(
    double lat1,
    double lon1,
    double lat2,
    double lon2
) {
    double dLat = lat2 - lat1;
    double dLon = lon2 - lon1;

    return sqrt(dLat * dLat + dLon * dLon) * 111.0;
}
