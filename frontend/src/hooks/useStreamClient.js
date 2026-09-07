import { useState, useEffect } from "react"
import {StreamChat } from 'stream-chat'
// import { StreamChat } from 'stream-chat'
import toast from "react-hot-toast"
import { useParams } from "react-router"
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream"
import { sessionApi } from "../api/sessions"
import { useStreamClientData } from "./useSessions"
const useStreamClient = ({
    loadingSession,
    session, isHost, isParticipant }) => {
        const { id: targetUserId } = useParams();
        const [streamClient, setStreamClient] = useState(null)
        const [call, setCall] = useState(null)
    const { data } = useStreamClientData()
    const [chatClient, setChatClient] = useState(null)
    const [channel, setChannel] = useState(null)
    const [isInitializingCall, setIsInitializingCall] = useState(true)
    useEffect(() => {
        let videoCall = null
        let chatClientInstance = null
        const initCall = async () => {
            if (!session?.callId) return
            if (!isHost && !isParticipant) return
            
            const initCall = async () => {
                if (!session?.callId) return
                if (!isHost && !isParticipant) return
                try {
                    const { token, userId, userName, userImage } = data
                    const client = await initializeStreamClient({
                        id: userId,
                        name: userName,
                        image: userImage,
                    },
                    token
                )
                setStreamClient(client)
                videoCall = client.call('default', session.callId)
                await videoCall.join({ create: true })
                setCall(videoCall)
                const apiKey = import.meta.env.VITE_STREAM_API_KEY
                chatClientInstance = StreamChat.getInstance(apiKey)
                await chatClientInstance.connectUser({
                    id: userId,
                    nme: userName,
                    image: userImage
                }, token)
                    setChatClient(chatClientInstance)
                    const chatChannel = chatClientInstance.channel('messaging', session.callId)
                    await chatChannel.watch()
                    setChannel(chatChannel)
                    console.log(channel, 'channelchanelcahnnel')
                } catch (error) {
                    toast.error('failed to join video call')
                    console.error('error init call', error)
                } finally {
                    setIsInitializingCall(false)
                }
            }
            if (session && !loadingSession) initCall()
        } 
        if (session && !loadingSession) initCall()
        return () => {
            (
                async () => {
                try {
                    if (videoCall) await videoCall.leave()
                    if (chatClientInstance) await chatClientInstance.disconnectUser()
                    await disconnectStreamClient()
                } catch (error) {
                    console.error('cleanup error', error)                    
                }
                }
            )()
        }
    }, [session,
        loadingSession,
        isHost, isParticipant])
    
    return {
    streamClient, call , chatClient, channel, isInitializingCall
}
}

export default useStreamClient














// import { useState, useEffect } from "react"
// import {StreamChat } from 'stream-chat'
// // import { StreamChat } from 'stream-chat'
// import toast from "react-hot-toast"
// import { useParams } from "react-router"
// import { initializeStreamClient, disconnectStreamClient } from "../lib/stream"
// import { sessionApi } from "../api/sessions"
// import { useStreamClientData } from "./useSessions"
// const useStreamClient = ({
//     loadingSession,
//     session, isHost, isParticipant }) => {
//         const { id: targetUserId } = useParams();
//         const [streamClient, setStreamClient] = useState(null)
//         const [call, setCall] = useState(null)
//     const { data } = useStreamClientData()
//     const [chatClient, setChatClient] = useState(null)
//     const [channel, setChannel] = useState(null)
//     const [isInitializingCall, setIsInitializingCall] = useState(true)
//     // useEffect(() => {
//     //     let videoCall = null
//     //     let chatClientInstance = null
//     //     const initCall = async () => {
//     //         if (!session?.callId) return
//     //         if (!isHost && !isParticipant) return
         
//     //         const initCall = async () => {
//     //             if (!session?.callId) return
//     //             if (!isHost && !isParticipant) return
//     //             try {
//     //                 const { token, userId, userName, userImage } = data
//     //                 const client = await initializeStreamClient({
//     //                     id: userId,
//     //                     name: userName,
//     //                     image: userImage,
//     //                 },
//     //                     token
//     //                 )
//     //                 setStreamClient(client)
//     //                 videoCall = client.call('default', session.callId)
//     //                 await videoCall.join({ create: true })
//     //                 setCall(videoCall)
//     //                 const apiKey = import.meta.env.VITE_STREAM_API_KEY
//     //                 chatClientInstance = StreamChat.getInstance(apiKey)
//     //                 await chatClientInstance.connectUser({
//     //                     id: userId,
//     //                     nme: userName,
//     //                     image: userImage
//     //                 }, token)
//     //                 setChatClient(chatClientInstance)
//     //                 const chatChannel = chatClientInstance.channel('messaging', session.callId)
//     //                 await chatChannel.watch()
//     //                 setChannel(chatChannel)
//     //                 console.log(channel, 'channelchanelcahnnel')
//     //             } catch (error) {
//     //                 toast.error('failed to join video call')
//     //                 console.error('error init call', error)
//     //             } finally {
//     //                 setIsInitializingCall(false)
//     //             }
//     //         }
//     //         if (session && !loadingSession) initCall()
//     //     } 
//     //     if (session && !loadingSession) initCall()
//     //     return () => {
//     //         (
//     //             async () => {
//     //             try {
//     //                 if (videoCall) await videoCall.leave()
//     //                 if (chatClientInstance) await chatClientInstance.disconnectUser()
//     //                 await disconnectStreamClient()
//     //             } catch (error) {
//     //                 console.error('cleanup error', error)                    
//     //             }
//     //             }
//     //         )()
//     //     }
//     // }, [session,
//     //     loadingSession,
//     //     isHost, isParticipant])
    
    
//     useEffect(() => {
//         const initChat = async () => {
//             if (!session?.callId) return
//             if (!isHost && !isParticipant) return
// let chatClientInstance=null
//             try {
//                 console.log("Initializing stream chat client...");
//                 const { token, userId, userName, userImage } = data
//                     const apiKey = import.meta.env.VITE_STREAM_API_KEY
//                     chatClientInstance = StreamChat.getInstance(apiKey)

//                     await chatClientInstance.connectUser(
//                     {
//                           id: userId,
//                         name: userName,
//                         image: userImage,
//                     },
//                     token
//                 );

                
//                 const channelId = session?.callId

             
//  const chatChannel = chatClientInstance.channel('messaging', channelId)


//                 await chatChannel.watch();

                
                
                
                
                
//                 // setChatClient(chat);






//                 setChannel(chatChannel);
//             } catch (error) {
//                 console.error("Error initializing chat:", error);
//                 toast.error("Could not connect to chat. Please try again.");
//             } 
//         };

//         initChat();
//     }, [session,
//         loadingSession,
//         isHost, isParticipant]);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//     return {
//     streamClient, call , chatClient, channel, isInitializingCall
// }
// }

// export default useStreamClient






































// import { useState, useEffect } from "react"
// import {StreamChat } from 'stream-chat'
// // import { StreamChat } from 'stream-chat'
// import toast from "react-hot-toast"
// import { useParams } from "react-router"
// import { initializeStreamClient, disconnectStreamClient } from "../lib/stream"
// import { sessionApi } from "../api/sessions"
// import { useStreamClientData } from "./useSessions"
// const useStreamClient = ({
//     loadingSession,
//     session, isHost, isParticipant }) => {
//         const { id: targetUserId } = useParams();
//         const [streamClient, setStreamClient] = useState(null)
//         const [call, setCall] = useState(null)
//     const { data } = useStreamClientData()
//     const [chatClient, setChatClient] = useState(null)
//     const [channel, setChannel] = useState(null)
//     const [isInitializingCall, setIsInitializingCall] = useState(true)
//     useEffect(() => {
//         let videoCall = null
//         let chatClientInstance = null
//         const initCall = async () => {
//             if (!session?.callId) return
//             if (!isHost && !isParticipant) return
         
//             const initCall = async () => {
//                 if (!session?.callId) return
//                 if (!isHost && !isParticipant) return
//                 try {

//                     const { token, userId, userName, userImage } = data
//                     const apiKey = import.meta.env.VITE_STREAM_API_KEY
//                   const  chatClientInstance = StreamChat.getInstance(apiKey)



//        await chatClientInstance.connectUser({
//                         id: userId,
//                         name: userName,
//                         image: userImage
//                     }, token)

//                     const channelId = session?.callId
                    
                    
//                     const chatChannel=    chatClientInstance.channel('messaging', channelId)
//                     await chatChannel.watch()
//                     setChatClient(chatClientInstance)
//                     setChannel(chatChannel)
    








//                 } catch (error) {
//                     toast.error('failed to join video call')
//                     console.error('error init call', error)
//                 } 
//             }
//         } 
//       initCall()
     
//     }, [session,
//         loadingSession,
//         isHost, isParticipant])
//     return { chatClient, channel
// }
// }

// export default useStreamClient


















// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { useQuery } from "@tanstack/react-query";
// import { getStreamToken } from "../lib/api";

// import {
//     Channel,
//     ChannelHeader,
//     Chat,
//     MessageInput,
//     MessageList,
//     Thread,
//     Window,
// } from "stream-chat-react";
// import { StreamChat } from "stream-chat";
// import toast from "react-hot-toast";

// import ChatLoader from "../components/ChatLoader";
// import CallButton from "../components/CallButton";
// // import CallButton from "../components/CallButton";

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// const ChatPage = () => {
//     const { id: targetUserId } = useParams();

//     const [chatClient, setChatClient] = useState(null);
//     const [channel, setChannel] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const { authUser } = useAuthUser();

//     const { data: tokenData } = useQuery({
//         queryKey: ["streamToken"],
//         queryFn: getStreamToken,
//         enabled: !!authUser, // this will run only when authUser is available
//     });

//     useEffect(() => {
//         const initChat = async () => {
//             if (!tokenData?.token || !authUser) return;

//             try {
//                 console.log("Initializing stream chat client...");

//                 const client = StreamChat.getInstance(STREAM_API_KEY);

//                 await client.connectUser(
//                     {
//                         id: authUser._id,
//                         name: authUser.fullName,
//                         image: authUser.profilePic,
//                     },
//                     tokenData.token
//                 );

//                 //
//                 const channelId = [authUser._id, targetUserId].sort().join("-");

//                 // you and me
//                 // if i start the chat => channelId: [myId, yourId]
//                 // if you start the chat => channelId: [yourId, myId]  => [myId,yourId]

//                 const currChannel = client.channel("messaging", channelId
//                     // , {
//                     // members: [authUser._id, targetUserId],
//                     // }
//                 );

//                 await currChannel.watch();

//                 setChatClient(client);
//                 setChannel(currChannel);
//             } catch (error) {
//                 console.error("Error initializing chat:", error);
//                 toast.error("Could not connect to chat. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         initChat();
//     }, [tokenData, authUser, targetUserId]);

//     const handleVideoCall = () => {
//         if (channel) {
//             const callUrl = `${window.location.origin}/call/${channel.id}`;

//             channel.sendMessage({
//                 text: `I've started a video call. Join me here: ${callUrl}`,
//             });

//             toast.success("Video call link sent successfully!");
//         }
//     };

//     if (loading || !chatClient || !channel) return <ChatLoader />;

//     return (
//         <div className="h-[93vh]">
//             <Chat client={chatClient}>
//                 <Channel channel={channel}>
//                     <div className="w-full relative">
//                         <CallButton handleVideoCall={handleVideoCall} />
//                         <Window>
//                             <ChannelHeader />
//                             <MessageList />
//                             <MessageInput focus />
//                         </Window>
//                     </div>
//                     <Thread />
//                 </Channel>
//             </Chat>
//         </div>
//     );
// };
// export default ChatPage;










