import React, {
  createContext,
  useContext,
  useState,
  useDebugValue,
} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ accessToken: null, user: null });
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isSignUp, setIsSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
  return useContext(AuthContext);
}
