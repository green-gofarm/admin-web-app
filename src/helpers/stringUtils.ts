

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

export function convertToMoney(amount?: number): string | null {
    if (!amount) {
        return null;
    }

    const moneyString = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return moneyString.replace('₫', 'đ');;
}

export function createCodeString(prefix?: string, code?: number | string, minCodeLength: number = 6) {
    const _code = code ?? "";
    const paddedCode = String(_code).padStart(minCodeLength, '0');
    if (prefix) {
        return `${prefix}-${paddedCode}`;
    }

    return paddedCode;
}

