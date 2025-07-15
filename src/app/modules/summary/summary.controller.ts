import { NextFunction, Request, Response } from "express";
import { summaryServices } from "./summary.services";


const createSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const userId = req?.user?.id
        const result = await summaryServices.createSummary(userId, data)

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

const getMySummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req?.user?.id
        const result = await summaryServices.getMySummary(userId)

        res.status(200).json({
            success: true,
            message: 'get my summary successfully',
            result,
        })
    }
    catch (error) {
        next(error)
    }
}

const getAllSummaries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, page, sortBy, sortOrder, searchTerm } = req.query;

        const paginationOptions = {
            limit: Number(limit) || 10,
            page: Number(page) || 1,
            sortBy: sortBy?.toString() || 'createdAt',
            sortOrder: sortOrder?.toString() === 'desc' ? 'desc' : 'desc',
        };

        const result = await summaryServices.getAllSummaries(paginationOptions, searchTerm as string);
        res.status(200).json({
            success: true,
            message: "get all summaries successfully",
            data: result,
        })
    }
    catch (error) {
        next(error)
    }
}

const deleteSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const user = req.user
        const result = await summaryServices.deleteSummary(id, user)

        res.status(200).json({
            success: true,
            message: 'deleted summary successfully',
            result,
        })
    }
    catch (error) {
        next(error)
    }
}

const updateSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const user = req.user
        const data = req.body;
        const result = await summaryServices.updateSummary(id, user, data)

        res.status(200).json({
            success: true,
            message: 'updated summary successfully',
            result,
        })
    }
    catch (error) {
        next(error)
    }
}

export const summaryController = {
    createSummary,
    getMySummary,
    getAllSummaries,
    deleteSummary,
    updateSummary,
}