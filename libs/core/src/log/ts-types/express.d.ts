// src/types/express/index.d.ts

import { UserAuthInfo } from '@src/auth/user-auth-info';

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: UserAuthInfo;
            requestId: string;
        }
    }
}
