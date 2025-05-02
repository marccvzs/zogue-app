import { auth, currentUser } from '@clerk/nextjs/server';
import AddPet from './_components/AddPet';
import { OrganizationSwitcher } from '@clerk/nextjs';

const DashboardPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        return <div>Sign in to view this page</div>
    }

    const user = await currentUser();

    return (
        <div className="p-8 min-h-screen">
            <div className="flex justify-between">
                <h3>Welcome <span className="text-2xl font-semibold">{user?.firstName}</span></h3>
                <OrganizationSwitcher />
            </div>
            <div>
                <AddPet />
            </div>
        </div>
    )
};

export default DashboardPage;
