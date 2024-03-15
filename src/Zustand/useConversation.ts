

import { create } from "zustand";
interface ConversationState {
    selectedConversation: any;
    messages: any[];
    setSelectedConversation:(item:any)=>void;
    setMessages:(item:any)=>void;
    currentUser: any;
    setCurrentUser:(id:any)=>void;
  }

const useConversation = create<ConversationState>((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation:any) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages:any) => set({ messages }),
  currentUser:null,
  setCurrentUser:(currentUser:any)=>set({currentUser})
}));

export default useConversation;