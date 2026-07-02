export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: "ADMIN" | "USER" | "OWNER";
}