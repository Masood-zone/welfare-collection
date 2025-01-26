import * as bcrypt from "bcrypt";
import { Role } from "../interfaces/user.interfaces";
import prisma from "../config/db";

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: Role;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { ...data, password: hashedPassword },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUsersByRole = async (role: Role) => {
  return prisma.user.findMany({
    where: { role },
  });
};

export const updateUser = async (
  id: string,
  data: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  }
) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      role: true,
    },
  });
};

export const deleteUserById = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
