export interface AuthSignUpSchema {
  firstName: string;
  lastName: string;
  termsOfService: boolean;
  email: string;
  password: string;
}

export interface AuthSignInSchema {
  email: string;
  password: string;
}
