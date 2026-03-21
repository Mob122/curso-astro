import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { signInWithCredential } from "firebase/auth";
import { firebase } from "src/firebase/config";

export const loginWithGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async (credentials) => {
        const credenciales = GoogleAuthProvider.credentialFromResult(credentials); // Obtener las credenciales de Google a partir del resultado de la autenticación ya una cosa es que se obtiene del cliente (login.astro) y otra cosa es que se obtenga en el servidor (actions). En el cliente, se obtiene el resultado de la autenticación con Google a través de un popup, mientras que en el servidor, se obtiene a través de la acción definida aquí.

        if ( !credenciales ) {
            throw new Error('No se pudieron obtener las credenciales de Google');
        }

        await signInWithCredential(firebase.auth, credenciales);
        
        return { 
            ok: true
        }
    }
})
