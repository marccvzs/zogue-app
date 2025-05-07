import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Header = () => (
  <header className="flex justify-between items-center p-4 gap-4 h-16 sticky top-0 bg-primary shadow-md  text-white">
    <div>
      <Link href="/">
        <h1 className="text-4xl font-semibold text-shadow-lg/20 tracking-tight text-pastel-yellow">Zogu&euml;</h1>
      </Link>
    </div>
    <div className="hidden md:block">
      <SignedIn>
        <nav>
          <ul className="flex gap-8 font-semibold">
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/pets">Pets</Link></li>
            <li>Timeline</li>
            <li>Messages</li>
          </ul>
        </nav>
      </SignedIn>
    </div>
    <SignedOut>
      <div className="flex gap-2 font-semibold">
        <SignInButton><Button>Log In</Button></SignInButton>
        <SignUpButton />
      </div>
    </SignedOut>
    <SignedIn>
      <div className="flex justify-between items-center">
        <div>
          <UserButton />
        </div>
      </div>
    </SignedIn>
  </header>
);

export default Header;
