#!/bin/bash
set -e
echo
echo 'CREATE - SIGN - INSTALL APK FOR ANDROID'

# Comment
echo
echo 'Building application for Android (with prod and release flags)...'
ionic cordova build android --prod --release

# Comment
echo 
echo 'Signing the .apk...'
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./devtools/selfsigned.jks /Users/jlgi/Workspace/poc-shopping-list/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ionic-android-app

# Comment
echo
echo 'Checking if exists a previous build...' 
if [ -e ShoppingList.apk ] 
then
    echo 'Found! Removing previous build...'
    rm ShoppingList.apk
else
    echo 'Not found! Skipping...'
fi

# Comment
echo 
echo 'Generating zipaligned...'
~/Library/Android/sdk/build-tools/27.0.3/zipalign -v 4 /Users/jlgi/Workspace/poc-shopping-list/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ShoppingList.apk

# Comment
echo 
echo 'Verifying apk...'
~/Library/Android/sdk/build-tools/27.0.3/apksigner verify ShoppingList.apk

# Comment
echo 
echo 'Installing on the device...'
adb -d install ShoppingList.apk
