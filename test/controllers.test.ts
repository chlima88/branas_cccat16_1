import { CreateAccountController } from "application/controllers";
import { CreateAccount } from "application/usecases";
let input: {
    name: string;
    email: string;
    cpf: string;
    carPlate?: string;
    isPassenger: boolean;
    isDriver: boolean;
};

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
