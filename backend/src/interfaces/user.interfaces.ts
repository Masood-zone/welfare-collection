export type Role = "MEMBER" | "ADMIN";
export interface UpdateUserDataType {
  user: { id: string };
  body: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  };
}
