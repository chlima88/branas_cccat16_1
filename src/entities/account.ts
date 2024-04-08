import { isValidCpf } from "validateCpf";

export class Account {
    accountId: string;
    name!: string;
    email!: string;
    cpf!: string;
    carPlate?: string;
    isPassenger!: boolean;
    isDriver!: boolean;

    private constructor() {
        this.accountId = crypto.randomUUID();
    }

    public static create(input: InputCreate): Account {
        this.validate(input);
        const account = new Account();
        account.name = input.name;
        account.email = input.email;
        account.cpf = input.cpf;
        account.carPlate = input.carPlate;
        account.isDriver = input.isDriver ?? false;
        account.isPassenger = input.isPassenger ?? false;
        return account;
    }

    public static restore(input: InputRestore): Account {
        const x = Object.assign(new Account(), input);
        console.log("pos >> ", Object.assign({}, { ...input }));
        return x;
    }

    private static validate(input: InputCreate): void {
        if (!this.isValidName(input.name)) throw new Error("Invalid name");
        if (!this.isValidEmail(input.email)) throw new Error("Invalid email");
        if (!isValidCpf(input.cpf)) throw new Error("Invalid cpf");
        if (input.isDriver && !this.isValidCarPlate(input.carPlate!))
            throw new Error("Invalid car plate");
    }

    private static isValidName(name: string): boolean {
        return (
            typeof name === "string" &&
            !!name.match(/^([a-zA-Z]+|([a-zA-Z]+\s[a-zA-Z]+)+)$/)
        );
    }

    private static isValidEmail(email: string): boolean {
        return typeof email === "string" && !!email.match(/^(.+)@(.+)$/);
    }

    private static isValidCarPlate(plate: string): boolean {
        return typeof plate === "string" && !!plate.match(/[A-Z]{3}[0-9]{4}/);
    }
}

type InputCreate = {
    name: string;
    email: string;
    cpf: string;
    carPlate?: string;
    isPassenger?: boolean;
    isDriver?: boolean;
};

type InputRestore = Account;
