import { createContext, PropsWithChildren, useEffect, useState } from "react";

const CLIENT_ID = "08f5cbeae6f04906851ec89f964c31eb";
const CLIENT_SECRET = "8770285b5d404f00a737c86c86591924";
const LOCAL_STORAGE_KEY = "SPOTIFY_AUTH";

interface AuthProps {
  access_token: string;
}

interface AuthContextData {
  auth: AuthProps | null;
  updateAuth: (auth: AuthProps | null) => void;
}

export const AuthContext = createContext<AuthContextData>({
  auth: null,
  updateAuth: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthProps | null>(null);

  const updateAuth = (auth: AuthProps | null) => {
    if (!auth) {
      // remove do localStorage
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      // seta no localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth));
    }

    setAuth(auth);
  };

  const fetchAuthData = async () => {
    // 1 Verificar se existe dados nos localStorage
    const storageData = localStorage.getItem(LOCAL_STORAGE_KEY);

    // 2 Caso existir seta o state
    if (storageData) {
      try {
        const authData = JSON.parse(storageData);

        if (authData.access_token) {
          updateAuth(authData);
        } else {
          updateAuth(null);
        }
      } catch (err) {
        console.error(err);
        updateAuth(null);
      }
    } else {
      // 3 Caso nao existir
      // 4 Busca na API e seta no state

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
        .then((data) => updateAuth({ access_token: data.access_token }))
        .catch((err) => {
          console.error(err);
          updateAuth(null);
        });
    }
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
