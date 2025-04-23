import { createUploadthing, type FileRouter } from 'uploadthing/server';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeid' });

export const ourFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: '1GB',
            maxFileCount: 1,
        },
    })
    .middleware(async ({ req }) => {
        const user = await auth(req);

        if (!user) throw new UploadThingError('Unauthorized');

        return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log('Upload complete for userId: ', metadata.userId);

        console.log('file url', file.ufsUrl);

        return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
