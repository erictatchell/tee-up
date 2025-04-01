"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConversationsPage() {

    const [user1, setUser1] = useState("");
    const [user2, setUser2] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const router = useRouter();

    const startConversation = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch("/api/conversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user1, user2 }),
            });

            if (!res.ok) {
                throw new Error("Failed to start conversation");
            }

            const data = await res.json();
            router.push(`/conversations/${data.conversationSid}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Start a Conversation</h1>
            <input
                type="text"
                placeholder="User 1"
                value={user1}
                onChange={(e) => setUser1(e.target.value)}
                className="mb-2 p-2 border rounded"
            />
            <input
                type="text"
                placeholder="User 2"
                value={user2}
                onChange={(e) => setUser2(e.target.value)}
                className="mb-2 p-2 border rounded"
            />
            <button
                onClick={startConversation}
                disabled={loading}
                className={`p-2 bg-blue-500 text-white rounded ${loading ? "opacity-50" : ""}`}
            >
                {loading ? "Loading..." : "Start Conversation"}
            </button>
        </div>
    );
}