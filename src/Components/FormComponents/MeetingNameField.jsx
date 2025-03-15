
import React from 'react';
import { Form } from 'react-bootstrap';

const MeetingNameField = ({ label, placeholder, value, setMeetingName,isInvalid,error }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={placeholder}
        isInvalid={isInvalid}
        error={error}
        value={value}
        onChange={(e) => setMeetingName(e.target.value)}
      />
    </Form.Group>
  );
};

export default MeetingNameField;
