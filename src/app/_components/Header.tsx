import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => (
  <header className="flex justify-between items-center p-4 gap-4 h-16">
    <div>
      <Link href="/">
        <h1 className="text-4xl font-semibold">Zogu&euml;</h1>
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
      <SignInButton />
      <SignUpButton />
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
