import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { StorageItems } from '../common/enums/storageItems';
import type { UserModel } from '../common/models/user.model';
import type { AuthSignInSchema } from '../common/schemas/authSchemas';
import { AuthAPI } from '../api/auth';
import type { TokenModel } from '../common/models/tokens.model';
import { RoutePath } from '../common/enums/routePath';
import { UserRole } from '../common/enums/userRoles';

interface AuthContextType {
  user: UserModel | null;
  isAdmin: boolean;
  isTechnician: boolean;
  isOperator: boolean;
  isLoading: boolean;
  isAuthorized: boolean;
  login: (p: AuthSignInSchema) => Promise<void>;
  logout: () => void;
}

// Get sign in data
// Try to login user if is correct get JWT token and set user data in context
// Return is Authorized
// UseEffect for authorizeUserSession() checking is user Authorized =>

//Feature works : Add RefreshToken which means if user is still on app when token expired -> get refreshtoekn as another jwt token
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(StorageItems.AUTH_TOKEN),
  );
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const resetAuth = useCallback(() => {
    localStorage.removeItem(StorageItems.AUTH_TOKEN);
    setToken(null);
    setUser(null);
  }, []);

  const isAdmin = user?.role === UserRole.ADMIN;
  const isTechnician = user?.role === UserRole.TECHNICIAN;
  const isOperator = user?.role === UserRole.OPERATOR;
  const applyToken = (t: TokenModel | null) => {
    if (t) {
      localStorage.setItem(StorageItems.AUTH_TOKEN, t.accessToken);
      setToken(t.accessToken);
    } else resetAuth();
  };

  const login = async (payload: AuthSignInSchema) => {
    const t = await AuthAPI.signIn(payload);
    applyToken(t);
  };

  const authorizeUserSession = useCallback(
    async (withLoading = true) => {
      if (withLoading) setIsLoading(true);
      try {
        const u = await AuthAPI.authMe();
        setUser(u);
        return u;
      } catch {
        resetAuth();
      } finally {
        setIsLoading(false);
      }
    },
    [resetAuth],
  );

  useEffect(() => {
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(null);
      setIsLoading(false);
      return;
    }
    authorizeUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const logout = () => {
    resetAuth();
    window.location.href = RoutePath.SIGN_IN;
  };
  //login
  //applyTokens
  //authorizeUserSession
  //useEffect if there is no token setUser => null if it is => authorizeUserSession
  //logout

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAdmin,
    isTechnician,
    isOperator,
    isAuthorized: !!token,
    isLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
