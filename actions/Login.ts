"use server";

import { LoginSchema } from '@/schemas/AuthValidation';
import * as z from 'zod'
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export interface LoginResult {
    error?: string;
    success?: string;
}

export const login = async (values: z.infer<typeof LoginSchema>): Promise<LoginResult | undefined> => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!"
        };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid login credentials!"
                    }
                default:
                    return {
                        error: "An error occurred while attempting to sign you in."
                    }
            }
        }

        throw error;
    }
};