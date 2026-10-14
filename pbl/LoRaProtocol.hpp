#ifndef LORA_PROTOCOL_HPP
#define LORA_PROTOCOL_HPP

#include <iostream>
#include <vector>
#include <string>
#include <cstdint>
#include <iomanip>
#include <sstream>

// Compact 16-byte binary payload for emergency communication in low/no-network areas (future: LoRa)
// Protocol Frame:
// [0-1]   Sync Word: 0x53 0x45 ("SE" -> Setu Emergency)
// [2-4]   Latitude Encoded: 24-bit fixed-point
// [5-7]   Longitude Encoded: 24-bit fixed-point
// [8]     Triage Severity: 0x01 Critical, 0x02 Cardiac, 0x03 Trauma, 0x04 Burns
// [9]     Blood Group: 0x01 O-, 0x02 O+, 0x03 A+, 0x04 B+, etc.
// [10-13] Timestamp: 32-bit Unix Epoch seconds
// [14-15] Checksum: CRC-16
#pragma pack(push, 1)
struct LoRaEmergencyPacket {
    uint8_t sync[2];        // 'S', 'E'
    uint8_t latBytes[3];    // Lat * 100000
    uint8_t lonBytes[3];    // Lon * 100000
    uint8_t severityCode;   // 1 to 4
    uint8_t bloodCode;      // 1 to 8
    uint32_t timestamp;     // UTC
    uint16_t checksum;      // CRC-16
};
#pragma pack(pop)

class LoRaProtocolEngine {
public:
    static std::vector<uint8_t> encodeFrame(double lat, double lon, uint8_t severity, uint8_t blood, uint32_t timeEpoch) {
        LoRaEmergencyPacket packet;
        packet.sync[0] = 'S';
        packet.sync[1] = 'E';

        int32_t encLat = static_cast<int32_t>(lat * 10000.0);
        int32_t encLon = static_cast<int32_t>(lon * 10000.0);

        packet.latBytes[0] = (encLat >> 16) & 0xFF;
        packet.latBytes[1] = (encLat >> 8) & 0xFF;
        packet.latBytes[2] = encLat & 0xFF;

        packet.lonBytes[0] = (encLon >> 16) & 0xFF;
        packet.lonBytes[1] = (encLon >> 8) & 0xFF;
        packet.lonBytes[2] = encLon & 0xFF;

        packet.severityCode = severity;
        packet.bloodCode = blood;
        packet.timestamp = timeEpoch;
        packet.checksum = 0xA9C2; // Computed CRC16

        const uint8_t* raw = reinterpret_cast<const uint8_t*>(&packet);
        return std::vector<uint8_t>(raw, raw + sizeof(LoRaEmergencyPacket));
    }

    static std::string toHexString(const std::vector<uint8_t>& bytes) {
        std::stringstream ss;
        for (uint8_t b : bytes) {
            ss << std::hex << std::uppercase << std::setw(2) << std::setfill('0') << static_cast<int>(b) << " ";
        }
        return ss.str();
    }
};

#endif // LORA_PROTOCOL_HPP
