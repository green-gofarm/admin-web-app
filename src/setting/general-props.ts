export interface PaginationProps {
    page: number,
    pageSize: number,
    orderBy?: string,
    orderDirection?: string,
    totalPage: number,
    totalItem: number,
}

export function removeNullProps(obj: any) {
    const filteredEntries = Object.entries(obj).filter(([key, value]) => value !== null && value !== undefined);
    return Object.fromEntries(filteredEntries);
}