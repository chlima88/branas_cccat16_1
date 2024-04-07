import { Account } from "entities";
import { DAO } from "application/daos";

export interface DatabaseConnection {
    connect(): void;
    query(query: string, data: any[]): Promise<any>;
    disconnect(): void;
}

export class AccountDAO implements DAO<Account> {
    constructor(readonly connection: DatabaseConnection) {
        this.connection = connection;
    }
    async save(account: Account): Promise<void> {
        this.existsById(account.accountId);
        this.connection.connect();
        this.connection.query(
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
        this.connection.disconnect();
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
        this.connection.connect();
        const existsAccount = !!(await this.connection.query(
            "select * from cccat16.account where accountId = $1",
            [id]
        ));
        this.connection.disconnect();
        return existsAccount;
    }
}
