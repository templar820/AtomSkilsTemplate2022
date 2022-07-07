import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Sequelize, Transaction} from "sequelize";
import {InjectConnection} from "@nestjs/sequelize";
import {Observable} from "rxjs";

@Injectable()
export class TransactionInterceptor implements NestInterceptor {

    constructor(
        @InjectConnection()
        private readonly sequelizeInstance: Sequelize
    ) { }

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest();

        const transaction: Transaction = await this.sequelizeInstance.transaction();
        req.transaction = transaction;
        return next.handle();
    }
}