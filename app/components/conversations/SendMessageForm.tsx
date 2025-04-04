"use client";

import { useState } from "react";
import { Conversation } from "@twilio/conversations";

export default function SendMessageForm({
    conversation,
    username,
}: {
    conversation: Conversation | null;
    username: string | null
}) {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!conversation || !message.trim()) return;

        try {
            await conversation.sendMessage(message, { attributes: JSON.stringify({ from: username }) });
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center mt-4">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="border rounded p-2 flex-grow mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white rounded p-2">
                Send
            </button>
        </form>
    );
}