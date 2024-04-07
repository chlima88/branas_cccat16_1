import pgp from "pg-promise";

import { DatabaseConnection } from "infra/databases";

export class PGDatabaseConnection implements DatabaseConnection {
    private pg = pgp()(`${process.env.DB_CONNECTION_STRING}`);

    // constructor(readonly connectionString: string) {
    //     this.pg = pgp()(connectionString);
    // }

    connect(): void {
        this.pg.connect();
    }

    async query(query: string, data: any[]): Promise<any> {
        return await this.query(query, data);
    }

    disconnect(): void {
        this.pg.$pool.end();
    }
}
