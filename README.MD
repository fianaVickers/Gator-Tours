
# Gator Tour Development Environment set up for WSL UBUNTU
(The following steps only work for WSL Ubuntu Development Environments!)
[Skip to Pre Alpha Documentation!](#prealpha-documentation)
[Skip to Prototype Documentation!](#prealpha-documentation)
## Download and Install the appropriate dependencies for React Native
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

## (Follow instructions only for developers running on a public network!)
installs expo tunnel capabilities
```bash
npm install @expo/ngrok@^4.1.0
hash -r
```   
## Initialize the application 
    cd into repository
    cd into Tour Directory 

## Start application server in terminal (pick only one)

(if developing on private network)
```bash
npx expo start
```  
(if developing on public network)
```bash
npx expo start --tunnel
```  
## Download and open the ExpoGo application 

## Run testable application on ExpoGo app
    - You should be able to see the current server running in your terminal as an option in the Expo Go Application if configured correctly 
    - Click that server icon in the application 
    - Done! 

# PreAlpha Documentation 

## Completed Work - Fiana Vickers

#### Set up Development environment for React Native 
*	Struggled to download dependencies for WSL Ubuntu 
*	First Attempt: Failed to set up development environment utilizing react native documentation 
*	Researched npm package manager 
*	Experimented with npm and npx commands 
*	Failed to download and find correct nodeLTS version. 
*	 Struggled to download correct expo cli version 
*	Experimented with starting application server with expoGo
	  *  Failed first attempt when trying to connect over public network 
      * Passed on Second Attempt by installing expoGo –tunnel flag 
*	Updated ReadMe with accurate development set up instructions. 

#### Initialized Foundational React Application
*	Researched React Native Foundation Application Structure 
*	Researched JavaScript and JDX syntax. 
*	Utilized example React Native application to implement Gator Tours base application architecture. 
    *	Experimented and implemented basic react components, main application.js file, assets file
    * Successfully set up initial application with one page with text

####  Added Basic UI Components
*	Researched react Native Screens and Components creation 
*	Experienced difficulty with UI components created due to JavaScript Syntax and learning react 
*	Implemented Text Input Box, Images, Dynamic Buttons with alert system, Screen list, scroll views, style components and Dynamic text input

####  Set up Navigation System and Architecture 
*	Researched Material Bottom Tab React native components 
*	Researched Stack navigation components. 
*	Experimented and Implemented stack dependencies. 
*	First Attempt: Failed to implement Stack navigation.  
*	Implemented Basic Chat bot UI, Tour Lists Screen 
*	Implemented Bottom Tab navigation systems with assorted icons for Map, Chat Bot and Tour Lists Scroll View Display

## Completed Work - Miguel Najul 

#### Test android app (already implemented):
* I cloned the repo provided by the last team that worked on this project to test and understand the implementation of their android app.
* After reading their documentation I set up the environment necessary to run the app (Android studio) along with an emulator to test the app (since I do not own any android devices).
* After understanding the code structure, it took me a while to understand that the app was not displaying since I did not have a google maps API key to display the map.
* I created a key for myself and ran the app successfully.
* Took about 4 hours of research and reading.

#### Set environment in my device:
* After my teammate set up the environment for our cross-platform implementation to run a simple app with just a text.
* I followed her instructions to install the necessary tools and dependencies.
Had some issues with versions installed and downloading the expoGo.
* Took about an hour.

#### Install the dependencies in React Native to display a map in the app with custom locations for both IOS and Android:
* Took a while to figure out the implementation of a map view in React Native that works independently for both IOS and android devices (share structures).
* Test if API key was necessary with an emulator and debug.
* Took 2-3 hours

#### Create a map view
* A simple map object with parameters to display an initial location at the University of Florida.
* My teammate was able to display this map in one of the screens she created after she expanded the app with more components.
* Set initial coordinates and camera position.
* Test display in android emulator and IOS device (debug).
* I did different approaches following several tutorials.
* Took 2-3 hours.

#### Add User’s Location:
* With some new dependencies and libraries, the app now asks the user to share their location to after display with a blue dot his live location.
* Debug and test in IOS device.
* Took about 3 hours.

#### Add Pin markers for destination:
* Implement pin marker elements with customizable location that will serve as a mark for final destinations for the user.
* Add new objects.
* Took 1-2 hours.

##  Bugs
*	Inaccurate dependencies for expo version to support constant values when running application server   
*	Inaccurate dependencies for expo version to support navigation animations when running application server   
*	Chat Bot Screen sends alert to the screen rather than sending text input to internal systems
*	Incorrect Chat Bot Screen UI positioning elements 

# Prototype Documentation 

## Completed Work - Fiana Vickers

#### Chat Bot UI 10% of time   
*	Researched chat bot methods to created a appealing chat ui with react native
*	Experimented with UI methods for chat bot   
*	Added user description and example text for alli gator chat account user  
*	Researched and implemented props for chat display utilizing chat  
*	Implemented React Native Module Gifted Chat  

#### Chat Message Page Functionality 10% of time  
*	Research gifted chat props to add chat bot functionality. 
*	Failed attempt: Failed to send a message to the screen, save that message and have an example reply
*	Second attempt: Message sent my user stays on message screen, but an example response does not render to chat UI 
*	Experimented with firestone database system to save messages  
*   Continue development of message storage to increase chat page functionality  
*	Failed to save sent message and received message, will continue working towards solutions in next milestone.   

#### Chat Bot integration 20% of time    
*   Researched Chat Bot API and its interfaces   
*   Set up development environment for previous android application  
*   Researched Current application of cog bot api from previous application  
*   Experimented with converting java cog bot api to an android module  
*   Failed to properly interface cog bot api with android module  
*   Will revisit in next project milestone  
	
#### AR Functionality 10% of time 
*	Researched AR implementations for React Native Framework  

#### Tour Lists Screen functionality 5% of time 
*   Researched dynamic screen list 
*   Experimented with adding touchable opacity covers over screen list forms     
*   Failed attempt: Failed to properly add correct functionality to each item on the tour screen list 

#### Tour lists Form 5% of time   
*   Researched how to implement an appealing UI  
*   Researched how to convert screen navigation system to support different screen methodology  besides tab navigation    
*   Researched react native UI form to support checklist.    
*   Researched how to receive input from checklist form for custom tour list locations  

#### Framework change 20% of time
*   Due to Professors concerns regarding possible react native hardware in competencies work was delayed due to the possibility of changing the development framework.     
*   Researched Xamarin and other cross platform frameworks    
*   Researched React Native android modules.   
*   Spotted that implementing android modules address the professor’s hardware concerns.   
*   Finalized continuing to utilize react native as our app developments framework  

#### Solve app testing challenges. 20%  
*   In the week of the prototype presentation our app simulation third-party software stopped   working     
*   Researched other methods to work around issue    
*   Experimented with connect to a local development server via lan, an the local network    
*   Research android emulators     
*   Research how to find a connected device via adb from WSl ubuntu     
*   The day before the demo the third-party emulation software, was fixed  
 
## Completed Work - Miguel Najul 

#### Add route from user’s location to Destination pin 20% of time: 
*   Create a path from the user’s device at location he ran the app.    
*   Implement the route for walking routes instead of driving 

#### Make real time date. Update path while the user moves 30% of time:
*   Shorten path while user gets closer to the destination.  
*   Optimize or reroute path if user gets out of it.   
*   Add cursor button to center map view on top of User’s location 5%:   
*   User can move around the tactile map and still get centered at  his location after pressing *  button  
*   Set a standard zoom position as well. 

#### Research Gimbal Beacons with React Native 10% of time: 
*   Gimbal Beacons versatility with both platforms.   
*   Adaptability with React Native. 

#### Send new location coordinates from Tour List to the destination pin (still in process) 20% of time: 
*   When button with new location is pressed, destination pin and route update to those new coordinates. 
*   Can add more destination pins and therefore routes. 

#### Calculate duration and distance from User’s location to destination pin (still in process) 20% of time: 
*   Work for some location accurately    
*   Trying to mange larger distances 

## Architecture
#### Map Display 
*	Connected to Tour internal systems. 
*	Tour internal systems connect to storage database system 
*	Implements accurate location for tour route tracking in the future 

#### ChatBot Display 
*	Will receive information from ChatBot API
*	Currently sends information to Internal systems for processing. 

#### Tour List Display 
*	Connected directly to map screen. 
*	Will process current location and utilize than information to create immersive tour experiences
*	Acts as a medium between map display and internal system

##  Bugs
*	Inaccurate dependencies for expo version to support constant values when running application server   
*	Inaccurate dependencies for expo version to support navigation animations when running application server   
*	Chat Bot does not respond with standard message when user sends initial message to the screen 
*	Map Display location does not center after navigating from tour selection list. 
