import { signIn } from "@/auth";
import Image from 'next/image'

const LoginBox = () => {
    return (
        <form
            action={async () => {
                'use server'
                await signIn("google", { redirectTo: "/" });
            }}
            className="flex p-10 bg-white border border-black border-2 rounded-lg items-center"
        >
            <button>
                Sign in with Google
            </button>

        </form>
    )
}
export default LoginBox;