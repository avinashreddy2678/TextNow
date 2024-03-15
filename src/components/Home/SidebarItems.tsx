"use client";
import React from "react";
import { Button } from "../ui/button";
import useConversation from "@/Zustand/useConversation";

const SidebarItems = (item: any) => {
  const { name, email,id } = item.props;
    const { setSelectedConversation} = useConversation();
  return (
    <div className="mt-3 w-[100%] mx-auto">
      <Button className="w-[80%]" onClick={()=>{
            setSelectedConversation(item)
      }}>{name}</Button>
    </div>
  );
};

export default SidebarItems;
