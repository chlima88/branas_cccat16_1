import { Controller } from "application/controllers";
import { CreateAccountInput, CreateAccountOutput } from "application/types";
import { Usecase } from "application/usecases";

export class CreateAccountController implements Controller {
    constructor(
        readonly usecase: Usecase<CreateAccountInput, CreateAccountOutput>
    ) {}
    async handle(input: CreateAccountInput): Promise<HttpResponse> {
        const data = await this.usecase.execute(input);
        return new HttpResponse(200, data);
    }
}

class HttpResponse {
    constructor(readonly code: number, readonly data: Object) {}
}
