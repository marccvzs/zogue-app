import { auth, currentUser } from '@clerk/nextjs/server';

const DashboardPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        return <div>Sign in to view this page</div>
    }

    const user = await currentUser();

    return (
        <div className="p-8 min-h-screen">
            <div>
                <h3>{`Welcome ${user?.firstName}!`}</h3>
            </div>
        </div>
    )
};

export default DashboardPage;
