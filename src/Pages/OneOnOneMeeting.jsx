
import React, { useState } from 'react';
import Header from '../Components/Header';
import MeetingNameField from '../Components/FormComponents/MeetingNameField';
import MeetingUserField from '../Components/FormComponents/MeetingsUsersField';
import MeetingDateField from '../Components/FormComponents/MeetingDateField';
import CreateMeetingsButtons from '../Components/FormComponents/CreateMeetingsButtons';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Useauth from '../Hook/Useauth';
import UseFetchUsers from '../Hook/UseFetchUsers';
import { addDoc } from 'firebase/firestore';
import { meetingsRef } from '../Firebase/FirebaseConfig';
import { GenerateMeetingId } from '../Firebase/GenerateMeetingId';
import { useAppSelector } from '../Redux/Hooks';
import { useNavigate } from 'react-router-dom';
import UseToast from '../Hook/UseToast';

const OneOnOneMeeting = () => {
  Useauth(); 

  const uid = useAppSelector((state) => state.auth.userInfo?.uid);
  const [users] = UseFetchUsers();
  const createToast = UseToast(); 
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
  });

  const [showErrors, setShowErrors] = useState({
    meetingName: { show: false, message: [] },
    meetingUser: { show: false, message: [] }
  });

  const validateForm = () => {
    let errors = false;
    const updatedErrors = { ...showErrors };

    if (!meetingName.trim()) {
      updatedErrors.meetingName.show = true;
      updatedErrors.meetingName.message = ['Please enter a meeting name'];
      errors = true;
    } else {
      updatedErrors.meetingName.show = false;
      updatedErrors.meetingName.message = [];
    }

    if (!selectedUsers.length) {
      updatedErrors.meetingUser.show = true;
      updatedErrors.meetingUser.message = ['Please select a user'];
      errors = true;
    } else {
      updatedErrors.meetingUser.show = false;
      updatedErrors.meetingUser.message = [];
    }

    setShowErrors(updatedErrors);
    return errors;
  };

  const onUserChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
  };

  const createMeeting = async (e) => {
    e.preventDefault(); 

    if (!uid) {
      createToast({ title: 'User not logged in', type: 'danger' });
      return;
    }

    if (!validateForm()) {
      const meetingId = GenerateMeetingId();

      try {
        await addDoc(meetingsRef, {
          createdBy: uid,
          meetingId,
          meetingName,
          meetingType: '1-on-1',
          invitedUsers: [selectedUsers[0]?.uid || 'unknown-user'],
          meetingDate: startDate,
          maxUsers: 1,
          status: true,
        });

        createToast({
          title: 'One-on-One Meeting Created Successfully',
          type: 'success'
        });

        navigate('/dashboard');
      } catch (error) {
        console.error('Error creating meeting:', error);
        createToast({
          title: 'Failed to create meeting. Try again.',
          type: 'danger'
        });
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            
            <Form onSubmit={createMeeting}>
              <MeetingNameField
                label="Meeting Name"
                placeholder="Enter meeting name"
                value={meetingName}
                setMeetingName={setMeetingName}
                isInvalid={showErrors.meetingName.show}
                error={showErrors.meetingName.message}
              />

              <MeetingUserField
                label="Invite User"
                options={users}
                onChange={onUserChange}
                selectedOptions={selectedUsers}
                isClearable={false}
                placeholder="Select a User"
                isInvalid={showErrors.meetingUser.show}
                error={showErrors.meetingUser.message}
              />

              <MeetingDateField
                selected={startDate}
                setStartDate={setStartDate}
              />

              <CreateMeetingsButtons isEdit={false} createMeeting={createMeeting} />
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OneOnOneMeeting;
