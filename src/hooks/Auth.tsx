import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import asyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthContextData {
  user: any;

  loadingUserData: boolean;
  signIn(signInData: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: any;
}

interface SignInCredentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const LS_TOKEN_KEY = '@GoBarber:token';
  const LS_USER_KEY = '@GoBarber:user';

  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    const loadState = async () => {
      setLoadingUserData(true);

      const [token, user] = await asyncStorage.multiGet([
        LS_TOKEN_KEY,
        LS_USER_KEY,
      ]);

      if (token[1] && user[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }

      setLoadingUserData(false);
    };

    loadState();
  }, []);

  const signIn = useCallback(async ({email, password}: SignInCredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const {token, user} = response.data;

    setData({token, user});

    await asyncStorage.multiSet([
      [LS_TOKEN_KEY, JSON.stringify(token)],
      [LS_USER_KEY, JSON.stringify(user)],
    ]);
  }, []);

  const signOut = useCallback(async () => {
    await asyncStorage.multiRemove([LS_TOKEN_KEY, LS_USER_KEY]);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{user: data.user, loadingUserData, signIn, signOut}}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAth must be used in a component inside AuthProvider');
  }

  return context;
};

export {AuthProvider, useAuth};
