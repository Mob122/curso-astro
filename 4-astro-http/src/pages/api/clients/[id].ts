import type { APIRoute } from "astro";
import { Clientes, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    const { id } = params;

    const cliente = await db.select().from(Clientes).where(eq(Clientes.id, Number(id)));


    return new Response(JSON.stringify(cliente), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

export const PUT: APIRoute = async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();

    await db.update(Clientes).set({
        name: body.name,
        age: body.age,
        isActive: body.isActive
    }).where(eq(Clientes.id, Number(id)));

    return new Response(JSON.stringify({success: true, ...body}), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

export const DELETE: APIRoute = async ({ params, request }) => {
    const { id } = params;

    await db.delete(Clientes).where(eq(Clientes.id, Number(id)));

    return new Response(JSON.stringify({success: true, id: Number(id)}), { status: 200, headers: { 'Content-Type': 'application/json' } })
}