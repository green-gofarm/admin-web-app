import { Accept } from "react-dropzone";

export enum ROLES {
    ADMIN = 1,
    HOST = 2,
    CUSTOMER = 3
}

export const CURRENT_ROLE: ROLES = (() => {
    const role = process.env.REACT_APP_CURRENT_ROLE;
    if (role) {
        const currentRole = parseInt(role);
        if (currentRole in ROLES) {
            return currentRole;
        }
    }
    return ROLES.ADMIN;
})();

enum GENDERS {
    male = 1,
    female = 2,
    other = 3
}

export const genderOptions = [
    { label: "Nam", value: GENDERS.male },
    { label: "Nữ", value: GENDERS.female },
    { label: "Khác", value: GENDERS.other }
]

export const CRUD_MODE = {
    view: "view",
    create: "create",
    edit: "edit",
    delete: "delete"
}

export const Interceptors = {
    pageNumber: (page: number) => page >= 1 ? page : 1
}

export const imageAcceptType: Accept = {
    "image/*": [".png", ".gif", ".jpeg", ".jpg"],
}