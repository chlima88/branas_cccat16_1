import { CreateAccountInput } from "application/types";
import axios from "axios";

axios.defaults.validateStatus = function () {
    return true;
};

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

test("Deve criar uma conta para o passageiro", async () => {
    const output = await axios.post("http://localhost:3000/signup", input);
    expect(output.data.accountId).toBeDefined();
});

test.each([
    undefined,
    null,
    123,
    "",
    " John",
    " John ",
    "John ",
    "John123",
    "123Doe",
    "John 123",
    "123 Doe",
])(
    "Should return status 422 and 'Invalid name' for invalid names: %s",
    async (name: any) => {
        input.name = name;
        const output = await axios.post("http://localhost:3000/signup", input);
        expect(output.status).toBe(422);
        expect(output.data).toMatchObject({
            message: "Invalid name",
        });
    }
);

test.each([undefined, null, 123, "", "1234567", "abcdabc"])(
    "Should return status 422 and 'Invalid car plate' for invalid plates: %s",
    async (plate: any) => {
        input.isDriver = true;
        input.isPassenger = false;
        input.carPlate = plate;
        const output = await axios.post("http://localhost:3000/signup", input);
        expect(output.status).toBe(422);
        expect(output.data.message).toBe("Invalid car plate");
    }
);

test.each([undefined, null, 123, "", "abc.com"])(
    "Should return status 422 and 'Invalid email' for invalid emails: %s",
    async (email: any) => {
        input.email = email;
        const output = await axios.post("http://localhost:3000/signup", input);
        expect(output.status).toBe(422);
        expect(output.data.message).toBe("Invalid email");
    }
);
