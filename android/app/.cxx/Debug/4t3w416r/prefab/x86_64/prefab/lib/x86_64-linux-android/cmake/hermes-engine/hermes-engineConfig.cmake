if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/sudabework/.gradle/caches/transforms-3/8bfb66e4cd5b409bfb36c2216f4fef4a/transformed/jetified-hermes-android-0.72.6-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/sudabework/.gradle/caches/transforms-3/8bfb66e4cd5b409bfb36c2216f4fef4a/transformed/jetified-hermes-android-0.72.6-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

