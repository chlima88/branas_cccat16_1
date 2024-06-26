import { InvalidEntityAttribute } from "entities/account";
import { CreateAccountInput } from "application/types";
import { CreateAccountController, HttpResponse } from "application/controllers";

let input: CreateAccountInput;

let mockUseCase = {
    execute: jest.fn(),
};

beforeEach(() => {
    input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        password: "abcABC123!@#",
        cpf: "87748248800",
        carPlate: undefined,
        isPassenger: true,
        isDriver: false,
    };
    mockUseCase.execute.mockReset();
});

test("Should be possible to create an Account", async () => {
    const sut = new CreateAccountController(mockUseCase);
    const mockResponse = {
        accountId: crypto.randomUUID(),
        ...input,
    };
    mockUseCase.execute.mockResolvedValue(mockResponse);
    const expected = new HttpResponse().ok(mockResponse);
    const output = await sut.handle(input);
    expect(output).toMatchObject(expected);
});

test.only("Should be return 422 for invalid property", async () => {
    const sut = new CreateAccountController(mockUseCase);
    mockUseCase.execute.mockImplementation(() => {
        throw new InvalidEntityAttribute();
    });

    const expected = new HttpResponse().unprocessableEntity();
    await expect(sut.handle(input)).resolves.toMatchObject(expected);
});
