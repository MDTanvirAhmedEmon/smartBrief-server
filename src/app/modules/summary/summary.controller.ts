import { NextFunction, Request, Response } from "express";
import { summaryServices } from "./summary.services";


const createSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const userId = req?.user?.id
        const result = await summaryServices.createSummary(userId,data)

        res.status(200).json({
            success: true,
            message: 'summary created successfully',
            result,
        })
    }
    catch (error) {
        next(error)
    }
}

export const summaryController = {
    createSummary,
}