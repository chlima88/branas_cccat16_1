import { Account } from "entities";
import { DAO } from "application/daos";
import { DatabaseConnection } from "infra/databases";

export class AccountDAO implements DAO<Account> {
    constructor(readonly database: DatabaseConnection) {
        this.database = database;
    }
    async save(account: Account): Promise<void> {
        this.existsById(account.accountId);
        this.database.query(
            "insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
            [
                account.accountId,
                account.name,
                account.email,
                account.cpf,
                account.carPlate,
                !!account.isPassenger,
                !!account.isDriver,
            ]
        );
    }

    async deleteById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Account[]> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async existsById(id: string): Promise<boolean> {
        return !!(
            await this.database.query<Account[]>(
                "select * from cccat16.account where account_id = $1",
                [id]
            )
        ).length;
    }
}