import { Button, Col, Container, Form, Row, Table, Modal } from "react-bootstrap"
import { NavBarComponent } from "../components/NavBarComponent"
import { useEffect, useState } from "react"
import { TableITemComponent } from "../components/TableItemComponent"
import { getAllProducts, postProducts } from "../services/ProductService"
import { Product } from "../models/Product"
import { postOrder } from "../services/OrderService"
import { Order } from "../models/Order"
import { ProductInOrder } from "../models/ProductInOrder"

const ErrorModal = ({ show, handleClose, errorMessage }: any) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export const OrderMakingLayout = () => {
    const [items, setItems] = useState<ProductInOrder[]>([])
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false)

    }

    useEffect(() => {
        const fetchData = async () => {
            let response: Product[] = await getAllProducts()

            const finalResponse: ProductInOrder[] = response.map((product) => {
                return { product: product, quantity: 0 }
            })

            setItems(finalResponse)

        }
        fetchData()
    }, [])

    const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let order: Order = {
            id: 0,
            owner: String(e.currentTarget.formOrderOwner.value),
            date: String(e.currentTarget.formDate.value),
            total: calculateTotal(),
            status: String(e.currentTarget.formStatus.value),
            address: String(e.currentTarget.formAddress.value),
        }

        if (order.total > 0){
            let orderId = await postOrder(order)
            await postProducts(items, orderId) === -1 ? setShow(true) : setShow(false)         
        }
    }

    const onQuantityChange = (id: number, quantity: number) => {
        let newItems = items.map((item) => {
            if (item.product.id === id) {
                return { product: item.product, quantity: quantity }
            } else {
                return item
            }
        })
        setItems(newItems)
    }

    const calculateTotal = () => {
        let total = 0
        items.forEach((item) => {
            if (item.quantity > 0) {
                total += item.product.price * item.quantity
            }
        })
        return total
    }

    return (
        <>
            <NavBarComponent />
            <Container className="mt-3">
                <Row>
                    <Col>
                        <Form onSubmit={onSubmitHandle}>
                            <Form.Group controlId="formOrderOwner" className="my-2">
                                <Form.Label>Order Owner</Form.Label>
                                <Form.Control type="text" placeholder="Enter Order Owner" />
                            </Form.Group>

                            <Form.Group controlId="formDate" className="my-2">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>

                            <Form.Group className="my-2" controlId="formStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option value="Delivered">Delivered</option>
                                    <option value="Not delivered">Not delivered</option>
                                    <option value="Pendig aproval">Pendig aproval</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formAddress" className="my-2">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter Address" />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Table striped bordered hover className="mt-3">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item) => <TableITemComponent item={item} onQuantityChange={onQuantityChange} />)}
                                        </tbody>

                                    </Table>
                                </Col>
                            </Row>
                            <Button variant="success" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <ErrorModal show={show} handleClose={handleClose} errorMessage={"Error"} />
        </>
    )
}