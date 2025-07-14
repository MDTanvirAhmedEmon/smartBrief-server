import config from "../../config";
import { ISummary } from "./summary.interface";
import { Summary } from "./summary.model";
import OpenAI from "openai"; // use the official OpenAI SDK

const openai = new OpenAI({
    apiKey: config.openai_key,
});

const createSummary = async (userId: any, data: ISummary) => {
    const { originalContent } = data;

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful summarization assistant.",
            },
            {
                role: "user",
                // content: prompt || `Please summarize the following content:\n\n${originalContent}`,
                content: `Please summarize the following content:\n\n${originalContent}`,
            },
        ],
    });

    console.log(completion.choices[0].message.content);

    completion.choices[0].message.content


    const summarizedContent = completion.choices[0].message?.content;

    // 2️⃣ Save to MongoDB
    const result = await Summary.create({
        user: userId,
        originalContent,
        summarizedContent,
        // promptUsed,
        wordCount: originalContent.split(" ").length,
    });

    // reduce one credit from user

    return result;
};

export const summaryServices = {
    createSummary,
};
