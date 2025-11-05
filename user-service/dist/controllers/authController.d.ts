import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        role: string;
    };
}
export declare const register: (req: Request, res: Response) => Promise<void>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const profile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logout: (req: Request, res: Response) => void;
export {};
//# sourceMappingURL=authController.d.ts.map