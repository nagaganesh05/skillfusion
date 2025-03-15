import React from "react";
import { Form } from "react-bootstrap";

function MeetingMaximumField({ value, setValue }) {
  const handleChange = (e) => {
    const input = e.target.value;
    const parsedValue = parseInt(input);

    if (!input.length || parsedValue === 0) {
      setValue(1);
    } else if (parsedValue > 50) {
      setValue(50);
    } else {
      setValue(parsedValue);
    }
  };

  return (
    <Form.Group className="mb-3" controlId="maximumUsersField">
      <Form.Label>Maximum People</Form.Label>
      <Form.Control
        type="number"
        min={1}
        max={50}
        placeholder="Maximum People"
        value={value}
        onChange={handleChange}
      />
    </Form.Group>
  );
}

export default MeetingMaximumField;
