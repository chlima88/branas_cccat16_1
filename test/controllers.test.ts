import { CreateAccountInput } from "application/types";
import { CreateAccountController } from "application/controllers";

let input: CreateAccountInput;

let mockUseCase = {
    execute: jest.fn(),
};

beforeEach(() => {
    input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "87748248800",
        carPlate: undefined,
        isPassenger: true,
        isDriver: false,
    };
    mockUseCase.execute.mockReset();
});

test("Should be possible to create an Account", async () => {
    const sut = new CreateAccountController(mockUseCase);
    const expected = { accountId: crypto.randomUUID(), ...input };
    mockUseCase.execute.mockResolvedValue(expected);
    const output = await sut.handle(input);
    expect(output).toMatchObject(input);
});
