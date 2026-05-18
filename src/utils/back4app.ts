// Utilidad para llamar funciones cloud de Back4App

const BACK4APP_FUNCTIONS_URL = 'https://parseapi.back4app.com/functions';

const BACK4APP_HEADERS = {
  'X-Parse-Application-Id': 'LluQYMYcKy520CSPyFo7GNMUbVpWr0PQbg7bBkHB',
  'X-Parse-REST-API-Key': 'c5CNI5UcbiCdgPb9bxL2RP2oUnkEYo0Q7cK2FdJm',
  'Content-Type': 'application/json',
};

async function callBack4AppFunction<TResult>(functionName: string, params: Record<string, unknown> = {}) {
  const res = await fetch(`${BACK4APP_FUNCTIONS_URL}/${functionName}`, {
    method: 'POST',
    headers: BACK4APP_HEADERS,
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
  return callBack4AppFunction('authConGoogleToken', { idToken });
}

export async function callBack4AppHello() {
  return Hello();
}
