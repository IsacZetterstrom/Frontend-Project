import React from 'react'
import Form from 'react-bootstrap/Form';

function FilterForm({ setFilter }) {
    const handleFilter = (event) => {
        setFilter(event.target.value)
    };
    return (
        <>
            <Form.Select aria-label="Default select example" onChange={handleFilter}>
                <option value="">Välj åldersgräns</option>
                <option value="7">7</option>
                <option value="11">11</option>
                <option value="15">15</option>
            </Form.Select>
        </>
    )
}

export default FilterForm