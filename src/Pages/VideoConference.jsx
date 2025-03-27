
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
import MeetingMaximumField from '../Components/FormComponents/MeetingMaximumField';

const VideoConference = () => {
    Useauth();

    const uid = useAppSelector((state) => state.auth.userInfo?.uid);
    const [users] = UseFetchUsers();
    const createToast = UseToast();
    const navigate = useNavigate();

    const [size, setSize] = useState(1);
    const [anyonecanjoin, setAnyonecanjoin] = useState(false);
    const [meetingName, setMeetingName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const [showErrors, setShowErrors] = useState({
        meetingName: { show: false, message: [] },
        meetingUser: { show: false, message: [] },
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

        if (!selectedUsers.length && !anyonecanjoin) {
            updatedErrors.meetingUser.show = true;
            updatedErrors.meetingUser.message = ['Please select at least one user'];
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
                    meetingType: anyonecanjoin ? 'anyone-can-join' : 'video-conference',
                    invitedUsers: anyonecanjoin ? [] : selectedUsers.map((user) => user.id),
                    meetingDate: startDate,
                    maxUsers: anyonecanjoin ? 100 : size,
                    status: true,
                });

                createToast({
                    title: anyonecanjoin
                        ? 'Anyone-can-join meeting created successfully'
                        : 'Video conference created successfully',
                    type: 'success',
                });

                navigate('/dashboard');
            } catch (error) {
                console.error('Error creating meeting:', error);
                createToast({
                    title: 'Failed to create meeting. Try again.',
                    type: 'danger',
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
                            <Form.Group className="mb-3" controlId="anyoneCanJoinCheckbox">
                                <Form.Check
                                    type="switch"
                                    label="Anyone can join"
                                    checked={anyonecanjoin}
                                    onChange={(e) => setAnyonecanjoin(e.target.checked)}
                                />
                            </Form.Group>

                            <MeetingNameField
                                label="Meeting Name"
                                placeholder="Enter meeting name"
                                value={meetingName}
                                setMeetingName={setMeetingName}
                                isInvalid={showErrors.meetingName.show}
                                error={showErrors.meetingName.message}
                            />

                            {/* {!anyonecanjoin && (
                                <MeetingUserField
                                    label="Invite User"
                                    options={users}
                                    onChange={onUserChange}
                                    selectedOptions={selectedUsers}
                                    singleSelection={false}
                                    isClearable={false}
                                    placeholder="Select a User"
                                    isInvalid={showErrors.meetingUser.show}
                                    error={showErrors.meetingUser.message}
                                />
                            )} */}

                            {anyonecanjoin ? <MeetingMaximumField value={size} setValue={setSize}/> :

                                <MeetingUserField
                                    label="Invite User"
                                    options={users}
                                    onChange={onUserChange}
                                    selectedOptions={selectedUsers}
                                    singleSelection={false}
                                    isClearable={false}
                                    placeholder="Select a User"
                                    isInvalid={showErrors.meetingUser.show}
                                    error={showErrors.meetingUser.message}
                                />

                            }


                            <MeetingDateField selected={startDate} setStartDate={setStartDate} />

                            <CreateMeetingsButtons isEdit={false} createMeeting={createMeeting}/>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default VideoConference;


