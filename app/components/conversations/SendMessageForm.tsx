"use client";

import { useState } from "react";

export default function SendMessageForm({
    conversationSid,
    addMessage,
}: {
    conversationSid: string;
    addMessage: (message: any) => void;
}) {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/conversations/${conversationSid}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ body: message }),
            });

            if (!response.ok) throw new Error("Failed to send message");

            const data = await response.json();
            // Optimistically update the state with the new message
            addMessage({ sid: data.message.sid, from: "You", body: data.message.body });

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