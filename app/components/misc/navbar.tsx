import Image from "next/image";
import Link from "next/link";

import MButton from "./MButton";

export default async function NavBar() {

  return (
    <header className="absolute top-0 left-0 w-full p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/logo_draft.png"
            alt="Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </Link>
        <MButton link="/profile" text="Profile" />
      </div>
    </header>
  );
}
