import { chatClient, streamClient } from "../lib/stream.js"
import Session from "../models/Session.js"

export async function createSession(req, res) {
    try {
        const { problem, difficulty } = req.body
        const userId = req.user_id
        const clerkId = req.user.clerkId
        if (!problem || !difficulty) {
            return res.status(400).json({mesage:'problem and difficulty are required'})
        }
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
        const session = await Session.create({ problem: problem, difficulty, host: userId, callId })
        await streamClient.video.call('default', callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom:{problem, difficulty, sessionId:session._id.toString()}
            }
        })
        const channel= chatClient.channel('messaging', callId, {
            name: `${problem} session`,
            created_by: clerkId,
            members:[clerkId]
        })
        await channel.create()
        res.status(201).json({session:session})
    } catch (error) {
        console.log('error in creating controller:', error.message)
        res.status(500).json({message:'internal server error'})
    }
}
export async function getActiveSessions(_, res) {
    try {
        const sessions = await Session.find({ status: 'active' }).populate('host', 'name profileImage email clerkId')
            .sort({ createdAt: -1 }).limit(20)
        res.status(200).json({sessions})
    } catch (error) {
        console.log('error in getactivesessions controllers', error.message)
        res.status(500).json({message:'internal server error'})
    }
}
export async function getMyRecentSessions(req, res){}
export async function getSessionById(req, res){}
export async function joinSession(req, res){}
export async function endSession(req, res){}