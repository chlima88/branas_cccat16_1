import crypto from "crypto";
import express from "express";
import pgp from "pg-promise";
import { isValidCpf } from "./validateCpf";
import "dotenv/config";
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const connection = pgp()(`${process.env.DB_CONNECTION_STRING}`);
  const id = crypto.randomUUID();
  const { body: inputDto } = req;

  const [storedAccount] = await connection.query(
    "select * from cccat16.account where email = $1",
    [inputDto.email]
  );
  if (storedAccount) res.status(422).send(-4);
  if (!isValidName(inputDto.name)) res.status(422).send(-3);
  if (!isValidEmail(inputDto.email)) res.status(422).send(-2);
  if (!isValidCpf(inputDto.cpf)) res.status(422).send(-1);
  if (inputDto.carPlate && !isValidCarPlate(inputDto.carPlate))
    res.status(422).send(-5);
  await connection.query(
    "insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
    [
      id,
      inputDto.name,
      inputDto.email,
      inputDto.cpf,
      inputDto.carPlate,
      !!inputDto.isPassenger,
      !!inputDto.isDriver,
    ]
  );
  res.json({
    accountId: id,
  });
  await connection.$pool.end();
});

function isValidName(name: string): boolean {
  return name.match(/^([a-zA-Z]+|([a-zA-Z]+\s[a-zA-Z]+)+)$/) ? true : false;
}

function isValidCarPlate(plate: string): boolean {
  return plate.match(/[A-Z]{3}[0-9]{4}/) ? true : false;
}

function isValidEmail(email: string): boolean {
  return email.match(/^(.+)@(.+)$/) ? true : false;
}
app.listen(3000);
