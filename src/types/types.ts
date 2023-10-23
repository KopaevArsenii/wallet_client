export interface IUserData {
    email: string;
    password: string;
}

export interface IUser {
    token: string;
}

export interface IResponseUser {
    email: string;
    id: number;
    createAt: string;
    updatedAt: string;
    password: string;
}

export interface IResponseUserData {
    token: string;
    user: IResponseUser;
}

export interface ICategory {
    title: string;
    id: number;
    createdAt: string;
    updatedAt: string;
    transactions: [];
}
