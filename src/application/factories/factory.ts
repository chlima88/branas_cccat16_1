export interface Factory<C, U, D> {
    getController(): C;
    getUsecase(): U;
    getDAO(): D;
}
