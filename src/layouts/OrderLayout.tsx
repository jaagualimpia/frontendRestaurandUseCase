import { Button, Row, Col, Container } from "react-bootstrap"
import { NavBarComponent } from "../components/NavBarComponent"

export const OrderLayout = () => {


    return (
        <>
            <NavBarComponent />
            <Container className="mt-3">
                <Row className="text-center">
                    <Col className="align-self-center">
                        <a href="/orders/create" className="btn btn-success"><b>Create a new order</b></a>
                    </Col>
                </Row>
            </Container>
        </>
    )
}