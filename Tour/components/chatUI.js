import React, { useState, useCallback } from 'react';
import { Avatar, GiftedChat } from 'react-native-gifted-chat';

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

   const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      //onSend={newMessage => handleSend(newMessage)}
      onSend={messages => onSend(messages)}
      user={{ _id: 1 }}
      alwaysShowSend
    />
  );
}