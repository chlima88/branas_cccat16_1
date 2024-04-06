import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("Deve criar uma conta para o passageiro", async function () {
  const input = {
    name: "aa a",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "87748248800",
    isPassenger: true,
  };
  const output = await axios.post("http://localhost:3000/signup", input);
  expect(output.data.accountId).toBeDefined();
});
