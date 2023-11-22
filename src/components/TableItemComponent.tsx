import { useState } from "react"
import { Button } from "react-bootstrap"
import { ProductInOrder } from "../models/ProductInOrder"

interface TableItemProps {
    item: ProductInOrder,
    onQuantityChange: (id: number, quantity: number) => void
}

export const TableITemComponent = ({ item, onQuantityChange }: TableItemProps) => {
    const [quantity, setQuantity] = useState(0)
    
    const addQuantity = () => {
        setQuantity(quantity + 1)
        onQuantityChange(item.product.id, quantity + 1)
    }

    const substractQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
            onQuantityChange(item.product.id, quantity - 1)
        }
    }

    return (
        <>
            <tr>
                <td>{item.product.name}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity * item.product.price}</td>
                <td>
                    <Button variant="dark" onClick={substractQuantity}>-</Button>
                    <Button variant="light" style={{"cursor": "none"}}>{quantity}</Button>
                    <Button variant="dark" onClick={addQuantity}>+</Button>
                </td>
            </tr>
        </>
    )
}