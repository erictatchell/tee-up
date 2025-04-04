// app/api/conversations/[conversationSid]/messages/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = new Twilio(accountSid, authToken);

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const conversationSid = segments[segments.indexOf("conversations") + 1];

  if (!conversationSid) {
    return NextResponse.json({ error: "Missing conversation ID" }, { status: 400 });
  }

  try {
    const messages = await client.conversations
      .v1.conversations(conversationSid)
      .messages.list({ limit: 20 });

    return NextResponse.json(
      {
        messages: messages.map((msg) => ({
          sid: msg.sid,
          from: msg.author,
          body: msg.body,
          dateCreated: msg.dateCreated,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const conversationSid = segments[segments.indexOf("conversations") + 1];

  if (!conversationSid) {
    return NextResponse.json({ error: "Missing conversation ID" }, { status: 400 });
  }

  const { body } = await req.json();

  if (!body || typeof body !== "string") {
    return NextResponse.json({ error: "Invalid message body" }, { status: 400 });
  }

  try {
    const message = await client.conversations
      .v1.conversations(conversationSid)
      .messages.create({ body });

    return NextResponse.json(
      { message: { sid: message.sid, body: message.body } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}