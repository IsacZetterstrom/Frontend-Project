import { Form, Row, Col } from "react-bootstrap"
import SearchBar from "./SearchBar"
import SortForm from "./SortForm"
import FilterForm from "./FilterForm"

/**
 * @author Oskar dahlberg
 * @Description Search, filter and sort for libarypage.
 */
function LibaryForm({ setSearch, setSort, setFilter }) {
    return (
            <Form>
                <Row className="mb-3"  >
                    <Col md={{ span: 10, offset: 1 }} >
                        <SearchBar setSearch={setSearch}></SearchBar>
                    </Col>
                    <Col xs={12} md={6} className="mx-auto">
                        <Row>
                            <Col xs={6} >
                                <SortForm setSort={setSort}></SortForm>
                            </Col>
                            <Col xs={6}>
                                <FilterForm setFilter={setFilter}></FilterForm>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
    )
}

export default LibaryForm