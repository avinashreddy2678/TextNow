import React from "react";
import { auth } from "@/auth";
import Logoutbtn from "@/components/Home/Logoutbtn";


const Home = async () => {
  const session = await auth();
  
  return (
    <div>
      {JSON.stringify(session)}
      <div className="h-[80vh] bg-blue-200">
      
      </div>

      <Logoutbtn  />
    </div>
  );
};

export default Home;
