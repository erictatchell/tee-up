import Button from "../components/misc/button";
import Image from "next/image";
import users from "../../data/users.json";

export default function Profile() {
  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      {/* Main Section - Full Screen */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 text-center">
        <Image
        src="/images/empty_profile.png" 
        alt="empty profile pic"
        width={200}
        height={200}
        />
        <label>{users[0].name}</label>
        <label>{users[0].email}</label>
      </main>
    </div>
  );
}
