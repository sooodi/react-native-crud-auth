if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated SHARED IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    IMPORTED_LOCATION "/Users/sudabework/jobAssignmenttttt/stdev/Reactnativecrud/my-react-app/node_modules/react-native-reanimated/android/build/intermediates/cxx/Debug/4h91z6z4/obj/x86_64/libreanimated.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/sudabework/jobAssignmenttttt/stdev/Reactnativecrud/my-react-app/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

