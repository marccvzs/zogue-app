import { auth, currentUser } from '@clerk/nextjs/server';
import AddPet from './_components/AddPet';
import { OrganizationSwitcher } from '@clerk/nextjs';
import Image from 'next/image';

const DashboardPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        return <div>Sign in to view this page</div>
    }

    const user = await currentUser();

    return (
        <div className="p-8 min-h-screen bg-stone-100">
            <div className="flex justify-between p-4">
                <h3 className="text-xl">Welcome, <span className="text-2xl font-semibold">{user?.firstName}</span></h3>
                <OrganizationSwitcher />
            </div>
            <div className="bg-stone-200 rounded-lg p-4">
                <AddPet />
            </div>
        </div>
    )
};

export default DashboardPage;
