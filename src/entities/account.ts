import { isValidCpf } from "validateCpf";

export class Account {
    accountId: string;
    name!: string;
    email!: string;
    password!: string;
    cpf!: string;
    carPlate?: string;
    isPassenger!: boolean;
    isDriver!: boolean;

    private constructor() {
        this.accountId = crypto.randomUUID();
    }

    public static create(input: InputCreate): Account {
        this.validate(input);
        return Object.assign(new Account(), input);
    }

    public static restore(input: InputRestore): Account {
        return Object.assign(new Account(), input);
    }

    private static validate(input: InputCreate): void {
        if (!this.isValidName(input.name))
            throw new InvalidEntityAttribute("Invalid/missing name attribute");
        if (!this.isValidEmail(input.email))
            throw new InvalidEntityAttribute("Invalid/missing email attribute");
        if (!this.isValidPassword(input.password))
            throw new InvalidEntityAttribute(
                "Invalid/missing password attribute"
            );
        if (!isValidCpf(input.cpf))
            throw new InvalidEntityAttribute("Invalid/missing cpf attribute");
        if (!this.isValidAccountType(input.isPassenger))
            throw new InvalidEntityAttribute(
                "Invalid/missing isPassenger attribute"
            );
        if (!this.isValidAccountType(input.isDriver))
            throw new InvalidEntityAttribute(
                "Invalid/missing isDriver attribute"
            );
        if (input.isDriver && !this.isValidCarPlate(input.carPlate!))
            throw new InvalidEntityAttribute(
                "Invalid/missing carPlate attribute"
            );
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

    private static isValidPassword(password: string): boolean {
        return (
            typeof password === "string" &&
            !!password.match(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            )
        );
    }

    private static isValidAccountType(accountType: boolean): boolean {
        return typeof accountType === "boolean" && accountType !== undefined;
    }

    private static isValidCarPlate(plate: string): boolean {
        return typeof plate === "string" && !!plate.match(/[A-Z]{3}[0-9]{4}/);
    }
}

type InputCreate = {
    name: string;
    email: string;
    password: string;
    cpf: string;
    carPlate?: string;
    isPassenger: boolean;
    isDriver: boolean;
};

type InputRestore = Account;

export class InvalidEntityAttribute extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}
