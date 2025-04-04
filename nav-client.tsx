
"use client";

import { signIn, signOut } from "next-auth/react";

import MButton from "./app/components/misc/button";
interface NavClientProps {
  name?: string;
}

const NavClient: React.FC<NavClientProps> = ({ name }) => {
  return (
    <>
      {!name ? (
        <button
          type="submit"
          className="p-2 bg-blue-700 w-[60%] mx-auto rounded-md hover:bg-blue-800"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/profile",
            })
          }
        >
          Login with Google
        </button>
      ) : (
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Sign out
        </button>
      )}
    </>
  );
};

export default NavClient;
