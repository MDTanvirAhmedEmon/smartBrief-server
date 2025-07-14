import { Router } from "express";
import { summaryController } from "./summary.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = Router();

router.post('/create', auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    summaryController.createSummary
)





export const SummaryRouter = router;