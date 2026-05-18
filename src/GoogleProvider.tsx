import { GoogleOAuthProvider } from '@react-oauth/google';
import type { ReactNode } from 'react';

// Reemplaza esta variable con tu Client ID de Google
const GOOGLE_CLIENT_ID = '18500279777-ph0ieib0lg4grgvactbs0nqiohgast9k.apps.googleusercontent.com';

const GoogleProvider = ({ children }: { children: ReactNode }) => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    {children}
  </GoogleOAuthProvider>
);

export default GoogleProvider;
