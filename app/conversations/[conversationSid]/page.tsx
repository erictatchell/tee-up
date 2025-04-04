"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Client, Conversation, Message } from "@twilio/conversations";
import SendMessageForm from "@/app/components/conversations/SendMessageForm";

export default function ConversationPage() {
    const params = useParams();
    const conversationSid = params.conversationSid as string;

    const [messages, setMessages] = useState<Message[]>([]);
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        if (!conversationSid || typeof conversationSid !== "string") {
            setError("Invalid conversation ID");
            return;
        }

        const fetchTwilioToken = async () => {
            try {
                const response = await fetch("/api/twilio/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch token: ${response.statusText}`);
                }

                const { token, username } = await response.json();
                setUsername(username);

                return token;
            } catch (error) {
                console.error("Error fetching Twilio token:", error);
                setError("Failed to fetch Twilio token");
                throw error;
            }
        };

        const initializeTwilioClient = async () => {
            try {
                const token = await fetchTwilioToken();
                const twilioClient = new Client(token);

                // Set up event listeners
                twilioClient.on("messageAdded", (message) => {
                    setMessages((prev) => [...prev, message]);
                });

                twilioClient.on("conversationJoined", async (conv) => {
                    if (conv.sid === conversationSid) {
                        setConversation(conv);
                        const msgs = await conv.getMessages();
                        setMessages(msgs.items);
                    }
                });

                twilioClient.on("connectionStateChanged", (state) => {
                    if (state === "disconnected") {
                        setError("Twilio client disconnected");
                    }
                });

                // Fetch the conversation and its messages
                const conv = await twilioClient.getConversationBySid(conversationSid);
                setConversation(conv);

                const msgs = await conv.getMessages();
                setMessages(msgs.items);

                setClient(twilioClient);
            } catch (error) {
                console.error("Error initializing Twilio client:", error);
                setError("Failed to initialize Twilio client");
            }
        };

        initializeTwilioClient();

        // Cleanup event listeners on unmount
        return () => {
            if (client) {
                client.removeAllListeners();
            }
        };
    }, [conversationSid]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Conversation: {conversationSid}</h1>
            <ul className="w-full max-w-md">
                {messages.map((message) => (
                    <li key={message.sid} className="mb-2 p-2 border rounded">
                        <strong>{username}</strong>: {message.body}
                    </li>
                ))}
            </ul>
            <SendMessageForm conversation={conversation} username={username} />
        </div>
    );
}