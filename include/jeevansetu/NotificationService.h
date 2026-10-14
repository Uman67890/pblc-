
#ifndef JEEVANSETU_NOTIFICATION_SERVICE_H
#define JEEVANSETU_NOTIFICATION_SERVICE_H

#include <string>
using namespace std;

// Abstract base class
class NotificationService {
public:
    virtual void sendAlert(
        const string& recipient,
        const string& message
    ) = 0;

    virtual ~NotificationService() = default;
};

// SMS notification service
class SMSNotificationService : public NotificationService {
public:
    void sendAlert(
        const string& recipient,
        const string& message
    ) override;
};

// LoRa mesh notification service
class LoRaMeshNotificationService : public NotificationService {
public:
    void sendAlert(
        const string& recipient,
        const string& message
    ) override;
};

#endif
