import { NextRequest, NextResponse } from "next/server";
import { jwt } from "twilio";
import { auth } from "@/auth";

const { TWILIO_ACCOUNT_SID, TWILIO_CONVERSATION_SERVICE_SID, TWILIO_API_KEY, TWILIO_API_SECRET } = process.env;

// Extract AccessToken and ChatGrant

const { AccessToken } = jwt;
const { ChatGrant } = AccessToken;

/**
 * Handles the POST request to generate a Twilio Access Token for Web Sockets.
 *
 * @param req - The incoming HTTP request object of type `NextRequest`.
 * @returns A `NextResponse` containing the generated Twilio Access Token and the authenticated user's username,
 *          or an error response if authentication or required parameters are missing.
 *
 * @remarks
 * - This function requires the user to be authenticated. If the user is not authenticated, a 401 Unauthorized response is returned.
 * - The function generates a Twilio Access Token with a TTL (time-to-live) of 3600 seconds (1 hour).
 * - A Chat Grant is attached to the token, which is associated with the Twilio Conversation Service SID.
 * - The function expects the following environment variables to be defined:
 *   - `TWILIO_ACCOUNT_SID`: The Twilio Account SID.
 *   - `TWILIO_API_KEY`: The Twilio API Key.
 *   - `TWILIO_API_SECRET`: The Twilio API Secret.
 *   - `TWILIO_CONVERSATION_SERVICE_SID`: The Twilio Conversation Service SID.
 *
 * @throws
 * - Returns a 400 Bad Request response if the authenticated user's identity is missing.
 * - Returns a 401 Unauthorized response if the user is not authenticated.
 */
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

    // Create a new Twilio Access Token for Web Sockets
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
