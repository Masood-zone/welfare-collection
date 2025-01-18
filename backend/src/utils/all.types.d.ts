interface UpdateUserDataType {
  user: { id: string };
  body: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  };
}

type Role = "MEMBER" | "ADMIN";
