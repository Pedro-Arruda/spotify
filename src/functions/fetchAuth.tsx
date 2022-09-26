import { AuthProps } from "../contexts/AuthContext";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/constants";

export interface FetchAuthRequestInit extends Omit<RequestInit, "body"> {
  auth: AuthProps | null;
  updateAuth: (auth: AuthProps | null) => void;
  body?: Record<string, any>;
}

export const fetchAuth = async (
  input: RequestInfo,
  init: FetchAuthRequestInit
) => {
  if (!init.auth) {
    throw new Error("Auth is not setted");
  }

  let access_token = init.auth.access_token;

  if (Date.now() > init.auth.expiresAt) {
    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        if (!data) {
          init.updateAuth(null);
          throw new Error("Authentication Error: Failed to refresh token");
        }

        access_token = data.access_token;

        init.updateAuth({
          access_token: data.access_token,
          expiresAt: Date.now() + 3600 * 100,
        });
      })
      .catch((err) => {
        console.error(err);
        init.updateAuth(null);
      });
  }

  return fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${access_token}`,
      ...init.headers,
    },
    ...(init.body
      ? { body: JSON.stringify({ ...init.body }) }
      : { body: null }),
  });
};
