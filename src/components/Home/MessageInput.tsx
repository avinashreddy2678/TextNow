import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import useConversation from "@/Zustand/useConversation";
import SendMessage from "@/actions/chat/sendMessage";
import { Button } from "../ui/button";
// import getAddedFriends from "@/actions/chat/getAddedFriends";
import AddFriend from "@/actions/chat/AddFriend";
import { pusherClient } from "@/lib/pusher";


const MessageInput = () => {
  const { selectedConversation, currentUser } = useConversation();
  const uu=currentUser as string;
  const [msg, setMsg] = useState("");
  const onMessageSend = async() => {
   const sentMsg=await SendMessage({
      senderId: currentUser,
      receiverId: selectedConversation?.props?.id,
      message: msg,
    });
    // await pusherClient(currentUser,"new-message",msg);
    // const added=await AddFriend({userId:uu,senderId:selectedConversation?.props?.id})
    // console.log(added)
  };

  return (
    <div>
      {selectedConversation ? (
        <>
        <div className="flex">
          <Input
          className="w-[70%]"
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            placeholder={`${selectedConversation?.props?.name} is waiting for your message `}
          />
          <Button onClick={()=>{onMessageSend()}}>Send</Button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default MessageInput;
