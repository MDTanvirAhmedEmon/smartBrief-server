
export type IUser = {
    email: string;
    password: string;
    passwordChangedAt?: Date;
    role: "user" | "admin" | "editor" | "reviewer";
    fullName: string;
    address?: string;
    gender?: 'male' | 'female' | 'others';
    contactNo?: string
    profileImageUrl?: string
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
    credits: number;
    isActive: boolean;
}