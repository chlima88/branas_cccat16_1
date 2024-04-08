export type CreateAccountInput = {
    name: string;
    email: string;
    cpf: string;
    carPlate?: string;
    isPassenger: boolean;
    isDriver: boolean;
};

export type CreateAccountOutput = {
    accountId: string;
};
