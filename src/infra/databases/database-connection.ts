export interface DatabaseConnection {
    query<T = any>(query: string, data: any[]): Promise<T>;
}
