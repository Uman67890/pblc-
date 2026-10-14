
#include <iostream>
#include <limits>

#include "jeevansetu/JeevanSetuEngine.h"
using namespace std;

int main() {
    JeevanSetuEngine engine;
    int choice = 0;

    while (true) {
        cout
            << "\n======================================================\n"
            << "       JEEVANSETU - EMERGENCY COORDINATION SYSTEM\n"
            << "======================================================\n"
            << "1. [SOS] Trigger Emergency SOS\n"
            << "2. Open Admin Dashboard\n"
            << "3. Exit System\n"
            << "Select Option: ";

        if (!(cin >> choice)) {
            if (cin.eof()) {
                break;
            }

            cin.clear();
            cin.ignore(
                numeric_limits<streamsize>::max(),
                '\n'
            );

            cout << "Invalid input. Enter a number.\n";
            continue;
        }

        switch (choice) {
            case 1:
                engine.triggerEmergencySOS();
                break;

            case 2:
                engine.viewAdminDashboard();
                break;

            case 3:
                cout << "Exiting JeevanSetu...\n";
                return 0;

            default:
                cout << "Invalid selection.\n";
        }
    }

    return 0;
}
