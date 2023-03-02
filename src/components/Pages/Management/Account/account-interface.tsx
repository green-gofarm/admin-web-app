export interface User {
    email: string;
    name: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string;
    role: string;
    gender: number;
    status: number;
    dateOfBirth: string | null;
    address: string | null;
    avatar: string | null;
    uuid: string | null;
    userId: number;
    id: number;
    createdDate: string | null;
    updatedDate: string | null;
}

export interface Data {
    data: User[];
}

export type UserData = Data['data'];
