import { DAO } from "application/daos";
import { Account } from "entities";
import { Usecase } from "application/usecases";

export class CreateAccount implements Usecase {
    public constructor(readonly accountDAO: DAO<Account>) {}
    async execute(input: CreateAccountInput) {
        const account = Account.create(input);
        await this.accountDAO.save(account);
        return account;
    }
}

type CreateAccountInput = {
    name: string;
    email: string;
    cpf: string;
    carPlate?: string;
    isPassenger: boolean;
    isDriver: boolean;
};
