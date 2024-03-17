"use server";

import { db } from "@/lib/db";

const getAllUsers = async () => {
  try {
    const allusers = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return [...allusers];
  } catch (error) {
    return [];
  }
};
export default getAllUsers;
