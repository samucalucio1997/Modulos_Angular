export interface PageResponse<T> {
    content: Array<T>;
    totalPages: number;
    pageSize: number;
    totalElements: number;
    number: number;
}