import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req: Request = context.switchToHttp().getRequest();
        const { body, method, originalUrl, user } = req;

        const timerStart = Date.now();
        return next.handle().pipe(
            tap(() => {
                const timeInMs = Date.now() - timerStart;
                const res: Response = context.switchToHttp().getResponse();
                const { statusCode } = res;
                this.logger.info(
                    JSON.stringify({ body: this.sanitizeBody(body), method, originalUrl, user, timeInMs, statusCode }),
                );
            }),
        );
    }

    private sanitizeBody(body: { [key: string]: any }): { [key: string]: any } {
        const newObj = { ...body };
        if (Object.keys(newObj).includes('password')) newObj.password = '***';
        return newObj;
    }
}
