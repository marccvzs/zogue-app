import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
        <div>
            <Link href="/">
                <h1 className="text-4xl font-semibold">Zogu&euml;</h1>
            </Link>
        </div>
        <div>
            <SignedOut>
                <SignInButton />
                <SignUpButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </header>
);

export default Header;
