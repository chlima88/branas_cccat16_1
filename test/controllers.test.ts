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
    const expected = new HttpResponse(200, mockResponse);
    const output = await sut.handle(input);
    expect(output).toMatchObject(expected);
});
