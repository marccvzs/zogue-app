import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => (
  <header className="flex justify-between items-center p-4 gap-4 h-16 sticky top-0 bg-primary shadow-xl">
    <div>
      <Link href="/">
        <h1 className="text-4xl font-semibold text-shadow-lg/20">Zogu&euml;</h1>
      </Link>
    </div>
    <SignedIn>
      <nav>
        <ul className="flex gap-2">
          <li>Events</li>
          <li>Pets</li>
          <li>Timeline</li>
          <li>Messages</li>
        </ul>
      </nav>
    </SignedIn>
    <SignedOut>
      <div className="flex gap-2">
        <SignInButton />
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
