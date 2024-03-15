"use server"
import { db } from "@/lib/db";

interface convo {
  senderId: string;
  recevierId: string;
}

const getMessages = async ({ senderId, recevierId }: convo) => {
  if(senderId===null || recevierId==null){
    return []
  }
    // console.log("called getMessages", senderId, recevierId)
 const conversation= await db.conversation.findFirst({
    where: {
      AND: [
        { senderId: senderId},
        { receiverId: recevierId  }
      ]
    },
    include:{
        messages: true
    }
  });
  // console.log(conversation)
  return conversation
};

export default getMessages;
