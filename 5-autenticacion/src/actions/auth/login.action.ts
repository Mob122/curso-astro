import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
import { firebase } from "src/firebase/config";

export const loginUser =  defineAction({
    accept: 'form',
    input: z.object({
        email: z.email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional()
    }),
    handler: async ({ email, password, remember_me }, { cookies }) => {
        if (remember_me) {
            cookies.set('email', email, {
                expires: new Date (Date.now() + 7 * 24 * 60 * 60 * 1000), // Expira en 7 días.
                path: '/'
            })
         } else {
            cookies.delete('email', { path: '/' });
         }

        try {
            const user = await signInWithEmailAndPassword(firebase.auth, email, password);

            return {
                ok: true,
                id: user.user.uid,
                email: user.user.email
            }

        } catch (error) {
            const firebaseError = error as AuthError;
            if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
                throw new Error('Correo electrónico o contraseña incorrectos');
            }

            throw new Error('Error al iniciar sesión, por favor intenta de nuevo');
        }

    }
})