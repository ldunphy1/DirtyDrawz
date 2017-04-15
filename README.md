# DirtyDrawz

### usage on Android:
1. Follow the instructions to install react native on your system: https://facebook.github.io/react-native/docs/getting-started.html
2. Clone or download this repository
3. Open terminal in the directory of the project
4. run 'npm install'
5. To run on android device or emulator:
   * make sure device is connected or emulator is running
   * to install application on device, run react-native run-android
   * once application is installed, run react-native start, then open or reload application on device
  

### usage on iOS:
1. Follow the instruction to install react native on your system: https://facebook.github.io/react-native/docs/getting-started.html
2. Clone or download this repository
3. Open terminal in the directory of the project
4. run 'npm install'
5. To run on iOS device or emulator:
   * first update the index.ios.js file in your root project directory to match the index.android.js file
   * make sure all the dependencies listed in the dependencies.json file have been downloaded and their version match
   * to download the desired dependences use the npm install --save command with each dependency name.
   * Run the code in xCode by opening up the project within XCode and then hitting the CMD+R keys.
   * This should open up an iOS emulator with the application
   * (Note: When we ran this app on a MacBook Pro we ran into the issue that our styling was off and some of the dependencies we    (downloaded failed to work. This may not be a general issue.) 

### after you get in there...
As this App using Firebase, you should have your own Firebase project before build the App. Instructions are:
  * Create Firebase project in this link: https://firebase.google.com/?utm_source=google&utm_medium=cpc&utm_campaign=1001467%20%7C%20Firebase*%20Brand%20GENERIC%20%7C%20US%20%7C%20en%20%7C%20Desk%2BTab%2BMobile%20%7C%20Text%20%7C%20BKWS%20%5B2017%5D&utm_term=%7Bkeyword%7D&gclid=Cj0KEQjwicfHBRCh6KaMp4-asKgBEiQA8GH2x7kT3eJecI6sxaO75QMNsIcM5xO3QBSLp_V4u6RI3NoaAgYh8P8HAQ
  * Find your Firebase variable in your project and use them to update the .env-SAMPLE file in the main folder.
  * Change the name ".env-SAMPLE" into ".env".
  * Play around!
