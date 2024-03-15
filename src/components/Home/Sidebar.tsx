import getAllUsers from "@/actions/chat/getAllUsers";
import React from "react";
import SidebarItems from "./SidebarItems";
import CurrentUser from "@/actions/chat/getCurrentUser";

const Sidebar = async () => {
  const users = await getAllUsers();
  const currentUser = await CurrentUser();

  const Allusers=users.filter(user => user.id!==currentUser);
  return (
    <div className="h-[100%] w-[30vw] bg-sky-300">
      {Allusers.map((user: any) => (
        <div key={user.id}>
          <SidebarItems props={user} />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
