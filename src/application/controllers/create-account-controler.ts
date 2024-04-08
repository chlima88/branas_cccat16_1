import { Controller } from "application/controllers";
import { CreateAccountInput, CreateAccountOutput } from "application/types";
import { EntityAlreadyExists, Usecase } from "application/usecases";
import { InvalidEntityAttribute } from "entities";

export class CreateAccountController implements Controller {
    constructor(
        private readonly usecase: Usecase<
            CreateAccountInput,
            CreateAccountOutput
        >
    ) {}
    async handle(
        input: CreateAccountInput
    ): Promise<HttpResponse<CreateAccountOutput | string>> {
        try {
            const data = await this.usecase.execute(input);
            return new HttpResponse().ok(data);
        } catch (error: any) {
            if (error instanceof InvalidEntityAttribute)
                return new HttpResponse().unprocessableEntity({
                    message: error.message,
                });
            if (error instanceof EntityAlreadyExists)
                return new HttpResponse().unprocessableEntity({
                    message: error.message,
                });
            else {
                return new HttpResponse().serverError();
            }
        }
    }
}

export class HttpResponse<T = any> {
    code: number;
    data?: T;

    constructor() {
        this.code = 200;
    }

    ok(data: T) {
        this.code = 200;
        this.data = data;
        return this;
    }

    unprocessableEntity(data: T) {
        this.code = 422;
        this.data = data;
        return this;
    }

    serverError(data?: T) {
        this.code = 500;
        this.data = data;
        return this;
    }
}
