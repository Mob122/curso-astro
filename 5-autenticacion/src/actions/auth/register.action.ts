import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from "firebase/auth";
import { firebase } from "src/firebase/config";


export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(2, 'Name is required'),
        email: z.email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        remember_me: z.boolean().optional()
    }),
    handler: async ({ name, password, remember_me, email }, { cookies }) => {
         if (remember_me) {
            cookies.set('email', email, {
                expires: new Date (Date.now() + 7 * 24 * 60 * 60 * 1000), // Expira en 7 días.
                path: '/'
            })
         } else {
            cookies.delete('email', { path: '/' });
         }

         // Creación de usuario.
         try {

            const user = await createUserWithEmailAndPassword(firebase.auth, email, password);

            if ( firebase.auth.currentUser ) {
                // Actualizar el nombre (displayName) del usuario.
                updateProfile(firebase.auth.currentUser, {
                    displayName: name
                })

                // Verificar el correo electrónico del usuario.
                await sendEmailVerification(firebase.auth.currentUser, {
                    url: 'http://localhost:4321/protected?emailVerified=true' // URL a la que se redirigirá al usuario después de verificar su correo electrónico.
                });
            }



            return {
                ok: true,
                id: user.user.uid,
                email: user.user.email
            }

         } catch (error) {
            // console.log(error);
            const firebaseError = error as AuthError;

            if ( firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('El correo electrónico ya está en uso');
            }            
        }        
    }
})