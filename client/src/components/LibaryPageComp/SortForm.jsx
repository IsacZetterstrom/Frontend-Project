import React from 'react'
import Form from 'react-bootstrap/Form';

function SortForm({ setSort }) {

    const handleSort = (event) => {
        setSort(event.target.value)
    };
    
    return (
        <>
            <Form.Select aria-label="sort movies" onChange={handleSort}>
                <option value="" >Sortera</option>
                <option value="dateHigh"  >Datum nya</option>
                <option value="dateLow" >Datum äldre</option>
                <option value="ratingHigh">Betyg högt</option>
                <option value="ratingLow">Betyg lågt</option>
            </Form.Select>

        </>
    )
}

export default SortForm