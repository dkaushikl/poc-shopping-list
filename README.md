# poc-shopping-list
A PoC for shared shopping lists implemented in a serverless platform

## Commands
- ionic cordova build android --prod --release
- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore selfsigned.jks /Users/jlgi/Workspace/poc-shopping-list/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ionic-android-app
- ~/Library/Android/sdk/build-tools/27.0.3/zipalign -v 4 /Users/jlgi/Workspace/poc-shopping-list/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ShoppingList.apk
- ~/Library/Android/sdk/build-tools/27.0.3/apksigner verify ShoppingList.apk
- adb -d install ShoppingList.apk