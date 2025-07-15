import { Router } from "express";
import { userController } from "./user.controller";
import { upload } from "../../helpers/fileUploader";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getAllUser)
router.get('/get-me', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER), userController.getMe)
router.post('/sign-up', validateRequest(userValidationSchema),
    userController.createUser)
router.patch('/update-user', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER), upload.single('file'), userController.uploadUserImage)
router.delete('/delete-user', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER), userController.deleteUser)
router.patch('/block-unblock/:id', auth(ENUM_USER_ROLE.ADMIN), userController.blockUnblock)


export const UserRouter = router;