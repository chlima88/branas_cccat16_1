import { DatabaseConnection } from "infra/databases";
import { AccountDAO } from "application/daos";
import { CreateAccountController } from "application/controllers";
import { CreateAccount } from "application/usecases";
import { Factory } from "application/factories";

export class CreateAccountFactory
    implements Factory<CreateAccountController, CreateAccount, AccountDAO>
{
    private controller: CreateAccountController;
    private usecase: CreateAccount;
    private dao: AccountDAO;

    constructor(readonly dbconnection: DatabaseConnection) {
        this.dbconnection = dbconnection;
        this.controller = this.getController();
        this.usecase = this.getUsecase();
        this.dao = this.getDAO();
    }

    getController(): CreateAccountController {
        return (
            this.controller ?? new CreateAccountController(this.getUsecase())
        );
    }

    getUsecase(): CreateAccount {
        return this.usecase ?? new CreateAccount(this.getDAO());
    }

    getDAO(): AccountDAO {
        return this.dao ?? new AccountDAO(this.dbconnection);
    }
}
