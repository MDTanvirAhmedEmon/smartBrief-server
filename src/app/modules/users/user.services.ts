import { SortOrder, Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { sendEmail } from '../../utils/sendEmail';
import { IUser } from "./user.interface";
import { User } from "./user.model"
import { IPaginationOptions } from '../../global/globalType';
import { paginationHelpers } from '../../helpers/pagination';

interface Meta {
    page: number;
    limit: number;
    total: number;
}

interface ApiResponse<T> {
    data: T;
    meta: Meta;
}

const createUser = async (validateUser: Partial<IUser>): Promise<any> => {

    validateUser.role = "user";
    validateUser.isDeleted = false;
    validateUser.status = "in-progress";

    const isExist = await User.findOne({ email: validateUser?.email })
    if (isExist) {
        throw new AppError(400, 'User already exists!')
    }

    const result = await User.create(validateUser);
    return result
}

const getMe = async (userId: any): Promise<IUser | null> => {
    const result = await User.findById({ _id: userId }).select("-password");
    return result;
}


const uploadUserImage = async (userId: any, file: any, data: Partial<IUser>) => {

    if (file) {
        data.profileImageUrl = `/uploads/${file.filename}`;
        // const uploadedImage: any = await uploadToCloudinary(file)
        // data.profileImageUrl = uploadedImage.secure_url
    }

    const result = await User.findByIdAndUpdate(
        { _id: userId },
        data,
        { new: true }
    ).select("-password -accountVerifiedToken -resetPasswordToken -resetPasswordExpires");

    return result

}


const deleteUser = async (userId: any): Promise<IUser | null> => {
    const userIdStr = new Types.ObjectId(userId);
    const result = await User.findByIdAndUpdate({ _id: userIdStr }, { isDeleted: true }, { new: true })
    return result
};


const getAllUser = async (paginationOptions: IPaginationOptions, searchTerm: string): Promise<ApiResponse<IUser[]>> => {

    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = []
    const searchableField = ['fullName', 'email'];
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
    // If there is no condition , put {} to give all data
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await User.find(whereConditions).sort(sortConditions).skip(skip).limit(limit).select("-password -accountVerifiedToken -resetPasswordToken -resetPasswordExpires");

    const total = await User.countDocuments(whereConditions);

    return {
        meta: { page, limit, total },
        data: result,
    };
};


const blockUnblock = async (id: string): Promise<any> => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(400, 'user does not exits')
    }
    const newStatus = user.status === "blocked" ? "in-progress" : "blocked";
    const uploadedStatus = {
        status: newStatus
    }

    const result = await User.findByIdAndUpdate({ _id: id }, uploadedStatus, { new: true })
    return {
        message: `user ${result?.status}`
    }
}

export const userServices = {
    createUser,
    getMe,
    uploadUserImage,
    deleteUser,
    getAllUser,
    blockUnblock,
}