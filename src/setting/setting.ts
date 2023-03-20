export enum ROLES {
    ADMIN = "Quản trị viên",
    HOST = "Chủ farmstay",
    CUSTOMER = "Khách du lịch"
}

export const CURRENT_ROLE: ROLES = ROLES.HOST;

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