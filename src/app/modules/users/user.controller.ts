import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import { userValidationSchema } from "./user.validation";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const validateData = userValidationSchema.parse(data)

        const result = await userServices.createUser(validateData);
        res.status(200).json({
            success: true,
            message: result?.message,
            data: result,
        })
    }
    catch (error) {
        next(error)
    }
}

const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const userId = user?.id;
        const result = await userServices.getMe(userId);
        res.status(200).json({
            success: true,
            message: "get user info successfully",
            data: result,
        })
    }
    catch (error) {
        next(error)
    }
}


const uploadUserImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req?.file
        const rawData = req.body?.data;
        const data = rawData ? JSON.parse(rawData) : {};
        const user = req.user
        const userId = user?.id;
        const result = await userServices.uploadUserImage(userId, file, data);

        res.status(200).json({
            success: true,
            message: 'user updated successfully',
            data: result,
        })
    }
    catch (error) {
        next(error)
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const userId = user?.id;
        const result = await userServices.deleteUser(userId);

        res.status(200).json({
            success: true,
            message: 'user deleted successfully',
            data: result,
        })
    }
    catch (error) {
        next(error)
    }
}

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, page, sortBy, sortOrder, searchTerm } = req.query;

        const paginationOptions = {
            limit: Number(limit) || 10,
            page: Number(page) || 1,
            sortBy: sortBy?.toString() || 'createdAt',
            sortOrder: sortOrder?.toString() === 'desc' ? 'desc' : 'desc',
        };

        const result = await userServices.getAllUser(paginationOptions, searchTerm as string);
        res.status(200).json({
            success: true,
            message: "get all user info successfully",
            data: result,
        })
    }
    catch (error) {
        next(error)
    }
}

const blockUnblock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const result = await userServices.blockUnblock(id);
        res.status(200).json({
            success: true,
            message: result.message,
            data: result,
        })

    }
    catch (error) {
        next(error)
    }
}

export const userController = {
    getAllUser,
    createUser,
    getMe,
    uploadUserImage,
    deleteUser,
    blockUnblock,
}