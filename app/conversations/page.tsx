import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * ConversationsPage is an asynchronous React component that renders a page
 * for starting a new conversation. It ensures that the user is authenticated
 * before allowing access to the page. If the user is not authenticated, they
 * are redirected to the home page.
 *
 * @async
 * @function
 * @returns {JSX.Element} A JSX element representing the conversation creation page.
 *
 * @remarks
 * - The component uses the `auth` function to retrieve the current session.
 * - If the session does not contain a valid user ID, the user is redirected to "/".
 * - The page includes a form that submits a POST request to the `/api/conversations` endpoint
 *   to initiate a new conversation.
 *
 * @example
 * // Example usage:
 * // This component is used as a page in a Next.js application.
 * import ConversationsPage from './conversations/page';
 *
 * @dependencies
 * - `auth`: A function to retrieve the current session.
 * - `redirect`: A function to handle client-side redirection.
 *
 * @form
 * - The form includes:
 *   - A hidden input field (`user1`) pre-filled with the authenticated user's ID.
 *   - A text input field (`user2`) for entering the recipient's ID.
 *   - A submit button to start the conversation.
 *
 * @styles
 * - The component uses Tailwind CSS classes for styling.
 *   - `flex`, `flex-col`, `items-center`, `justify-center`, `min-h-screen`, `p-4` for layout.
 *   - `text-2xl`, `font-bold`, `mb-4` for the heading.
 *   - `mb-2`, `p-2`, `border`, `rounded` for the input field.
 *   - `p-2`, `bg-blue-500`, `text-white`, `rounded`, `hover:bg-blue-600`, `transition-colors` for the button.
 */
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