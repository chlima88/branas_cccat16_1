import { DAO } from "application/daos";
import { Account } from "entities";
import { Usecase } from "application/usecases";
import { CreateAccountInput, CreateAccountOutput } from "application/types";

export class CreateAccount
    implements Usecase<CreateAccountInput, CreateAccountOutput>
{
    public constructor(private readonly accountDAO: DAO<Account>) {}
    async execute(input: CreateAccountInput): Promise<CreateAccountOutput> {
        const account = Account.create(input);
        await this.accountDAO.save(account);
        return { accountId: account.accountId };
    }
}
