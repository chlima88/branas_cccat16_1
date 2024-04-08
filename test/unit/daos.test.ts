import { AccountDAO } from "application/daos";
import { Account } from "entities";

let input: Account;

let mockConnection = {
    connect: jest.fn(),
    query: jest.fn(),
    disconnect: jest.fn(),
};

beforeEach(() => {
    mockConnection.query.mockReset();
    input = {
        accountId: crypto.randomUUID(),
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        password: "abcABC123!@#",
        cpf: "87748248800",
        isPassenger: true,
        isDriver: false,
    };
});

test("Should be possible to save an Account", async () => {
    const sut = new AccountDAO(mockConnection);
    mockConnection.query.mockResolvedValue(input);

    sut.save(input);

    expect(mockConnection.query).toHaveBeenCalledWith(
        "insert into cccat16.account (account_id, name, email, password, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
            input.accountId,
            input.name,
            input.email,
            input.password,
            input.cpf,
            input.carPlate,
            !!input.isPassenger,
            !!input.isDriver,
        ]
    );
});

test("Should be possible to check if and account exists by accountId", async () => {
    const sut = new AccountDAO(mockConnection);
    mockConnection.query.mockResolvedValue(input);

    sut.existsById(input.accountId);

    expect(mockConnection.query).toHaveBeenNthCalledWith(
        1,
        "select * from cccat16.account where account_id = $1",
        [input.accountId]
    );
});

test("Should be possible to check if and account exists by email", async () => {
    const sut = new AccountDAO(mockConnection);
    mockConnection.query.mockResolvedValue(input);

    sut.existsByEmail(input.email);

    expect(mockConnection.query).toHaveBeenNthCalledWith(
        1,
        "select * from cccat16.account where email = $1",
        [input.email]
    );
});
