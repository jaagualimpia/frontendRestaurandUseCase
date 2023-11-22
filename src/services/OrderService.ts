import axios from "axios"
import { jsonToOrder } from "../mappers/jsonToOrder"
import { Order } from "../models/Order"


export const getAllOrders = async () => {
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/`)
    const finalResponse = []
    
    for (let i = 0; i < response.data.length; i++) {
        finalResponse.push(jsonToOrder(response.data[i]))
    }
    
    return finalResponse
}

export const postOrder = async (order: Order): Promise<number> => {
    let response = await axios.post(`${process.env.REACT_APP_API_URL}/orders/`, order)
    return response.data.id
}