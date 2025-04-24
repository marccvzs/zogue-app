import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';

const Header = () => (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
        <div>
            <h1 className="text-4xl font-semibold">Zogu&euml;</h1>
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
