
export const dateComparator = (event1: any, event2: any) => {
    if (new Date(event1.startTime) < new Date(event2.startTime)) return -1;
    if (new Date(event1.startTime) > new Date(event2.startTime)) return 1;
    return 0;
}

export const sortDateArray = (array: any, comparator: any) => {
    if (!Array.isArray(array) || array.length < 2) return array;

    const sortedArray = [...array];
    sortedArray.sort(comparator);

    return sortedArray;
}

export function isAvailableArray<T>(value: T | readonly T[]): value is readonly T[] {
    return Array.isArray(value) && value.length > 0;
}