import PusherServer from 'pusher'
import PusherClient from 'pusher-js'
export const pusherServer=new PusherServer({
    appId:process.env.PUSHER_API_ID!,
    key:process.env.PUSHER_KEY!,
    secret:process.env.PUSHER_SECREAT!,
    cluster:process.env.PUSHER_CLUSTER!
    

})

export const pusherClient=new PusherClient(
    process.env.PUSHER_API_ID!,{
        cluster:process.env.PUSHER_CLUSTER!
    }
)