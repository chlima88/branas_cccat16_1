export interface DatabaseConnection {
    connect(): void;
    query(query: string, data: any[]): Promise<any>;
    disconnect(): void;
}
