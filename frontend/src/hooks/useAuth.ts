import { useMutation } from '@tanstack/react-query';
import type { AuthSignUpSchema } from '../common/schemas/authSchemas';
import { AuthAPI } from '../api/auth';

import type { UserModel } from '../common/models/user.model';
import { useNavigate } from 'react-router-dom';
import { MutationKey } from '../common/enums/queryKey';
import { RoutePath } from '../common/enums/routePath';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};

export const useSignUpMutation = () => {
  const navigate = useNavigate();
  return useMutation<UserModel, Error, AuthSignUpSchema>({
    mutationKey: MutationKey.AUTH_SIGN_UP,
    mutationFn: (schema: AuthSignUpSchema) => AuthAPI.signUp(schema),

    onSuccess: () => {
      navigate(RoutePath.SIGN_IN);
    },
  });
};
