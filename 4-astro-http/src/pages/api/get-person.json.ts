import type {  APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {

    const persona = {
        name: 'Martin Reyes',
        edad: 22
    }

    return new Response( JSON.stringify(persona), { status: 201, headers: { 'Content-Type': 'application/json' } } );
}