import { SortOrder } from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../users/user.model";
import { ISummary } from "./summary.interface";
import { Summary } from "./summary.model";
import OpenAI from "openai";
import { paginationHelpers } from "../../helpers/pagination";

interface IPaginationOptions {
    limit: number;
    page: number;
    sortBy: string;
    sortOrder: SortOrder | string;
}

const openai = new OpenAI({
    apiKey: config.openai_key,
});

const createSummary = async (userId: any, data: ISummary) => {
    const { originalContent } = data;
    const userInfo = await User.findById(userId);

    if ((userInfo?.credits || 0) < 1) {
        throw new AppError(400, "No credits left")
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful summarization assistant.",
            },
            // {
            //     role: "user",
            //     // content: prompt || `Please summarize the following content:\n\n${originalContent}`,
            //     content: `Please summarize the following content:\n\n${originalContent}`,
            // },
            {
                role: "user",
                content: `Please respond in JSON ONLY like:
                    {
                        "title": "Your generated title",
                        "summary": "Your generated summary"
                    }

                    Content:
                    ${originalContent}`
            },
        ],
    });
    const raw = completion.choices[0].message?.content?.trim() || "";

    const jsonMatch = raw.match(/```json([\s\S]*?)```/i);
    const jsonString = jsonMatch ? jsonMatch[1].trim() : raw;

    let parsed;
    try {
        parsed = JSON.parse(jsonString);
    } catch {
        throw new Error("Could not parse OpenAI JSON response");
    }

    const { title, summary } = parsed;

    const result = await Summary.create({
        user: userId,
        title,
        originalContent,
        summarizedContent: summary,
        wordCount: originalContent.split(" ").length,
    });



    if (!userInfo) {
        throw new Error("User not found.");
    }

    const newCredits = (userInfo.credits - 1);

    await User.findByIdAndUpdate(userId, { credits: newCredits });

    return result;
};

const getMySummary = async (userId: any) => {
    const summary = await Summary.find({ user: userId });
    return summary
}

const getSingleSummary = async (id: any) => {
    const summary = await Summary.findById({_id: id})
    return summary
}

const getAllSummaries = async (paginationOptions: IPaginationOptions, searchTerm: string) => {

    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = []
    const searchableField = ['summarizedContent'];
    if (searchTerm) {
        andConditions.push({
            $or: searchableField.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder as SortOrder;
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const summary = await Summary.find(whereConditions).sort(sortConditions).skip(skip).limit(limit)

    const total = await Summary.countDocuments(whereConditions);

    return {
        meta: { page, limit, total },
        data: summary,
    };
};


const deleteSummary = async (id: any, user: any): Promise<ISummary | null> => {
    if (user.role === "user") {
        const summary = await Summary.findOneAndDelete({ _id: id, user: user.id })
        return summary;
    }
    const summary = await Summary.findByIdAndDelete({ _id: id })
    return summary;
}

const updateSummary = async (id: any, user: any, data: Partial<ISummary>): Promise<ISummary | null> => {
    let summary;

    if (user.role === "user") {
        summary = await Summary.findOneAndUpdate(
            { _id: id, user: user.id },
            data,
            { new: true }
        );
    } else {
        summary = await Summary.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }

    return summary;
}


export const summaryServices = {
    createSummary,
    getMySummary,
    getSingleSummary,
    getAllSummaries,
    deleteSummary,
    updateSummary,
};
