![Gator Tour Logo](https://github.com/fianaVickers/Gator-Tours/blob/RestructureRepo/Tour/images/Logo.png)
# Gator Tours
Gator Tours is a mobile application that utilizes the University of Florida’s (UF) chat bot, Alli Gator, to provide useful information about UF’s campus through virtual tours. Gator Tour’s functionality bleeds into several different sectors, the hospitality, travel, and education industry. Due to an influx of people booking in-person tours hosted on the University of Florida’s campus, unfortunately, there are not enough tour guides to meet the demand. Gator Tours addresses this issue by giving people access to another tour option, where they receive the same information but with a different experience. 
The mobile application acts as a virtual tour guide, similar to other virtual tours hosted on Zoom such as GoWithGuide and World Virtual Tours. However, both GoWithGuide and World Virtual Tours utilize zoom to host tours, and due to this limitation occur during predetermined times. However, Gator Tours provides a more convenient, hands-off approach to virtual tours. Gator Tours does not utilize any external face cam service to achieve its functionality and is available anytime at its user’s convenience. Gator Tour’s beacon interface is the application’s most distinguishing implementation. The application communicates with beacons scattered throughout the University of Florida’s campus; it provides information about a location on campus if a user is within a certain range from the beacon. 
This application provides access to individuals who prefer a remote tour guide due to health implications or travel complications. Gator Tours’ main goal includes reducing the information gap that individuals without access to in-person virtual tours experience.

## Building Gator Tours for Bare React Native (Android)
(The following steps only work for Android devices)

### 1. Navigate to the ./Tour directory in a new console

### 2. Run the following command to install the required Node Modules
```bash
npm install
```

### 3. Start Metro to build JavaScript code and assets
```bash
npm start
```

### 4. Once the Metro logo is displayed, open Android Studio and launch any Android device
Locally installed emulators can be found in the Device Manager.

### 5. With the Android Emulator started, open a new console window and navigate to the ./Tour directory

### 6. Run the following command to install the application on the Android Emulator
```bash
npm run android
```

### 7. The app should install on the device and be ready to use!
If you are not prompted to enable location services, manually allow Gator Tour's location access through the settings app on your device.

## DEPRECIATED: Gator Tour Development Environment set up for WSL UBUNTU
(The following steps only work for WSL Ubuntu Development Environments!)
Note: The current version of the application does not support Expo, so this section is only applicable to Pre-Production releases.

### Download and Install the appropriate dependencies for React Native
installs the npm package manager
```bash
sudo apt install npm
sudo npm install n -g 
```
installs the correct nodejsLTS version 
```bash
sudo n stable
```    
installs expo-cli, allows the app to interface with the ExpoGo application
```bash
npm install expo-cli
```   
install react navigation - allows our application to navigate to different screens 
```bash
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/material-bottom-tabs react-native-paper react-native-vector-icons
npm install react-native-gifted-chat
``` 

### (Follow instructions only for developers running on a public network!)
installs expo tunnel capabilities
```bash
npm install @expo/ngrok@^4.1.0
hash -r
```   
### Initialize the application 
    cd into repository
    cd into Tour Directory 

### Start application server in terminal (pick only one)

(if developing on private network)
```bash
npx expo start
```  
(if developing on public network)
```bash
npx expo start --tunnel
```  
### Download and open the ExpoGo application 

### Run testable application on ExpoGo app
    - You should be able to see the current server running in your terminal as an option in the Expo Go Application if configured correctly 
    - Click that server icon in the application 
    - Done! 
