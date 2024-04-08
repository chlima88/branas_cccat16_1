export interface Usecase<Input, T = any> {
    execute(input?: Input): Promise<T>;
}
