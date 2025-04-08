import { signIn as nextAuthSignIn } from "next-auth/react";

// ✅ Wrapper function
export const signIn = (provider: string) => {
  return nextAuthSignIn(provider);
};
