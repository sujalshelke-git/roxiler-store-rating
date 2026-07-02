export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "OWNER";
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (
 email:string,
 password:string
)=>Promise<User>;

  logout: () => Promise<void>;
}