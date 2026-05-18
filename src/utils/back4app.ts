// Utilidad para llamar funciones cloud de Back4App

export async function callBack4AppHello() {
  const res = await fetch('https://parseapi.back4app.com/functions/hello', {
    method: 'POST',
    headers: {
      'X-Parse-Application-Id': 'LluQYMYcKy520CSPyFo7GNMUbVpWr0PQbg7bBkHB', // Reemplaza por tu App ID
      'X-Parse-REST-API-Key': 'c5CNI5UcbiCdgPb9bxL2RP2oUnkEYo0Q7cK2FdJm', // Reemplaza por tu API Key
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en Back4App');
  return data.result;
}
