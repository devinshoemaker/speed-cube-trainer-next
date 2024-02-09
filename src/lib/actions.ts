'use server';

import { AuthError } from 'next-auth';

import { signIn, signOut, signUp } from '@/auth';

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signUp(formData);
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Something went wrong.';
  }

  return await authenticate(undefined, formData);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}
