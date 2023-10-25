import React from 'react'
import Form from 'react-bootstrap/Form';
function SearchBar() {
    return (
        <>
                        <Form.Group className="mb-3" controlId="formSearch">
                            <Form.Control type="search" placeholder="Sök på film" />
                        </Form.Group>
        </>
    )
}

export default SearchBar