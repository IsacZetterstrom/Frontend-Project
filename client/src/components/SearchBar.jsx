import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import SelectForm from './FilterForm';
import SortForm from './SortForm';
function SearchBar() {
    return (
        <>
            <Form>
                <Row className="mb-3"  >
                   
                    <Col md={{ span: 10, offset: 1 }} >
                        <Form.Group className="mb-3" controlId="formSearch">
                            <Form.Control type="search" placeholder="Sök på film" />
                        </Form.Group>
                    </Col>
                    
                    <Col xs={12} md={6} className="mx-auto">
                    <Row>
                        <Col xs={6} >
                            <SelectForm></SelectForm>
                        </Col>
                        <Col xs={6}>
                            <SortForm></SortForm>
                        </Col>
                    </Row>
                </Col>
                </Row>
            </Form>
        </>
    )
}

export default SearchBar