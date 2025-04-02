import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import twilio from 'twilio';

const prisma = new PrismaClient();

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const serviceSid = process.env.TWILIO_CONVERSATION_SERVICE_SID as string;
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {

    try {
        const formData = await req.formData();
        const user1 = formData.get("user1") as string; // User initiating the DM
        const user2 = formData.get("user2") as string; // User receiving the DM
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
        console.log(user1);
        console.log(user2);

        if (!user1 || !user2) {
            return NextResponse.json({ error: "Both users must be provided" }, { status: 400 });
        }

        // Check if the users exist in the database
        const users = await prisma.user.findMany({
            where: {
                id: { in: [user1, user2] },
            },
        });

        if (!users || users.length < 2) {
            return NextResponse.json({ error: `Users found: ${users.length}. Both users must exist.` }, { status: 400 });
        }

        const conversations = await client.conversations.v1.services(serviceSid)
            .conversations
            .list();

        // Check if a conversation already exists between the two users
        const existingConversation = conversations.find(async (conv) => {
            const participants = await client.conversations.v1.services(serviceSid)
                .conversations(conv.sid)
                .participants
                .list();
            return participants.some((participant) => participant.identity === user1) &&
                participants.some((participant) => participant.identity === user2);
        });

        if (existingConversation) {
            return NextResponse.redirect(`${baseUrl}/conversations/${existingConversation.sid}`);
        }

        const conversation = await client.conversations.v1.services(serviceSid)
            .conversations
            .create({ friendlyName: `${user1}-${user2}-dm` });

        const participants = [user1, user2];
        await Promise.all(participants.map(identity =>
            client.conversations.v1.services(serviceSid)
                .conversations(conversation.sid)
                .participants.create({ identity })
        ));

        return NextResponse.redirect(`${baseUrl}/conversations/${conversation.sid}`);
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}