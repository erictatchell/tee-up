"use client";
import { signIn } from "next-auth/react";
import MButton from "./components/misc/Button";

export default function Home() {

  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* Main Section - Full Screen */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 text-center">
        <h1 className="text-[69.33px]">TeeUp</h1>

        {/* Sign-in button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>

        {/* Original buttons: unchanged, just spaced below */}
        <div className="flex gap-4 mt-6">
          <MButton link="#how-it-works" text="How it Works" />
          <MButton link="/" text="Get Started" />

        </div>
      </main>
      {/* "How It Works" Section - Below the Fold */}
      <section id="how-it-works" className="w-full py-20 min-h-screen flex flex-col bg-teeUpGreen text-white text-center pt-16">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="flex-1 flex justify-between items-center mt-8 w-3/4 mx-auto">
          <p className="max-w-2xl text-lg text-left">
            Step 1: Create a profile detailing <br />
            playing preferences and handicap.
          </p>
          <p className="max-w-2xl text-lg text-left">
            Step 2: Match and chat with other <br />
            people based on these factors.
          </p>
          <p className="max-w-2xl text-lg text-left">
            Step 3: Meet up for the tee time! <br />
            Tee up and have fun!
          </p>
        </div>
      </section>
    </div>
  );
}
