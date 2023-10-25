import React from 'react'
import Form from 'react-bootstrap/Form';
function SearchBar({setSearch}) {

    const handleSearch = (event) => {
        event.preventDefault();
        setSearch(event.target.value)
      };
    
    return (
        <>
                        <Form.Group className="mb-3" controlId="formSearch">
                            <Form.Control type="search" 
                            placeholder="Sök på film" 
                            onChange={handleSearch}
                            />
                        </Form.Group>
        </>
    )
}

export default SearchBar