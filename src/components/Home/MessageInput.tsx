import React, { useState } from "react";
import { Input } from "../ui/input";
import useConversation from "@/Zustand/useConversation";
import SendMessage from "@/actions/chat/sendMessage";
import { Button } from "../ui/button";

const MessageInput = () => {
  const { selectedConversation, currentUser } = useConversation();
  const [msg, setMsg] = useState("");
  const onMessageSend = async() => {
   const sentMsg=await SendMessage({
      senderId: currentUser,
      receiverId: selectedConversation?.props?.id,
      message: msg,
    });
    console.log(sentMsg)
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
