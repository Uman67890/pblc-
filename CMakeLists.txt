
cmake_minimum_required(VERSION 3.16)

project(JeevanSetu LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_executable(JeevanSetu
    src/main.cpp
    src/GeoUtils.cpp
    src/Hospital.cpp
    src/Ambulance.cpp
    src/NotificationService.cpp
    src/LiveLocationTracker.cpp
    src/JeevanSetuEngine.cpp
)

target_include_directories(JeevanSetu
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)
