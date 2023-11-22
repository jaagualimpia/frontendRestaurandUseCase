import axios from "axios"
import { jsonToProduct } from "../mappers/jsonToProduct"
import { Product } from "../models/Product"
import { ProductInOrder } from "../models/ProductInOrder"

interface ProductInsertionProps {
    products: ProductInOrder[],
    OwnerId: number,
}

export const getAllProducts = async (): Promise<Product[]> => {
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/products/`)
    const finalResponse: Product[] = []
    
    for (let i = 0; i < response.data.length; i++) {
        finalResponse.push(jsonToProduct(response.data[i]))
    }
    
    return finalResponse
}

export const getProductById = async (id: number): Promise<Product> => {
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`)
    const product = jsonToProduct(response.data)
    
    return product
}

export const postProducts = async (products: ProductInOrder[], OwnerId: number) => {
    let productOrder = {
        products,
        OwnerId
    }

    let response = await axios.post(`${process.env.REACT_APP_API_URL}/products/`, productOrder)
    return response.data
}