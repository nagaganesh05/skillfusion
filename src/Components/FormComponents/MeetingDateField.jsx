import React from 'react';
import { Form } from 'react-bootstrap';

const MeetingDateField = ({ selected, setStartDate }) => {
  const handleChange = (e) => {
    setStartDate(e.target.value);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Set Meeting Date</Form.Label>
      <Form.Control
        type="date"
        value={selected}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default MeetingDateField;
