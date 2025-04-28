import { auth } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/server';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: '1GB',
            maxFileCount: 1,
        },
    })
    .middleware(async () => {
        const { userId } = await auth();

        if (!userId) throw new UploadThingError('Unauthorized');

        return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log('Upload complete for userId: ', metadata.userId);

        console.log('file url', file.ufsUrl);

        return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
