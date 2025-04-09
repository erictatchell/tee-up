import { signIn } from "../lib/auth";

jest.mock("../lib/auth", () => ({
  signIn: jest.fn(),
}));

describe("OAuth Login", () => {
  it("calls signIn with the correct provider", async () => {
    const mockedSignIn = signIn as jest.Mock;
    mockedSignIn.mockResolvedValueOnce(true);

    await signIn("google");

    expect(mockedSignIn).toHaveBeenCalledWith("google");
  });
});
