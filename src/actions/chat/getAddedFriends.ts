"use server"
import { db } from "@/lib/db";
interface userProps{
    userId:string
}

const getAddedFriends = async ({userId}:userProps) => {
  try {
    const userWithAddedFriends = await db.user.findFirst({
      where: { id: userId },
      include: {
        AddedFriend :true
      }
    });
    // console.log(userWithAddedFriends)
    return userWithAddedFriends;
  } catch (error) {
    console.error("Error fetching user with added friends:", error);
    throw error;
  }
};

export default getAddedFriends;
