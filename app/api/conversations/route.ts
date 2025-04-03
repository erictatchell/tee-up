import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import twilio from "twilio";

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

        if (!user1 || !user2) {
            return NextResponse.json(
                { error: "Both users must be provided" },
                { status: 400 }
            );
        }

        // Validate the baseUrl to ensure it's a trusted domain
        const allowedBaseUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL as string);
        const redirectBaseUrl = new URL(baseUrl);

        if (redirectBaseUrl.origin !== allowedBaseUrl.origin) {
            return NextResponse.json(
                { error: "Invalid base URL for redirection" },
                { status: 400 }
            );
        }

        // Check if both users exist in the database
        const users = await prisma.user.findMany({
            where: {
                id: { in: [user1, user2] },
            },
        });

        if (users.length < 2) {
            return NextResponse.json(
                { error: `Users found: ${users.length}. Both users must exist.` },
                { status: 400 }
            );
        }

        // Check if a conversation already exists between the two users
        const conversations = await client.conversations.v1
            .services(serviceSid)
            .conversations.list();

        const existingConversation = await Promise.all(
            conversations.map(async (conv) => {
                const participants = await client.conversations.v1
                    .services(serviceSid)
                    .conversations(conv.sid)
                    .participants.list();

                const hasUser1 = participants.some(
                    (participant) => participant.identity === user1
                );
                const hasUser2 = participants.some(
                    (participant) => participant.identity === user2
                );

                return hasUser1 && hasUser2 ? conv : null;
            })
        ).then((results) => results.find((conv) => conv !== null));

        if (existingConversation) {
            return NextResponse.redirect(
                `${allowedBaseUrl.origin}/conversations/${existingConversation.sid}`
            );
        }

        // Create a new conversation
        const conversation = await client.conversations.v1
            .services(serviceSid)
            .conversations.create({ friendlyName: `${user1}-${user2}-dm` });

        // Add participants to the conversation
        await Promise.all(
            [user1, user2].map((identity) =>
                client.conversations.v1
                    .services(serviceSid)
                    .conversations(conversation.sid)
                    .participants.create({ identity })
            )
        );

        return NextResponse.redirect(
            `${allowedBaseUrl.origin}/conversations/${conversation.sid}`
        );
    } catch (error) {
        console.error("Error creating conversation:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}