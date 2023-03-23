export enum ROLES {
    ADMIN = 1,
    HOST = 2,
    CUSTOMER = 3
}

export const CURRENT_ROLE: ROLES = ROLES.ADMIN;

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

export const Interceptors = {
    pageNumber: (page: number) => page >= 1 ? page : 1
}