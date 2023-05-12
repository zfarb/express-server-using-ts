import { Router } from 'express';

export const router = Router(); // init express router

export class AppRouter {
    private static instance: Router;

    static getInstance(): Router {
        if (!AppRouter.instance) {
            AppRouter.instance = Router();
        }

        return AppRouter.instance;
    }
}
