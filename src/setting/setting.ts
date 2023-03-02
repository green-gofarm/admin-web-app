import { equalIgnoreCase } from "../helpers/stringUtils";

export const ROLES = {
    ADMIN: "ADMIN",
    HOST: "HOST",
    CUSTOMER: "CUSTOMER"
}

export const isAdmin = (role: string) => {
    return equalIgnoreCase(role, ROLES.ADMIN);
}

export const isCustomer = (role: string) => {
    return equalIgnoreCase(role, ROLES.CUSTOMER);
}

export const isHost = (role: string) => {
    return equalIgnoreCase(role, ROLES.HOST);
}

export const GENDERS = {
    male: "Male",
    female: "Female"
}

export const genderOptions = [
    { label: "Male", value: GENDERS.male },
    { label: "Female", value: GENDERS.female }
]

export const convertNumberToGender = (genderNumber?: number | string | null) => {
    if (genderNumber === 1 || genderNumber === "1") return GENDERS.male;
    if (genderNumber === 0 || genderNumber === "0") return GENDERS.female;
    return null;
}

export const convertGenderToNumber = (gender?: string) => {
    if (gender === GENDERS.male) return 1;
    if (gender === GENDERS.female) return 0;
    return null;
}

export const CRUD_MODE = {
    view: "view",
    create: "create",
    edit: "edit",
    delete: "delete"
}