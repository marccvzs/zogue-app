import { fetchAccessToken } from '@/utils/auth';

let cachedToken: string | null = null;
let expiresAt: 0;

export const getAccessToken = async (): Promise<string> => {
    const now = Date.now() / 1000;
    if (!cachedToken || now >= expiresAt) {
        const { token, expiresIn } = await fetchAccessToken();
        cachedToken = token;
        expiresAt = now + expiresIn - 60;
    }

    return cachedToken;
};
