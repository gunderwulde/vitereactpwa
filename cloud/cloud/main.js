const { OAuth2Client } = require('google-auth-library');

// Reemplaza esto con el Client ID que creaste en la Google Cloud Console
const GOOGLE_CLIENT_ID = '18500279777-ph0ieib0lg4grgvactbs0nqiohgast9k.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

Parse.Cloud.define("hello", () => {
    return "Hello from Cloud Code!";
});

Parse.Cloud.define("GoogleAuthSSO", async (request) => {
  const { idToken } = request.params;
  if (!idToken) {
    throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "El parámetro idToken es obligatorio.");
  }  
  try {
    const ticket = await client.verifyIdToken( { idToken: idToken, audience: GOOGLE_CLIENT_ID, } );
    if (!ticket) {
      throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "No se pudo verificar el token de Google.");
    }    
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "El ticket "+ticket+" no tiene payload.");
    }
    
    // 2. Extraer los datos seguros devueltos por Google
    const googleUserId = payload['sub']; // ID único y persistente del usuario en Google
    const email = payload['email'];
    const name = payload['name'];
    const picture = payload['picture'];

    const query = new Parse.Query(Parse.User);
    query.equalTo("googleId", googleUserId);
    let user = await query.first({ useMasterKey: true });

    // Generar una contraseña temporal y guardarla en variable para usar en el login
    const generatedPassword = Math.random().toString(36).substring(2) + Date.now().toString(36);
    let logged;

    if (!user) {
      // Nuevo usuario: crear y usar la misma contraseña temporal
      user = new Parse.User();
      user.set("username", email);
      user.set("email", email);
      user.set("name", name);
      user.set("profilePicture", picture);
      user.set("googleId", googleUserId);
      user.set("password", generatedPassword);
      await user.signUp(null, { useMasterKey: true });

      // Iniciar sesión con las credenciales recién creadas
      logged = await Parse.User.logIn(user.get("username"), generatedPassword);
    } else {
      // Usuario existente: asignar una contraseña temporal (con masterKey) y usarla para obtener sessionToken
      user.set("password", generatedPassword);
      await user.save(null, { useMasterKey: true });
      logged = await Parse.User.logIn(user.get("username"), generatedPassword);
    }    
    const sessionToken = logged.getSessionToken();

    return {
      status: "success",
      user: {
        objectId: user.id,
        googleId: user.get("googleId")
      },
      sessionToken: sessionToken
    };

  } catch (error) {
    throw new Parse.Error(Parse.Error.SCRIPT_FAILED, "Token de Google inválido o expirado: " + error.message);
  }
});

// Endpoint para invalidar sessionToken (logout)
Parse.Cloud.define("logout", async (request) => {
  const { sessionToken } = request.params;
  if (!sessionToken) {
    throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "El parámetro sessionToken es obligatorio.");
  }

  const query = new Parse.Query("_Session");
  query.equalTo("sessionToken", sessionToken);
  const session = await query.first({ useMasterKey: true });
  if (!session) {
    return { status: "not_found" };
  }

  await session.destroy({ useMasterKey: true });
  return { status: "success" };
});
