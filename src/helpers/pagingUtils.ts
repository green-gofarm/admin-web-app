export const getInteger = (number: any) => {
    const _number = parseInt(number);
    return !isNaN(_number) ? number : 0;
}

export const isIntegerNumeric = (value: any) => {
    return value != null && !isNaN(parseInt(value));
}
