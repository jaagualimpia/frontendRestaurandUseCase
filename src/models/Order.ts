import { EntityBase } from "./EntityBase";

export interface Order extends EntityBase {
    owner: string,
    date: string,
    total: number,
    status: string,
    address: string,
}