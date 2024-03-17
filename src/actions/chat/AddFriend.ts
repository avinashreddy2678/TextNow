"use server";

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const AddFriend = async ({
  userId,
  senderId,
}: {
  userId: string;
  senderId: string;
}) => {
  try {
    // Check if the senderId is already added as a friend for the userId
    const existingFriend = await db.user.findUnique({
      where: { id: userId },
      include: { AddedFriend: true },
    });

    const isAlreadyAdded = existingFriend?.AddedFriend.filter(
      (friend) => friend.userId !== senderId
    );
    console.log(isAlreadyAdded)
    console.log(existingFriend, "existing");
   
    if (isAlreadyAdded?.length===1) {
      return "Sender is already added as a friend";
    }

    // Create a new AddedFriends record for the senderId
    const newFriend = await db.addedFriends.create({
      data: { userId: senderId },
    });

    // Update the userId's AddedFriend array to include the new friend
    // const updatedUser = await db.user.update({
    //   where: { id: userId },
    //   data: { AddedFriend: { connect: { id: newFriend.id } } },
    //   include: { AddedFriend: true },
    // });

    // return updatedUser;
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
};

export default AddFriend;
