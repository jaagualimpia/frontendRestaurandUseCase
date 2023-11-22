import { Product } from "../models/Product"

export const jsonToProduct = (data: any): Product => {
    let product: Product = {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price
    }
    
    return product
}