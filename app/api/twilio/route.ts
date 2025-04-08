import { NextRequest, NextResponse } from "next/server";
import { jwt } from "twilio";
import { auth } from "@/auth";

const { TWILIO_ACCOUNT_SID, TWILIO_CONVERSATION_SERVICE_SID, TWILIO_API_KEY, TWILIO_API_SECRET } = process.env;

// Extract AccessToken and ChatGrant

const { AccessToken } = jwt;
const { ChatGrant } = AccessToken;

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const identity = session.user.id; // Authenticated user ID
    const username = session.user.name // Authenticated user name

    if (!identity) {
        return NextResponse.json({ error: "Missing identity" }, { status: 400 });
    }

    // Create a new Twilio Access Token
    const token = new AccessToken(TWILIO_ACCOUNT_SID!, TWILIO_API_KEY!, TWILIO_API_SECRET!, {
        ttl: 3600,
        identity,
    });

    // Attach the Chat Grant
    const chatGrant = new ChatGrant({
        serviceSid: TWILIO_CONVERSATION_SERVICE_SID!,
    });

    token.addGrant(chatGrant);

    return NextResponse.json({ token: token.toJwt(), username });
}
