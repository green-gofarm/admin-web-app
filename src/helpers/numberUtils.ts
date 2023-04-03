export const PERCENT_PRECISION = 4;

export const isNumber = (number: any): number is number => {
    return number != null && (!isNaN(number) || typeof number === "number");
}

export function formatNumber(number: number, decimalPlaces = 0): string {
    const options = {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    };
    return number.toLocaleString('vi-VN', options);
}