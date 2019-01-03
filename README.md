# shopping-list
shopping list mobile app

This is a simple shopping list mobile application writen with ionic v4 beta.

Features:
- add items to shopping list
- remove items from shopping list
- clear shopping list
- add items favourites list
- remove from favourites list


Developer Notes:
- To test in browser:
    1. ionic serve
- To build and deploy to emulator:
    1. npm run emulator
- To create a release build:
    1. npm run release
    (the apk can be found in platforms/android/build/outputs/apk)
    2. Generate signign key using Android SDK (should be done once)
        keytool -genkey -v -keystore shopping-list-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
    3. Sign the apk:
         jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ..\..\shopping-list-release-key.keystore .\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk alias_name
    4. Optimise apk (add the path to zipalign to the enviroment variables):
        /path/to/Android/sdk/build-tools/VERSION/zipalign -v 4 .\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk ShoppingList.apk
