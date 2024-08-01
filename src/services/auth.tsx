/** @format */

export const getAuth = async () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  try {
    console.log("ID", clientId);
    console.log("Secret", clientSecret);

    if (!clientId || !clientSecret) {
      console.log("API key or secret unavailable");
      return null;
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    console.log(response);

    if (!response.ok) {
      console.log("Failed to authenticate");
      return null;
    }

    const authResponse = await response.json();
    const authToken = authResponse["access_token"];
    return authToken;
  } catch (e) {
    console.log("Error authenticating:", e);
    return null;
  }
};
