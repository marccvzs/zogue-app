import { auth, currentUser } from '@clerk/nextjs/server';
import AddPet from './_components/AddPet';
import { OrganizationSwitcher } from '@clerk/nextjs';
import { createServerSupabaseClient } from '../ssr/client';
import AppointmentCalendar from '../_components/AppointmentCalendar';

const DashboardPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        return <div>Sign in to view this page</div>
    }

    const client = createServerSupabaseClient();

    const { data: pets, error } = await client.from('pets').select().eq('user_id', userId);

    const user = await currentUser();

    return (
        <div className="p-8 min-h-screen bg-stone-100 flex flex-col gap-4">
            <div className="flex justify-between p-4">
                <h3 className="text-xl">Welcome, <span className="text-2xl font-semibold">{user?.firstName}</span></h3>
                <OrganizationSwitcher />
            </div>
            <div className="bg-pastel-blue rounded-lg p-4 shadow-lg">
                <AddPet />
            </div>
            <div className="bg-stone-200 rounded-lg p-4 w-fit shadow-lg">
                <AppointmentCalendar />
            </div>
        </div>
    )
};

export default DashboardPage;
