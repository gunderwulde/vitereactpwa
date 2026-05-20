import { GetSession, ClearSession, SetSession } from './session';

const BACK4APP_FUNCTIONS_URL = 'https://parseapi.back4app.com/functions';

const BACK4APP_HEADERS = {
  'X-Parse-Application-Id': 'LluQYMYcKy520CSPyFo7GNMUbVpWr0PQbg7bBkHB',
  'X-Parse-REST-API-Key': 'c5CNI5UcbiCdgPb9bxL2RP2oUnkEYo0Q7cK2FdJm',
  'Content-Type': 'application/json',
};

async function callBack4AppFunction<TResult>(functionName: string, params: Record<string, unknown> = {}) {
  // Intentar obtener sessionToken desde cookie o localStorage (cliente)
  const headers: Record<string, string> = { ...BACK4APP_HEADERS };
  const sessionToken = GetSession()?.sessionToken;
  if (sessionToken) headers['X-Parse-Session-Token'] = sessionToken;
  const res = await fetch(`${BACK4APP_FUNCTIONS_URL}/${functionName}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en Back4App');

  return data.result as TResult;
}


export async function validateSession() {
  const token = GetSession()?.sessionToken;
  if (!token) return null;

  const res = await fetch('https://parseapi.back4app.com/users/me', {
    method: 'GET',
    headers: {
      ...BACK4APP_HEADERS,
      'X-Parse-Session-Token': token,
    },
  });
  if (!res.ok) return null;
  const session = { user: await res.json(), sessionToken: token };
  SetSession(session);
  return session;
}

export async function ValidateGoogleToken(idToken: string) {
  const res: any = await callBack4AppFunction('ValidateGoogleToken', { idToken });
  if(res && res.sessionToken) SetSession(res);
  return res;
}

export async function Logout() {
  const token =  GetSession()?.sessionToken;
  if (!token) return;
  ClearSession();
  return await callBack4AppFunction('logout', { sessionToken: token });
}
