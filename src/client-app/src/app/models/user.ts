export interface User {
  username: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface UserLoginFormValues {
  username: string;
  password: string;
}