import { auth } from "@/auth"

const CurrentUser=async()=>{
    const session=await auth();
    
    return session?.user?.id
}
export default CurrentUser;