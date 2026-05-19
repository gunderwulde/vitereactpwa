// Utilidad para llamar funciones cloud de Back4App

const BACK4APP_FUNCTIONS_URL = 'https://parseapi.back4app.com/functions';

const BACK4APP_HEADERS = {
  'X-Parse-Application-Id': 'LluQYMYcKy520CSPyFo7GNMUbVpWr0PQbg7bBkHB',
  'X-Parse-REST-API-Key': 'c5CNI5UcbiCdgPb9bxL2RP2oUnkEYo0Q7cK2FdJm',
  'Content-Type': 'application/json',
};

async function callBack4AppFunction<TResult>(functionName: string, params: Record<string, unknown> = {}) {
  // Intentar obtener sessionToken desde cookie o localStorage (cliente)
  function getSessionToken(): string | null {
    try {
      // Buscar en cookies
      if (typeof document !== 'undefined' && document.cookie) {
        const match = document.cookie.match(/(?:^|; )sessionToken=([^;]+)/);
        if (match) return decodeURIComponent(match[1]);
      }
    } catch {}
    try {
      if (typeof localStorage !== 'undefined') {
        const t = localStorage.getItem('sessionToken');
        if (t) return t;
      }
    } catch {}
    return null;
  }
  const headers: Record<string, string> = { ...BACK4APP_HEADERS };
  const sessionToken = getSessionToken();
  if (sessionToken) headers['X-Parse-Session-Token'] = sessionToken;
  console.log('Calling Back4App function', functionName, 'with params', params, 'and sessionToken', sessionToken);
  const res = await fetch(`${BACK4APP_FUNCTIONS_URL}/${functionName}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en Back4App');

  return data.result as TResult;
}

export async function Hello() {
  return callBack4AppFunction<string>('hello');
}

export async function AuthGoogleToken(idToken: string) {
  return callBack4AppFunction('GoogleAuthSSO', { idToken });
}

export async function callBack4AppHello() {
  return Hello();
}

export async function Logout(sessionToken: string) {
  return callBack4AppFunction('logout', { sessionToken });
}

export function setClientSessionCookie(sessionToken: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `sessionToken=${encodeURIComponent(sessionToken)}; Expires=${expires}; Path=/; Secure; SameSite=Lax`;
}

export function clearClientSessionCookie() {
  document.cookie = `sessionToken=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Secure; SameSite=Lax`;
}

export function getClientSessionToken(): string | null {
  try {
    if (typeof document !== 'undefined' && document.cookie) {
      const match = document.cookie.match(/(?:^|; )sessionToken=([^;]+)/);
      if (match) return decodeURIComponent(match[1]);
    }
  } catch {}
  try {
    if (typeof localStorage !== 'undefined') {
      const t = localStorage.getItem('sessionToken');
      if (t) return t;
    }
  } catch {}
  return null;
}

export async function validateSession(sessionToken?: string) {
  const token = sessionToken || getClientSessionToken();
  if (!token) return null;

  const res = await fetch('https://parseapi.back4app.com/users/me', {
    method: 'GET',
    headers: {
      ...BACK4APP_HEADERS,
      'X-Parse-Session-Token': token,
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  console.log('validateSession data:', data);
  return { user: data, sessionToken: token };
}
