import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { db } from '@/db';
import { users, orgs } from '@/db/schema';
import { type NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    // Get the headers
    const svix_id = req.headers.get('svix-id');
    const svix_timestamp = req.headers.get('svix-timestamp');
    const svix_signature = req.headers.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400
        });
    }

    const evt = await verifyWebhook(req);

    // Verify the webhook
    if (!evt) {
        console.error('Error verifying webhook');
        return new Response('Error occurred', {
            status: 400
        });
    }

    // Handle the webhook
    const eventType = evt.type;

    try {
        switch (eventType) {
            case 'user.created': {
                const { id, email_addresses, first_name, last_name, image_url } = evt.data;
                
                if (!id) {
                    return new Response('No user ID provided', { status: 400 });
                }

                const primaryEmail = email_addresses?.find(email => email.id === evt.data.primary_email_address_id);

                if (!primaryEmail) {
                    return new Response('No primary email found', { status: 400 });
                }

                await db.insert(users).values({
                    id: id,
                    email: primaryEmail.email_address,
                    firstName: first_name!,
                    lastName: last_name || null,
                    imageUrl: image_url || null,
                });

                return new Response('User created', { status: 200 });
            }

            case 'user.updated': {
                const { id, email_addresses, first_name, last_name, image_url } = evt.data;
                
                if (!id) {
                    return new Response('No user ID provided', { status: 400 });
                }

                const primaryEmail = email_addresses?.find(email => email.id === evt.data.primary_email_address_id);

                if (!primaryEmail) {
                    return new Response('No primary email found', { status: 400 });
                }

                await db.update(users)
                    .set({
                        email: primaryEmail.email_address,
                        firstName: first_name!,
                        lastName: last_name || null,
                        imageUrl: image_url || null,
                    })
                    .where(eq(users.id, id));

                return new Response('User updated', { status: 200 });
            }

            case 'user.deleted': {
                const { id } = evt.data;
                
                if (!id) {
                    return new Response('No user ID provided', { status: 400 });
                }

                await db.delete(users).where(eq(users.id, id));

                return new Response('User deleted', { status: 200 });
            }

            case 'organization.created': {
                const { id, name, slug, image_url } = evt.data;

                if (!id) {
                    return new Response('No org ID provided', { status: 400 });
                }

                await db.insert(orgs).values({
                    id: id,
                    name: name,
                    slug: slug,
                    logo: image_url
                });

                return new Response('Org created', { status: 200 });
            }

            case 'organization.updated': {
                const { id, name, slug, image_url } = evt.data;

                if (!id) {
                    return new Response('No org ID provided', { status: 400 });
                }

                await db.update(orgs).set({
                    name: name,
                    slug: slug,
                    logo: image_url
                });

                return new Response('Org updated', { status: 200 });
            }

            case 'organization.deleted': {
                const { id } = evt.data;

                if (!id) {
                    return new Response('No org ID provided', { status: 400 });
                }

                await db.delete(orgs).where(eq(orgs.id, id));

                return new Response('Org deleted', { status: 200 });
            }

            default:
                // Unhandled event type
                console.log(`Unhandled event type: ${eventType}`);
                return new Response(`Unhandled event type: ${eventType}`, { status: 200 });
        }
    } catch (error) {
        console.error(`Error processing ${eventType}:`, error);
        return new Response(`Error processing ${eventType}`, { status: 500 });
    }
} 