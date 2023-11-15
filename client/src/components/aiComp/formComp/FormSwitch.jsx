import React from "react";
import { Form } from "react-bootstrap";
/**
 * @author Oskar Dahlberg
 * @description Form component to switch on swedish movies.
 */
function FormSwitch({ isSwedish, setIsSwedish }) {
    const handleSwitchChange = () => {
        setIsSwedish(!isSwedish);
    };
    return (
        <>
            <Form.Check
                type="switch"
                id="swedish"
                label="Sök på svenska filmer"
                onChange={handleSwitchChange}
            />
        </>
    );
};

export default FormSwitch