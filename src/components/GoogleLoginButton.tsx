import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useState } from 'react';


const GoogleLoginButton = () => {
  const [user, setUser] = useState<any>(() => {
    // Intenta cargar el token de Google del localStorage
    const token = localStorage.getItem('google_token');
    return token ? { credential: token } : null;
  });


  return (
    <div>
      {user ? (
        <div>
          <p>¡Bienvenido! Has iniciado sesión con Google.</p>

          <button
            onClick={() => {
              googleLogout();
              setUser(null);
              localStorage.removeItem('google_token');

            }}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={credentialResponse => {
            setUser(credentialResponse);
            if (credentialResponse.credential) {
              localStorage.setItem('google_token', credentialResponse.credential);
            }
          }}
          onError={() => {
            alert('Error al iniciar sesión con Google');
          }}
        />
      )}
    </div>
  );
};

export default GoogleLoginButton;
