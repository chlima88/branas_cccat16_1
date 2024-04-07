import crypto from "crypto";
import express from "express";
import pgp from "pg-promise";
import "dotenv/config";

import { Account } from "entities";

const app = express();
app.use(express.json());

type SignUpInput = {
    name: string;
    email: string;
    cpf: string;
    carPlate?: string;
    isPassenger?: boolean;
    isDriver?: boolean;
};

export interface Request<T> extends Express.Request {
    body: T;
}

app.post("/signup", async function (req: Request<SignUpInput>, res) {
    const id = crypto.randomUUID();
    const { body: inputDto } = req;

    const connection = pgp()(`${process.env.DB_CONNECTION_STRING}`);
    try {
        const account = Account.create(inputDto);

        const [storedAccount] = await connection.query(
            "select * from cccat16.account where email = $1",
            [inputDto.email.toString()]
        );
        if (storedAccount) throw new Error("Account already exists");

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
    } catch (error: any) {
        res.status(422).json({ message: error.message });
    } finally {
        await connection.$pool.end();
    }
});

function isValidName(name: string): boolean {
    return (
        typeof name === "string" &&
        !!name.match(/^([a-zA-Z]+|([a-zA-Z]+\s[a-zA-Z]+)+)$/)
    );
}

function isValidCarPlate(plate: string): boolean {
    return typeof plate === "string" && !!plate.match(/[A-Z]{3}[0-9]{4}/);
}

function isValidEmail(email: string): boolean {
    return typeof email === "string" && !!email.match(/^(.+)@(.+)$/);
}
app.listen(3000);
