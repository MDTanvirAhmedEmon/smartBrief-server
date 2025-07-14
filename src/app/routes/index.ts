import { Router } from "express";
import { UserRouter } from "../modules/users/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { SummaryRouter } from "../modules/summary/summary.route";
const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRouter,
    },
    {
        path: '/auth',
        route: AuthRouter,
    },
    {
        path: '/summary',
        route: SummaryRouter,
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;