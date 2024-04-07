import { Controller } from "application/controllers";
import { Usecase } from "application/usecases";
export class CreateAccountController implements Controller {
    constructor(readonly usecase: Usecase) {}
    async handle(data: CreateAccountInput): Promise<any> {
        return await this.usecase.execute(data);
    }
}

type CreateAccountInput = {
    name: string;
    email: string;
    cpf: string;
    carPlate?: string;
    isPassenger: boolean;
    isDriver: boolean;
};
