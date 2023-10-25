import { Form,Row,Col } from "react-bootstrap"
import SearchBar from "./SearchBar"
import SortForm from "./SortForm"
import FilterForm from "./FilterForm"
function LibaryForm() {
    return (
        <>
            <Form>
            <Row className="mb-3"  >
            <Col md={{ span: 10, offset: 1 }} >
                        <SearchBar></SearchBar>
            </Col>
            <Col xs={12} md={6} className="mx-auto">
                    <Row>
                        <Col xs={6} >
                            <SortForm></SortForm>
                        </Col>
                        <Col xs={6}>
                            <FilterForm></FilterForm>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </Form>
        </>
    )
}

export default LibaryForm