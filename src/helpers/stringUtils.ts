

export const isString = (string: any) => {
    return string != null && typeof string === "string";
}

export const equalIgnoreCase = (stringOne: any, stringTwo: any) => {
    if (!isString(stringOne)) return false;
    if (!isString(stringTwo)) return false;
    return stringOne.toLowerCase() === stringTwo.toLowerCase();
}

export function reverseString(str: string) {
    return str.split("").reverse().join("");
}