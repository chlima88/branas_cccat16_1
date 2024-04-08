import { CreateAccountInput } from "application/types";
import { Account } from "entities";

let input: CreateAccountInput;

beforeEach(() => {
    input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "87748248800",
        isPassenger: true,
        isDriver: false,
    };
});

test("Should be possible to create a passenger Account", () => {
    input.isPassenger = true;
    const sut = Account.create(input);
    expect(sut).toMatchObject(input);
    expect(sut.accountId).toBeDefined();
});

test("Should be possible to create a driver Account", () => {
    input.isDriver = true;
    input.carPlate = "ABC1234";
    const sut = Account.create(input);
    expect(sut).toMatchObject(input);
    expect(sut.accountId).toBeDefined();
});

test("Should not be possible to create an Account with invalid name", () => {
    input.name = undefined as any;
    expect(() => Account.create(input)).toThrow("Invalid name");
});

test("Should not be possible to create an Account with invalid email", () => {
    input.email = undefined as any;
    expect(() => Account.create(input)).toThrow("Invalid email");
});

test("Should not be possible to create an Account with invalid cpf", () => {
    input.cpf = undefined as any;
    expect(() => Account.create(input)).toThrow("Invalid cpf");
});

test("Should not be possible to create an Account with invalid car plate", () => {
    input.isDriver = true;
    input.carPlate = undefined as any;
    expect(() => Account.create(input)).toThrow("Invalid car plate");
});
