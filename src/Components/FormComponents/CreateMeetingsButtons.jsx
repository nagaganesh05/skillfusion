
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateMeetingsButtons = ({ isEdit = false, closeFlyout, createMeeting }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (isEdit && closeFlyout) {
      closeFlyout();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <Row className="mt-3">
      <Col xs="auto">
        <Button variant="danger" type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </Col>
      <Col xs="auto">
        <Button type="button" variant="primary" onClick={createMeeting}>
          {isEdit ? 'Edit Meeting' : 'Create Meeting'}
        </Button>
      </Col>
    </Row>
  );
};

export default CreateMeetingsButtons;
