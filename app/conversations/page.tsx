import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ConversationsPage() {

    const session = await auth();

    if (!session?.user?.id) {
        redirect("/");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Start a Conversation</h1>
            <form method="POST" action="/api/conversations" className="flex flex-col w-full max-w-md">
                <input
                    type="hidden"
                    name="user1"
                    value={session.user.id}
                />
                <input
                    type="text"
                    name="user2"
                    placeholder="Recipient ID"
                    required
                    className="mb-2 p-2 border rounded"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Start Conversation
                </button>
            </form>
        </div>
    );
}