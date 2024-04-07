export interface DAO<T> {
    save(item: T): Promise<void>;
    deleteById(id: string): Promise<void>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<void>;
    existsById(id: string): Promise<boolean>;
}
