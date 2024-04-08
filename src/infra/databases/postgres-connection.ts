import pgp, { IDatabase } from "pg-promise";

import { DatabaseConnection } from "infra/databases";

export class PGDatabaseConnection implements DatabaseConnection {
    static _INSTANCE: IDatabase<any>;
    private pg: IDatabase<any>;

    constructor() {
        this.pg =
            PGDatabaseConnection._INSTANCE ?? PGDatabaseConnection.connect();
    }

    static connect() {
        PGDatabaseConnection._INSTANCE = pgp(PGDatabaseConnection.initOptions)(
            `${process.env.DB_CONNECTION_STRING}`
        );
        return PGDatabaseConnection._INSTANCE;
    }

    async query<T = any>(query: string, data: any[]): Promise<T> {
        return await this.pg.query<T>(query, data);
    }

    // Example below shows the fastest way to camelize all column names.
    // NOTE: The example does not do processing for nested JSON objects.

    static initOptions = {
        receive(e: { data: any }) {
            ((data: string | any[]) => {
                const tmp = data[0];
                for (const prop in tmp) {
                    const camel = pgp.utils.camelize(prop);
                    if (!(camel in tmp)) {
                        for (let i = 0; i < data.length; i++) {
                            const d = data[i];
                            d[camel] = d[prop];
                            delete d[prop];
                        }
                    }
                }
            })(e.data);
        },
    };
}
