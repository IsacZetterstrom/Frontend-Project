import React from "react";
import { Form } from "react-bootstrap";
/**
 * @author Oskar Dahlberg
 * @description Form component to switch on swedish movies.
 */
function FormSwitch({ isSwedish, setIsSwedish, isGenre, setIsGenre }) {
    const handleSwitchChange = () => {
        setIsSwedish(!isSwedish);
    };
    const handleSwitchChangeGenre = () => {
        setIsGenre(!isGenre);
    };
    return (
        <>
            <Form.Check
                type="switch"
                id="swedish"
                label="Sök på svenska filmer"
                onChange={handleSwitchChange}
            />
            <Form.Check
                type="switch"
                id="genre"
                label="Inkludera film genres"
                onChange={handleSwitchChangeGenre}
            />
        </>
    );
};

export default FormSwitch