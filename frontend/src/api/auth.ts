import { ApiPaths } from '../common/enums/api';
import type { TokenModel } from '../common/models/tokens.model';
import type { UserModel } from '../common/models/user.model';
import type {
  AuthSignInSchema,
  AuthSignUpSchema,
} from '../common/schemas/authSchemas';
import { requests } from '../utils/requests';

const signUp = async (schema: AuthSignUpSchema): Promise<UserModel> => {
  const response = await requests.post<UserModel, AuthSignUpSchema>(
    ApiPaths.SIGN_UP,
    schema,
  );
  return response.data;
};

const signIn = async (schema: AuthSignInSchema): Promise<TokenModel> => {
  const response = await requests.post<TokenModel, AuthSignInSchema>(
    ApiPaths.SIGN_IN,
    schema,
  );
  return response.data;
};

const authMe = async () => {
  const response = await requests.get<UserModel>(ApiPaths.AUTH_ME);
  return response.data;
};
export const AuthAPI = {
  signUp,
  signIn,
  authMe,
};
