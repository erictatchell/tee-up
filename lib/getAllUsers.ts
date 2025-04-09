import { prisma } from "@/prisma";

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
