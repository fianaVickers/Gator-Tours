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