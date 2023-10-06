import { NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

export class RequestIdMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: any): Promise<void> {
        let reqIdFromHeaders: string | string[] | undefined = req.headers['X-Request-Id'];
        if (Array.isArray(reqIdFromHeaders)) reqIdFromHeaders = reqIdFromHeaders[0];

        if (reqIdFromHeaders) {
            req.requestId = reqIdFromHeaders;
        } else {
            req.requestId = uuidv4();
        }

        next();
    }
}
