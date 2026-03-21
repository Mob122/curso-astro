import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

// No funciona por el nombre del archivo.
// Demostración.


const privateRoutes = ['/protected']

export const onRequest = defineMiddleware(async ({ url, request }, next) => {
    console.log('¡Ejecutado en el middleware!');    
    // console.log( url );

    const authHeaders = request.headers.get('authorization') ?? '';
    console.log('Authorization Headers:', authHeaders );
    
    
    if ( privateRoutes.includes( url.pathname ) ) {
        // console.log('¡Ruta protegida! Verificando autenticación...');
        return checkLocalAuth( authHeaders, next );
        
    }

    return next();
})

const checkLocalAuth = ( authHeaders: string, next: MiddlewareNext ) => {
    if ( authHeaders ) {
        const authValue = authHeaders.split(' ').at(-1) ?? 'user:pass';
        const decodedValue = atob( authValue ).split(':');
        console.log('checkLocalAuth ~ decodedValue:', decodedValue);
        const [ username, password ] = decodedValue;
        
        if ( username === 'admin' && password === 'admin' ) {
            console.log('¡Autenticación exitosa! Accediendo a la ruta protegida...');
            return next();
        } 
    }
    
    return new Response('Autenticación requerida para acceder a esta ruta.', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic real="Secure Area"'
        }
    })
}