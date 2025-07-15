import { Router } from "express";
import { summaryController } from "./summary.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = Router();

router.post('/create', auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    summaryController.createSummary
)

router.get('/my-summary', auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    summaryController.getMySummary
)

router.get('/', auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR, ENUM_USER_ROLE.REVIEWER),
    summaryController.getAllSummaries
)

router.get('/:id', auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR, ENUM_USER_ROLE.REVIEWER),
    summaryController.getSingleSummary
)

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR, ENUM_USER_ROLE.USER),
    summaryController.deleteSummary
)

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EDITOR, ENUM_USER_ROLE.USER),
    summaryController.updateSummary
)





export const SummaryRouter = router;