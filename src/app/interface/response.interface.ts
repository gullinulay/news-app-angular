import { Pagination } from "./pagination.interface"

export interface Response {
    pagination: Pagination
    data: any[]
}
