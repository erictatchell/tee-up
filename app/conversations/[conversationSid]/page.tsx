"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import SendMessageForm from "@/app/components/conversations/SendMessageForm";

export default function ConversationPage() {

    const params = useParams();
    const conversationSid = params.conversationSid as string;
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (!conversationSid) {
            setError("Invalid conversation ID");
            setLoading(false);
            return;
        }

        const fetchMessages = async () => {
            try {
                console.log(conversationSid);
                const res = await fetch(`/api/conversations/${conversationSid}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch messages");
                }
                const data = await res.json();
                setMessages(data.messages);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [conversationSid]);

    const addMessage = (message: any) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Conversation: {conversationSid}</h1>
            <ul className="w-full max-w-md">
                {messages.map((message) => (
                    <li key={message.sid} className="mb-2 p-2 border rounded">
                        <strong>{message.from}</strong>: {message.body}
                    </li>
                ))}
            </ul>
            <SendMessageForm conversationSid={conversationSid as string} addMessage={(msg) => setMessages((prev) => [msg, ...prev])} />
        </div>
    );
}    