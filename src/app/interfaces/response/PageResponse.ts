export interface PageResponse<T> {
    content: Array<T>;
    totalPages: number;
    size: number;
    totalElements: number;
    number: number;
}