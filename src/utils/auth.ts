export const fetchAccessToken = async (): Promise<{
    token: string;
    expiresIn: number;
}> => {
    const res = await fetch(`https://api.petfinder.com/v2/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.PETFINDER_API!,
            client_secret: process.env.PETFINDER_SECRET!,
        }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch access token');
    }

    const data = await res.json();

    return {
        token: data.access_token,
        expiresIn: data.expires_in,
    };
};
