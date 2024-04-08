import { InvalidEntityAttribute } from "entities/account";
import { CreateAccountInput } from "application/types";
import { Account } from "entities";

let input: CreateAccountInput;

beforeEach(() => {
    input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "87748248800",
        password: "abcABC123!@#",
        isPassenger: true,
        isDriver: true,
        carPlate: "ABC1234",
    };
});

test("Should be possible to create a passenger Account", () => {
    input.isDriver = false;
    const sut = Account.create(input);
    expect(sut).toMatchObject(input);
    expect(sut.accountId).toBeDefined();
});

test("Should be possible to create a driver Account", () => {
    input.isPassenger = false;
    const sut = Account.create(input);
    expect(sut).toMatchObject(input);
    expect(sut.accountId).toBeDefined();
});

test("Should be possible to create a driver and passenger Account", () => {
    const sut = Account.create(input);
    expect(sut).toMatchObject(input);
    expect(sut.accountId).toBeDefined();
});

test("Should not be possible to create an Account with invalid name", () => {
    input.name = undefined as any;
    expect(() => Account.create(input)).toThrow(InvalidEntityAttribute);
    expect(() => Account.create(input)).toThrow(
        "Invalid/missing name attribute"
    );
});

test("Should not be possible to create an Account with invalid email", () => {
    input.email = undefined as any;
    expect(() => Account.create(input)).toThrow(InvalidEntityAttribute);
    expect(() => Account.create(input)).toThrow(
        "Invalid/missing email attribute"
    );
});

test.each([undefined, null, 123, "", "  "])(
    "Should not be possible to create an Account with invalid password: %s",
    (password: any) => {
        input.password = password;
        expect(() => Account.create(input)).toThrow(InvalidEntityAttribute);
        expect(() => Account.create(input)).toThrow(
            "Invalid/missing password attribute"
        );
    }
);

test("Should not be possible to create an Account with invalid cpf", () => {
    input.cpf = undefined as any;
    expect(() => Account.create(input)).toThrow(InvalidEntityAttribute);
    expect(() => Account.create(input)).toThrow(
        "Invalid/missing cpf attribute"
    );
});

test("Should not be possible to create an Account with invalid isPassenger", () => {
    input.isPassenger = undefined as any;
    expect(() => Account.create(input)).toThrow(InvalidEntityAttribute);
    expect(() => Account.create(input)).toThrow(
        "Invalid/missing isPassenger attribute"
    );
});

test("Should not be possible to create an Account with invalid isDriver", () => {
    input.isDriver = undefined as any;
    expect(() => Account.create(input)).toThrow(InvalidEntityAttribute);
    expect(() => Account.create(input)).toThrow(
        "Invalid/missing isDriver attribute"
    );
});

test("Should not be possible to create an Account with invalid carPlate", () => {
    input.carPlate = undefined as any;
    expect(() => Account.create(input)).toThrow(InvalidEntityAttribute);
    expect(() => Account.create(input)).toThrow(
        "Invalid/missing carPlate attribute"
    );
});
