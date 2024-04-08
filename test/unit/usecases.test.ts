import { CreateAccountInput } from "application/types";
import { CreateAccount, EntityAlreadyExists } from "application/usecases";

let input: CreateAccountInput;

let mockDao = {
    save: jest.fn(),
    existsById: jest.fn(),
    findById: jest.fn(),
    existsByEmail: jest.fn(),
    deleteById: jest.fn(),
    findAll: jest.fn(),
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
    mockDao.save.mockReset();
});

test("Should be possible to create an account", async () => {
    const sut = new CreateAccount(mockDao);
    const output = await sut.execute(input);

    expect(mockDao.save).toHaveBeenCalled();
    expect(output.accountId).toBeDefined();
});

test("Should throw EntityAlreadyExists when creating an account with duplicated email", async () => {
    const sut = new CreateAccount(mockDao);
    mockDao.existsByEmail.mockReturnValueOnce(false).mockReturnValue(true);
    await sut.execute(input);
    expect(async () => await sut.execute(input)).rejects.toThrow(
        "Email already in use"
    );
    expect(async () => await sut.execute(input)).rejects.toThrow(
        EntityAlreadyExists
    );
});
