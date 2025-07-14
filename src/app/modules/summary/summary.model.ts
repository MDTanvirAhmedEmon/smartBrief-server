import { Schema, model } from "mongoose";
import { ISummary } from "./summary.interface";

const summarySchema = new Schema<ISummary>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        originalContent: {
            type: String,
            required: true,
        },
        summarizedContent: {
            type: String,
        },
        prompt: {
            type: String,
        },
        wordCount: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);

export const Summary = model<ISummary>("Summary", summarySchema);
