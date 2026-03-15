import type {  APIRoute } from 'astro';
import { Clientes, db } from 'astro:db';

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
    const body = await request.json();

    await db.insert(Clientes).values({
        id: body.id,
        name: body.name,
        age: body.age,
        isActive: body.isActive
    });    

    return new Response(JSON.stringify({success: true, ...body}), { status: 201, headers: { 'Content-Type': 'application/json' } } );
}