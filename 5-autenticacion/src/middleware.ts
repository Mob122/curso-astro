import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ['/protected'];
const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(async ({ url, request, locals, redirect }, next) => {
    const esLogeado = !!firebase.auth.currentUser; // !! se utiliza para convertir el valor a un booleano. Si firebase.auth.currentUser es null o undefined, esLogeado será false. Si firebase.auth.currentUser tiene un valor (es decir, el usuario está autenticado), esLogeado será true por lo que hace la doble negación en un ejemplo es el siguiente: const valor = "hola"; console.log(!!valor); // true porque "hola" es un string no vacío, lo que se considera un valor "truthy" en JavaScript. En cambio, si tuvieras const valor = ""; console.log(!!valor); // false porque una cadena vacía se considera un valor "falsy". Otros valores "falsy" incluyen 0, null, undefined, NaN y false.
    const user = firebase.auth.currentUser;
    locals.isLoggedIn = esLogeado;

    if ( user ) {
        locals.user = {
            avatar: user.photoURL ?? '',
            email: user.email!,
            name: user.displayName!,
            emailVerified: user.emailVerified
        }
    }

    if ( !esLogeado && privateRoutes.includes(url.pathname) ) {
        return redirect('/');
    }

    if ( esLogeado && notAuthenticatedRoutes.includes(url.pathname) ) {
        return redirect('/protected');
    }


    return next();
})

