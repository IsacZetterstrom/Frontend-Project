import React from "react";
import { Form } from "react-bootstrap";
/**
 * @author Oskar Dahlberg
 * @description Form component to set AI temperature.
 */
function FormRange({ temperature, setTemperature }) {
    const handleTemperatureChange = (e) => {
        setTemperature(e.target.value);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">

                <p>Mest trovärdiga resultat</p>
                <div className="d-flex flex-column align-items-center">
                    <p className="mt-2">{temperature / 100}</p>
                    <Form.Range className="form-range custom-range p-3"
                        onChange={handleTemperatureChange}
                        value={temperature}
                        min={1}
                        max={200}
                    />
                </div>
                <p>Mindre trovärdiga resultat</p>
            </div>
        </>
    );
};

export default FormRange