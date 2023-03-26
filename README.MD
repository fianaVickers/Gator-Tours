
# Gator Tour Development Environment set up for WSL UBUNTU
(The following steps only work for WSL Ubuntu Development Environments!)
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

