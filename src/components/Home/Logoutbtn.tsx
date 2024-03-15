"use client";
import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

const Logoutbtn = () => {
  return (
    <>
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Logoutbtn;
