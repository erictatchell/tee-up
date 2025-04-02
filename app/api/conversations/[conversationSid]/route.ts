import { NextRequest, NextResponse } from "next/server";
import { Twilio } from "twilio";
import { auth } from "@/auth";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const serviceSid = process.env.TWILIO_CONVERSATION_SERVICE_SID as string;
const client = new Twilio(accountSid, authToken);

export async function GET(req: NextRequest, context: { params: { conversationSid: string } }) {

    const { params } = context;
    const conversationSid = params?.conversationSid;

    if (!conversationSid) {
        console.log("Missing conversation ID", conversationSid);
        return NextResponse.json({ error: "Missing conversation ID" }, { status: 400 });
    }

    try {
        const messages = await client.conversations
            .v1.services(serviceSid)
            .conversations(conversationSid)
            .messages.list({ limit: 20 });

        return NextResponse.json({
            messages: messages.map((msg) => ({
                sid: msg.sid,
                from: msg.author,
                body: msg.body,
                dateCreated: msg.dateCreated,
            })),
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest, context: { params: { conversationSid: string } }) {

    const { params } = context;
    const conversationSid = params?.conversationSid;

    if (!conversationSid) {
        console.log("Missing conversation ID", conversationSid);
        return NextResponse.json({ error: "Missing conversation ID" }, { status: 400 });
    }

    if (!conversationSid) {
        console.log("Missing conversation ID", conversationSid);
        return NextResponse.json({ error: "Missing conversation ID" }, { status: 400 });
    }

    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const senderName = session.user.name; // Get the user's name from session

    const { body } = await req.json();

    if (!body || typeof body !== "string") {
        return NextResponse.json({ error: "Invalid message body" }, { status: 400 });
    }

    if (!body || typeof body !== "string") {
        console.log("Invalid message body", body);
        return NextResponse.json({ error: "Invalid message body" }, { status: 400 });
    }

    try {

        const message = await client.conversations
            .v1.services(serviceSid)
            .conversations(conversationSid)
            .messages
            .create({
                body: body,
                author: senderName,
            });

        return NextResponse.json({ message: { sid: message.sid, body: message.body } }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}