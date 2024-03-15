"use client"
import useConversation from '@/Zustand/useConversation'
import getMessages from '@/actions/chat/getMessages';
import React, { useEffect } from 'react'
import MessageInput from './MessageInput';

const Conversation = ({senderId}:any) => {
   const {setCurrentUser,currentUser,selectedConversation}=useConversation();
   useEffect(()=>{
      setCurrentUser(senderId)
   },[senderId,setCurrentUser])
  

   console.log(currentUser,selectedConversation?.props?.id)
   useEffect(()=>{
      const fetchMessages=async()=>{
        const data=await getMessages({senderId:currentUser,recevierId:selectedConversation?.props?.id});
        console.log(data,"messages");
      }
      fetchMessages()
   },[currentUser,selectedConversation])
  return (
    <div>
        <MessageInput/>
    </div>
  )
}

export default Conversation
