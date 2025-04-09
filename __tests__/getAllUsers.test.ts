import { prisma } from "@/prisma"; // named import

import { getAllUsers } from "@/lib/getAllUsers";

jest.mock("@/prisma", () => ({
  __esModule: true, // needed for named exports
  prisma: {
    user: {
      findMany: jest.fn(),
    },
  },
}));

describe("Prisma - getAllUsers", () => {
  it("should fetch all users from the DB", async () => {
    const mockUsers = [
      { id: "1", name: "Jas" },
      { id: "2", name: "Eric" },
    ];

    // Cast safely to jest.Mock
    const mockedFindMany = (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const result = await getAllUsers();

    expect(mockedFindMany).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });
});
