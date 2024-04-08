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
        carPlate: "ABC1234",
        isPassenger: true,
        isDriver: true,
    };
});

test("Should create a passenger account", async () => {
    input.isDriver = false;
    const output = await axios.post("http://localhost:3000/signup", input);
    expect(output.data.accountId).toBeDefined();
});

test("Should create a driver account", async () => {
    input.isPassenger = false;
    const output = await axios.post("http://localhost:3000/signup", input);
    expect(output.data.accountId).toBeDefined();
});

test("Should create a passenger and driver account", async () => {
    const output = await axios.post("http://localhost:3000/signup", input);
    expect(output.data.accountId).toBeDefined();
});

test.each([
    undefined,
    null,
    123,
    "",
    "   ",
    " John",
    " John ",
    "John ",
    "John123",
    "123Doe",
    "John 123",
    "123 Doe",
])("Should return status 422 for invalid names: %s", async (name: any) => {
    input.name = name;
    const output = await axios.post("http://localhost:3000/signup", input);
    expect(output.status).toBe(422);
});

test.each([undefined, null, 123, "", "   ", "1234567", "abcdabc"])(
    "Should return status 422 for invalid plates: %s",
    async (plate: any) => {
        input.isDriver = true;
        input.isPassenger = false;
        input.carPlate = plate;
        const output = await axios.post("http://localhost:3000/signup", input);
        expect(output.status).toBe(422);
    }
);

test.each([undefined, null, 123, "", "   ", "abc.com"])(
    "Should return status 422 for invalid emails: %s",
    async (email: any) => {
        input.email = email;
        const output = await axios.post("http://localhost:3000/signup", input);
        expect(output.status).toBe(422);
    }
);

test.each([undefined, null, 123, "", "   ", "abc.com"])(
    "Should return status 422 for invalid isPassenger: %s",
    async (isPassenger: any) => {
        input.isPassenger = isPassenger;
        const output = await axios.post("http://localhost:3000/signup", input);
        expect(output.status).toBe(422);
    }
);

test.each([undefined, null, 123, "", "   ", "abc.com"])(
    "Should return status 422 for invalid isDriver: %s",
    async (isDriver: any) => {
        input.isDriver = isDriver;
        const output = await axios.post("http://localhost:3000/signup", input);
        expect(output.status).toBe(422);
    }
);
