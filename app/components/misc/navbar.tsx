import Image from "next/image";
import Button from "./button";

export default function NavBar() {
  return (
    <header className="absolute top-0 left-0 w-full p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3">
          <Image 
            src="/images/logo_draft.png" 
            alt="Logo" 
            width={60} 
            height={60} 
            className="rounded-full"
          />
        </a>
        {/* TODO: Add distinct navigation for authenticated users */}
        <Button link="/" text="Sign in with Google" />
      </div>
    </header>
  );
}
