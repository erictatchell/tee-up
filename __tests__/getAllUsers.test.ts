import prisma from "@/prisma"; // ✅ this was missing!
import { getAllUsers } from "@/lib/getAllUsers";

jest.mock("@/prisma", () => ({
  __esModule: true,
  prisma: {
    user: {
      findMany: jest.fn(),
    },
  },
}));


describe("Prisma - getAllUsers", () => {
  it("should fetch all users from the DB", async () => {
    const mockUsers = [{ id: "1", name: "Jas" }, { id: "2", name: "Eric" }];

    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const result = await getAllUsers();

    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });
});
