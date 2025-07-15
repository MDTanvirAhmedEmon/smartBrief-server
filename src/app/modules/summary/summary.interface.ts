import { Types } from "mongoose";

export type ISummary = {
  user: Types.ObjectId;
  originalContent: string;
  summarizedContent?: string;
  title?: string;
  prompt?: string;
  wordCount?: number;
};
