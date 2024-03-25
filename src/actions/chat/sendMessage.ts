"use server";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
const SendMessage = async ({ senderId, receiverId, message }: any) => {
  try {
    const existsConversation = await db.conversation.findFirst({
      where: {
        AND: [
          { senderId: senderId },
          { receiverId: receiverId }
        ]
      }
    });

    if (!existsConversation) {
      const newConversation = await db.conversation.create({
        data: {
          senderId,
          receiverId
        }
      });
      
      console.log("New conversation created:", newConversation);

      // Update the sender user to connect to the newly created conversation
      await db.user.update({
        where: {
          id: senderId
        },
        data: {
          conversationId: {
            connect: {
              id: newConversation.id
            }
          }
        }
      });
      
      console.log("Conversation added to sender user");
    } else {
      console.log("Conversation already exists:", existsConversation);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return { error: "Error sending message" };
  }
};

export default SendMessage;


// console.log(senderId, receiverId, message);
//     if (!senderId || !receiverId) {
//       return { error: "SenderId or receiverId is missing" };
//     }

//     // Find or create conversation
//     let existingConversation = await db.conversation.findFirst({
//       where: {
//         OR: [
//           {
//             senderId: senderId,
//             receiverId: receiverId,
//           },
//           {
//             senderId: receiverId,
//             receiverId: senderId,
//           },
//         ],
//       },
//     });

//     // If conversation does not exist, create it
//     if (!existingConversation) {
//       existingConversation = await db.conversation.create({
//         data: {
//           senderId,
//           receiverId,
//         },
//       });
//     }

//     // Create the message and associate it with the conversation
//     const createdMessage = await db.message.create({
//       data: {
//         senderId: senderId,
//         message: message,
//         conversationId: existingConversation.id,
//       },
//     });

//     // Update the existing conversation to include the newly created message
//     existingConversation = await db.conversation.update({
//       where: { id: existingConversation.id },
//       data: {
//         messages: {
//           connect: [{ id: createdMessage.id }],
//         },
//       },
//       include: {
//         messages: true,
//       },
//     });

//     // console.log(
//     //   "Message added to existing conversation:",
//     //   existingConversation
//     // );
//     await pusherServer.trigger(existingConversation.id,"new-message",createdMessage)

//     return {
//       existingConversation,
//     };
