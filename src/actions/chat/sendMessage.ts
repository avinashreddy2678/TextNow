"use server"
import { db } from "@/lib/db";



const SendMessage = async ({ senderId, receiverId, message }: any) => {
  try {
    // Check if senderId and receiverId are provided
    console.log(senderId,receiverId,message)
    if (!senderId || !receiverId) {
      return { error: "SenderId or receiverId is missing" };
    }

    // Find or create conversation
    let existingConversation = await db.conversation.findFirst({
      where: {
        OR: [
          {
            senderId: senderId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
    });
    

    // If conversation does not exist, create it
    if (!existingConversation) {
      existingConversation = await db.conversation.create({
        data: {
          senderId,
          receiverId,
        },
      });
      
    }

    // Create the message and associate it with the conversation
    const createdMessage = await db.message.create({
      data: {
        senderId: senderId, 
        message: message,  
        conversationId:existingConversation.id
      },
    });
    
    
    // Update the existing conversation to include the newly created message
    existingConversation = await db.conversation.update({
      where: { id: existingConversation.id },
      data: {
        messages: {
          connect: [{ id: createdMessage.id }],
        },
      },
      include: {
        messages: true,
      },
    });

    console.log("Message added to existing conversation:", existingConversation);

    return {
      existingConversation,
      msg: "Message added to existing conversation",
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return { error: "Error sending message" };
  }
};

export default SendMessage;
