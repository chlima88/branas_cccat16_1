import express from "express";
import "dotenv/config";

import { CreateAccountFactory } from "application/factories";
import { PGDatabaseConnection } from "infra/databases";

const app = express();
app.use(express.json());

type SignUpInput = {
    name: string;
    email: string;
    cpf: string;
    carPlate?: string;
    isPassenger: boolean;
    isDriver: boolean;
};

export interface Request<T> extends Express.Request {
    body: T;
}

app.post("/signup", async function (req: Request<SignUpInput>, res) {
    try {
        const createAccountController = new CreateAccountFactory(
            new PGDatabaseConnection()
        ).getController();
        const response = await createAccountController.handle(req.body);
        res.status(response.code).json(response.data);
    } catch (error: any) {
        res.status(422).json({ message: error.message });
    }
});

app.listen(process.env.PORT || 3000);
