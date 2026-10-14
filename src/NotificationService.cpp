
#include "jeevansetu/NotificationService.h"

#include <iostream>
using namespace std;

// SMS notification implementation
void SMSNotificationService::sendAlert(
    const string& recipient,
    const string& message
) {
    cout
        << "[SMS NOTIFICATION] To: "
        << recipient
        << " | Message: "
        << message
        << '\n';
}

// LoRa mesh notification implementation
void LoRaMeshNotificationService::sendAlert(
    const string& recipient,
    const string& message
) {
    cout
        << "[LORA MESH ALERT] Encrypted Dispatch To node ["
        << recipient
        << "]: "
        << message
        << '\n';
}
