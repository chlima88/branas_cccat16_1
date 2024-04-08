import { CreateAccountInput } from "application/types";
import { CreateAccount } from "application/usecases";

let input: CreateAccountInput;

let mockDao = {
    save: jest.fn(),
    existsById: jest.fn(),
    findById: jest.fn(),
    deleteById: jest.fn(),
    findAll: jest.fn(),
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
    mockDao.save.mockReset();
});

test("Should be possible to create an account", async () => {
    const sut = new CreateAccount(mockDao);
    const output = await sut.execute(input);

    expect(mockDao.save).toHaveBeenCalled();
    expect(output).toMatchObject(input);
    expect(output.accountId).toBeDefined();
});
