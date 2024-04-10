export interface Controller<Input = any, Output = any> {
    handle(input: Input): Output;
}
