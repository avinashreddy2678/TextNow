import React from "react";
import { auth } from "@/auth";
import Logoutbtn from "@/components/Home/Logoutbtn";
import CurrentUser from "@/actions/chat/getCurrentUser";
import Conversation from "@/components/Home/Conversation";
import useConversation from "@/Zustand/useConversation";

const Home = async () => {
  const session = await auth();
  const senderId = await CurrentUser();
  return (
    <div>
      {JSON.stringify(session)}
      <div className="h-[80vh] bg-blue-200">
        {
          senderId &&  <Conversation senderId={senderId}/>
        }
       
      </div>

      <Logoutbtn  />
    </div>
  );
};

export default Home;
