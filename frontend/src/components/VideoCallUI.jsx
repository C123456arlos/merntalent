
import { CallControls, CallingState, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk"
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'stream-chat-react/dist/css/v2/index.css'
const VideoCallUI = ({ chatClient, channel }) => {
  console.log(chatClient, 'chat')
  console.log('channel', channel)
  const navigate = useNavigate()
  const { useCallCallingState, useParticipantCount } = useCallStateHooks()
  const callingState = useCallCallingState()
  const participantCount = useParticipantCount()
  const [isChatOpen, setIsChatOpen]= useState(false)
  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4"></Loader2Icon>
          <p className="text-lg">joining call</p>
        </div>
      </div>
    )
  }
  return (
    <div className="h-full flex gap-3 relative str-video">
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 bg-base-100 p-3 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-primary"></UsersIcon>
            <span className="font-semibold">
              {participantCount} {participantCount===1 ?'participant':'participants'}
            </span>
          </div>
          {chatClient && channel && (
            <>
            <button onClick={() => setIsChatOpen(!isChatOpen)} className={`btn btn-sm gap-2 ${isChatOpen ? 'btn-primary' : 'btn-ghost'}`}
              title={isChatOpen ? 'hide chat':'show chat'}
            >
              <MessageSquareIcon className="size-4"></MessageSquareIcon>chat
            </button>

            </>
          )}
        </div>
        <div className="flex-1 bg-base-300 rounded-lg overflow-hidden relative">
          <SpeakerLayout></SpeakerLayout>
        </div>
        <div className="bg-base-100 p-3 rounded-lg shadow flex justify-center">
          <CallControls onLeave={()=>navigate('/dashboard')}></CallControls>
        </div>
      </div>
      {chatClient && channel && (
        <div className={`flex flex-col rounded-lg shadow overflow-hidden bg-[3272a30] transition-all duration-300 ease-in-out ${isChatOpen ? 'w-80 opacity-100' : 'w-0 opacity-0'}`}>
          {isChatOpen && (
<>
              <div className="bg-[#1c1e22] p-3 border-b border-[#3a3d44] flex items-center justify-between">
                <h3 className="font-semibold text-white">session chat</h3>
                <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition-colors" title="close chat">
                  <XIcon className="size-5"></XIcon>
                </button>
   </div>
            <div className="flex-1 overflow-hidden stream-chat-dark">
              <Chat client={chatClient} theme='str-chat__theme-dark'>
                <Channel channel={channel}>
                  <Window>
                    <MessageList></MessageList>
                    <MessageInput></MessageInput>
                  </Window>
                  <Thread></Thread>
                </Channel>
              </Chat>
</div>
</>

          )}
        </div>
      )}
    </div>
  )
}

export default VideoCallUI













// import { CallControls, CallingState, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk"
// import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react"
// import { useState } from "react"
// import { useNavigate } from "react-router"
// import { Channel, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react'
// import '@stream-io/video-react-sdk/dist/css/styles.css'
// import 'stream-chat-react/dist/css/v2/index.css'
// const VideoCallUI = ({ chatClient, channel }) => {
//   console.log(chatClient, 'chat')
//   console.log('channel', channel)
//   const navigate = useNavigate()
//   const { useCallCallingState, useParticipantCount } = useCallStateHooks()
//   const callingState = useCallCallingState()
//   const participantCount = useParticipantCount()

//   return (
//     <div className="h-full flex gap-3 relative str-video">

      
//         <div className={`flex flex-col rounded-lg shadow overflow-hidden bg-[3272a30] transition-all duration-300 ease-in-out w-80 opacity-100`}>
//                 {false && (
// <>
//             <div className="flex-1 overflow-hidden stream-chat-dark">
//               <Chat client={chatClient} theme='str-chat__theme-dark'>
//                 <Channel channel={channel}>
//                   <Window>
//                     <MessageList></MessageList>
//                     <MessageInput></MessageInput>
//                   </Window>
//                   <Thread></Thread>
//                 </Channel>
//               </Chat>
// </div>
// </>

//           )}
//         </div>
    
//     </div>
//   )
// }

// export default VideoCallUI


