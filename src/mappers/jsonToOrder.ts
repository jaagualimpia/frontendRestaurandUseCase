import { Order } from "../models/Order";

export const jsonToOrder = (data: any): Order => {
    let order: Order = {
        id: data.id,
        owner: data.owner,
        date: data.date,
        total: data.total,
        status: data.status,
        address: data.address
    }

    return order
}