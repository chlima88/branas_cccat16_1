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
        password: "abcABC123!@#",
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

test("Should return status 422 for invalid attributes", async () => {
    input.name = "";
    const output = await axios.post("http://localhost:3000/signup", input);
    expect(output.status).toBe(422);
});
