'use server';

import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';

import { signIn, signUp } from '@/auth';

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

    console.log('Something went wrong.', error);
    return 'Something went wrong.';
  }

  return await authenticate(undefined, formData);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  formData.append('redirectTo', '/dashboard');

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          console.log('Something went wrong.', error.message);
          return 'Something went wrong.';
      }
    }

    // Something is weird here and throws a NEXT_REDIRECT error
    // even though everything works fine. This prevents the
    // error from making it to the user or the console.
    if (isRedirectError(error)) {
      throw error;
    }

    console.log('Something went wrong.', error);
    return 'Something went wrong.';
  }
}
