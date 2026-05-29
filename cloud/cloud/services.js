const { OAuth2Client } = require('google-auth-library');

// Reemplaza esto con el Client ID que creaste en la Google Cloud Console
const GOOGLE_CLIENT_ID = '18500279777-ph0ieib0lg4grgvactbs0nqiohgast9k.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

Parse.Cloud.define("ValidateGoogleToken", async (request) => {
  const { idToken } = request.params;
  if (!idToken) {
    throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "El parámetro idToken es obligatorio.");
  }
  try {
    const ticket = await client.verifyIdToken({ idToken: idToken, audience: GOOGLE_CLIENT_ID });
    if (!ticket) {
      throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "No se pudo verificar el token de Google.");
    }
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "El ticket " + ticket + " no tiene payload.");
    }

    const googleUserId = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];
    const picture = payload['picture'];

    const query = new Parse.Query(Parse.User);
    query.equalTo("googleId", googleUserId);
    let user = await query.first({ useMasterKey: true });

    const generatedPassword = Math.random().toString(36).substring(2) + Date.now().toString(36);
    let logged;

    if (!user) {
      user = new Parse.User();
      user.set("username", email);
      user.set("email", email);
      user.set("name", name);
      user.set("profilePicture", picture);
      user.set("googleId", googleUserId);
      user.set("password", generatedPassword);
      await user.signUp(null, { useMasterKey: true });

      logged = await Parse.User.logIn(user.get("username"), generatedPassword);
    } else {
      user.set("password", generatedPassword);
      await user.save(null, { useMasterKey: true });
      logged = await Parse.User.logIn(user.get("username"), generatedPassword);
    }
    const sessionToken = logged.getSessionToken();

    return {
      status: "success",
      user: {
        objectId: user.id,
        name: user.get("name")
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

// Función Cloud que devuelve datos estáticos (placeholder) de plantas, grupos y equipos
