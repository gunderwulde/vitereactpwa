import { GoogleLogin } from '@react-oauth/google';
import { AuthGoogleToken, setClientSessionCookie } from '../utils/back4app';

interface Props {
  onSuccess: (user: any, sessionToken: string) => void;
}

const LoginModal = ({ onSuccess }: Props) => {
  return (
    <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}}>
      <div style={{ width: 420, padding: 20, background: '#fff', borderRadius: 8, position: 'relative' }}>
        <h3>Iniciar sesión</h3>
        <p>Usa Google SSO para iniciar sesión y obtener una sesión válida de Parse.</p>
        <div style={{ marginTop: 12 }}>
          <GoogleLogin
            onSuccess={async credentialResponse => {
              if (credentialResponse.credential) {
                try {
                  const res: any = await AuthGoogleToken(credentialResponse.credential);
                  if (res && res.sessionToken) {
                    setClientSessionCookie(res.sessionToken, 7);
                    onSuccess(res.user || null, res.sessionToken);
                  } else {
                    alert('No se obtuvo sessionToken de Back4App');
                  }
                } catch (e: any) {
                  alert('Error al autenticar en Back4App: ' + (e?.message || e));
                }
              }
            }}
            onError={() => alert('Error al iniciar sesión con Google')}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
