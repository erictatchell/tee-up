"use client";

import { useState } from "react";
import { Conversation } from "@twilio/conversations";

/**
 * A React component that renders a form for sending messages within a conversation.
 *
 * @param {Object} props - The props object.
 * @param {Conversation | null} props.conversation - The conversation object to which the message will be sent. If null, the form will not send messages.
 * @param {string | null} props.username - The username of the sender, used to identify the sender in the message attributes.
 *
 * @returns {JSX.Element} The rendered SendMessageForm component.
 *
 * @remarks
 * - The component maintains a local state `message` to track the input value.
 * - The `handleSubmit` function prevents the default form submission behavior, validates the input, and sends the message using the `conversation.sendMessage` method.
 * - If the message is successfully sent, the input field is cleared.
 * - If an error occurs during message sending, it is logged to the console.
 *
 * @example
 * ```tsx
 * <SendMessageForm conversation={activeConversation} username="john_doe" />
 * ```
 */
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

        // Send message to the other user
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