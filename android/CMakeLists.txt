project(reactnativenitrowallpaper)
cmake_minimum_required(VERSION 3.13.0)

set(PACKAGE_NAME reactnativenitrowallpaper)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 20)

# Define C++ library and add all sources
add_library(${PACKAGE_NAME} SHARED src/main/cpp/cpp-adapter.cpp)

# Add Nitrogen specs :)
include(${CMAKE_SOURCE_DIR}/../nitrogen/generated/android/reactnativenitrowallpaper+autolinking.cmake)

# Set up local includes
include_directories("src/main/cpp" "../cpp")

find_library(LOG_LIB log)

# Link all libraries together
target_link_libraries(
        ${PACKAGE_NAME}
        ${LOG_LIB}
        android # <-- Android core
)

# Align ELF LOAD segments to 16 KB so the library loads on 16 KB page size devices
# (required by Google Play for apps targeting Android 15+). NDK r28+ does this by
# default; these flags make it hold for older NDKs an app may pin as well.
# See https://developer.android.com/guide/practices/page-sizes
target_link_options(
        ${PACKAGE_NAME}
        PRIVATE
        "-Wl,-z,max-page-size=16384"
        "-Wl,-z,common-page-size=16384"
)
