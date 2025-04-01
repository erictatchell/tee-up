import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const serviceSid = process.env.TWILIO_CONVERSATION_SERVICE_SID as string;

const client = twilio(accountSid, authToken);

export async function POST(req: Request) {

    try {
        const { user1, user2 } = await req.json(); // Users initiating the DM

        if (!user1 || !user2) {
            return NextResponse.json({ error: "Both users must be provided" }, { status: 400 });
        }

        // Create a new conversation
        const conversation = await client.conversations.v1.services(serviceSid)
            .conversations
            .create({ friendlyName: `${user1}-${user2}-dm` });

        return NextResponse.json({ conversationSid: conversation.sid }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}