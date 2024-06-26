import pgp, { IDatabase } from "pg-promise";

import { DatabaseConnection } from "infra/databases";

export class PGDatabaseConnection implements DatabaseConnection {
    private static _INSTANCE: IDatabase<any>;
    private pg: IDatabase<any>;

    constructor() {
        this.pg =
            PGDatabaseConnection._INSTANCE ?? PGDatabaseConnection.connect();
    }

    async query<T = any>(query: string, data: any[]): Promise<T> {
        return await this.pg.query<T>(query, data);
    }

    private static connect() {
        PGDatabaseConnection._INSTANCE = pgp(PGDatabaseConnection.initOptions)(
            `${process.env.DB_CONNECTION_STRING}`
        );
        return PGDatabaseConnection._INSTANCE;
    }

    // Example below shows the fastest way to camelize all column names.
    // NOTE: The example does not do processing for nested JSON objects.
    // Credits to vitaly-t : https://vitaly-t.github.io/pg-promise/global.html#event:receive

    private static initOptions = {
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
