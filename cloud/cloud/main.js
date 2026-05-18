const { OAuth2Client } = require('google-auth-library');

// Reemplaza esto con el Client ID que creaste en la Google Cloud Console
const GOOGLE_CLIENT_ID = '18500279777-ph0ieib0lg4grgvactbs0nqiohgast9k.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

Parse.Cloud.define("hello", () => {
    return "Hello from Cloud Code!";
});

Parse.Cloud.define("authConGoogleToken", async (request) => {
  const { idToken } = request.params;

  if (!idToken) {
    throw new Parse.Error(Parse.Error.VALIDATION_ERROR, "El parámetro idToken es obligatorio.");
  }

  try {
    // 1. Validar criptográficamente el token con Google
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: GOOGLE_CLIENT_ID, // Evita que usen tokens de otras apps en tu backend
    });
    
    const payload = ticket.getPayload();
    
    // 2. Extraer los datos seguros devueltos por Google
    const googleUserId = payload['sub']; // ID único y persistente del usuario en Google
    const email = payload['email'];
    const name = payload['name'];
    const picture = payload['picture'];

    // 3. Buscar si el usuario ya existe en tu base de datos de Back4app
    const query = new Parse.Query(Parse.User);
    query.equalTo("username", email); // O puedes usar un campo personalizado como "googleId"
    let user = await query.first({ useMasterKey: true });

    if (!user) {
      // 4. Si no existe, crear un nuevo usuario
      user = new Parse.User();
      user.set("username", email);
      user.set("email", email);
      user.set("name", name);
      user.set("profilePicture", picture);
      user.set("googleId", googleUserId);
      
      // Asignar un password aleatorio seguro ya que entrará por SSO
      const randomPassword = Math.random().toString(36).substring(2) + Date.now().toString(36);
      user.set("password", randomPassword);

      await user.signUp(null, { useMasterKey: true });
    }

    // Crear explícitamente un objeto en la tabla _Session
    const session = new Parse.Object("_Session");
    session.set("user", user);
    session.set("createdWith", { "action": "login", "authProvider": "google-custom" });
    session.set("restricted", false);
  
    // Generar un token aleatorio único para la sesión
    const sessionToken = "r:" + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    session.set("sessionToken", sessionToken);  
    await session.save(null, { useMasterKey: true });

    return {
      status: "success",
      user: user,
      sessionToken: sessionToken
    };

  } catch (error) {
    throw new Parse.Error(Parse.Error.SCRIPT_FAILED, "Token de Google inválido o expirado: " + error.message);
  }
});
