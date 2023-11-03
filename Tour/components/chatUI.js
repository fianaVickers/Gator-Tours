import React, { useState, useCallback } from 'react';
import { Avatar, GiftedChat } from 'react-native-gifted-chat';
var cogBotAPITypes = require('/home/fi20/GatorTours/Gator-Tours/Tour/chatbot/cogBotAPITypes.js').cogBotAPITypes;
var cogAPIData = new cogBotAPITypes();



export default function RoomScreen() {
  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'Ask Alli Anything!',
      createdAt: new Date().getTime(),
      system: true
    },
    // example of chat message I am Alli, welcome to the University of Florida! If you have any questions about the campus I can clear them up, just send me a question and I have all the answers
    {
      _id: 1,
      text: 'I am Alli, welcome to the University of Florida! If you have any questions about the campus I can clear them up, just ask me a question :)',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Alli Gator',
        avatar : 'https://cms.mc-cap1.cogability.net/uf/Alli-Gator-1.png',
      }
    }
  ]);

  const messageTemp = {
    _id: Math.floor(Math.random() * 100),
    text: "Hmm... let me think about that",
    createdAt: new Date().getTime(),
    user: {
      _id: 2,
      name: 'Alli Gator',
      avatar : 'https://cms-uf-cap1.mybluemix.net/uf/Alli-Gator-1.png',
    }
  };
  
  // helper method that sends a message
   function handleSend(newMessage = []) {
     setMessages(GiftedChat.append(messages, messageTemp));
     setMessages(GiftedChat.append(messages, newMessage));
     //console.warn(newMessage);
   }

   function removeHtmlTags(apiStr){
    var startIndex = 0
    var endIndex = 0 
    var noTagStr = ""
    for (let i = 0; i < apiStr.length; i++){
        
        var currChar = apiStr.charAt(i)
        //console.log("loop i: " + i + "currChar: " + currChar)
        if (currChar == "<"){
          startIndex = i 
        }else if (currChar == ">"){
          endIndex = i 
          //slice out the string 
          var tagRemoved = apiStr.slice(startIndex, endIndex+1)
          noTagStr = apiStr.replace(tagRemoved, "")
          apiStr = noTagStr
          //console.log(tagRemoved)
          //console.log("the string after replce:" + noTagStr)
        }
    }
    return noTagStr
  }
  
  function tagsPresent(apiStr){
    var startIndex = 0
    var endIndex = 0 
    var hasTags = false
    
    for (let i = 0; i < apiStr.length; i++){
        
        var currChar = apiStr.charAt(i)
        if (currChar == "<"){
          startIndex = i
          continue 
        }else if (currChar == ">"){
          hasTags = true
          break 
        }
    }
    return hasTags
  }
  
  
  function formatResults(resultObj){
    let formatedResStr = "Title: " + resultObj.title 
    formatedResStr = formatedResStr + "\n" + "Summary: "+ resultObj.overview 
    formatedResStr = formatedResStr + "\n" + "click link for more information: "+ resultObj.url +"\n"
    return formatedResStr
  }

  function retrieveLink(apiRes){

    linkStr = "a href="
      if (apiRes.includes("a href=")){
        index = apiRes.indexOf(linkStr)
        index = index+linkStr.length+1
        console.log(index + " char at index: " + apiRes.charAt(index))
        indexLinkEnd = apiRes.indexOf("\"", index)
        console.log(indexLinkEnd + " char at index: " + apiRes.charAt(indexLinkEnd))
        console.log(apiRes.substring(index, indexLinkEnd))
        return apiRes.substring(index, indexLinkEnd)
      }

  }

  function convertStrToGiftChat(inputStr, idNum){
    return  {
      _id: Math.floor(Math.random() * 10000),
      text: inputStr,
      createdAt: new Date().getTime(),
      user: {
        _id: idNum,
        name: 'Alli Gator',
        avatar : 'https://cms.mc-cap1.cogability.net/uf/Alli-Gator-1.png',
      }
    }
  }

   const onSend = useCallback((messageSent = []) => {
    
    //what i just sent to the chat bot screen 
    console.log(typeof messageSent[0].text + "-- message sent: " + messageSent[0].text)

    //adds the message to be displayed to the UI 
    setMessages(previousMessages => GiftedChat.append(previousMessages, messageSent))

    //delays the response to the message from alli 
    //setTimeout(() => setMessages(previousMessages => GiftedChat.append(previousMessages, messageTemp)), 1000)

    //send the message to alli 
    console.log("sending this message to the api..." + messageSent[0].text)
    
    sendRequestToApi(messageSent[0].text).then((response) => {
      //go though all generic objects
      for (let i = 0; i < response.output.generic.length; i++){
        let genRes = response.output.generic[i]
        //console.log(genRes) 
        //check response type 
        if (genRes.response_type == "text"){
          //return the text output response
          let giftChatApiRes = ""
          console.log("raw rsponse ---->" + genRes.text)
          if (tagsPresent(genRes.text)){
            console.log("tags have been found! ...")
            link = ""
            linkMsg = " Follow this link to learn more! "
            if (genRes.text.includes("a href=")){
              link = linkMsg + retrieveLink(genRes.text)
            }

            let tempStr = genRes.text.replace(/(<([^>]+)>)/gi, "")
            giftChatApiRes = tempStr + link

          }else{

            console.log("No tags found here: " + genRes.text)
            giftChatApiRes = genRes.text
          }
          console.log("\n\n")

          const messTemp = {
            _id: Math.floor(Math.random() * 10000),
            text: giftChatApiRes,
            createdAt: new Date().getTime(),
            user: {
              _id: 2,
              name: 'Alli Gator',
              avatar : 'https://cms.mc-cap1.cogability.net/uf/Alli-Gator-1.png',
            }
          }

          setMessages(previousMessages => GiftedChat.append(previousMessages, messTemp))
          
        }else if (genRes.response_type == "search"){
          let formatedResults = ""
          for (let j = 0; j < genRes.results.length; j++){
            formatedResults = formatedResults + formatResults(genRes.results[j]) + "\n"
          }
          console.log("These are the formated results: \n" + formatedResults)

          const formatMsgTemplate = {
            _id: Math.floor(Math.random() * 10000),
            text: formatedResults,
            createdAt: new Date().getTime(),
            user: {
              _id: 2,
              name: 'Alli Gator',
              avatar : 'https://cms.mc-cap1.cogability.net/uf/Alli-Gator-1.png',
            }
          }

          setMessages(previousMessages => GiftedChat.append(previousMessages, formatMsgTemplate))
        } 
      } 
      
    })

      
  
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{ _id: 6 }}
      alwaysShowSend
    />
  );
}

function sendRequestToApi(message){
  return fetch(cogAPIData.CogbotURL,
  {
    method: cogAPIData.POSTstr,
    headers: {
      'Content-Type': cogAPIData.hdrContentValue,
       'Accept': cogAPIData.hdrAcceptValue,
      'Authorization': cogAPIData.hrdAuthValue,
    },
    body: JSON.stringify(
      {
          "input" : {"text" : message}
      }
    ),
  })
  .then((response) => response.json())
  .then((responseData) => {
    return responseData;
  })
  .catch(error => console.warn(error));
}