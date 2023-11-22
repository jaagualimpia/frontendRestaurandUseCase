import { EntityBase } from "./EntityBase";

export interface Product extends EntityBase {
    name: string
    price: number 
    description: string
}