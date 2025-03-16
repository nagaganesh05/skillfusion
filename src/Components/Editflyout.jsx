
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Useauth from '../Hook/Useauth';
import UseFetchUsers from '../Hook/UseFetchUsers';
import UseToast from '../Hook/UseToast';
import { doc, updateDoc } from 'firebase/firestore';
import { firebaseDB } from '../Firebase/FirebaseConfig';
import MeetingMaximumField from './FormComponents/MeetingMaximumField';
import MeetingNameField from './FormComponents/MeetingNameField';
import MeetingUserField from './FormComponents/MeetingsUsersField';
import MeetingDateField from './FormComponents/MeetingDateField';
import CreateMeetingsButtons from './FormComponents/CreateMeetingsButtons';

const Editflyout = ({ closeFlyout, meeting }) => {
  Useauth();
  const [users] = UseFetchUsers();
  const createToast = UseToast();

  const [size, setSize] = useState(meeting?.maxUsers || 1);
  const [meetingName, setMeetingName] = useState(meeting?.meetingName || '');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [startDate, setStartDate] = useState(meeting?.meetingDate || '');
  const [meetingType] = useState(meeting?.meetingType || 'anyone-can-join');
  const [status, setStatus] = useState(meeting?.status ?? true);

  useEffect(() => {
    if (users && meeting?.invitedUsers) {
      const foundUsers = [];
      meeting.invitedUsers.forEach((userId) => {
        const user = users.find((u) => u.uid === userId);
        if (user) foundUsers.push(user);
      });
      setSelectedUsers(foundUsers);
    }
  }, [users, meeting]);

  const editMeeting = async () => {
    const updatedMeeting = {
      ...meeting,
      meetingName,
      meetingType,
      invitedUsers: selectedUsers.map((user) => user.uid),
      maxUsers: size,
      meetingDate: startDate,
      status,
    };
    delete updatedMeeting.docId;
    const docRef = doc(firebaseDB, 'meetings', meeting.docId);
    await updateDoc(docRef, updatedMeeting);
    createToast({ title: 'Meeting updated successfully.', type: 'success' });
    closeFlyout(true);
  };

  const onUserChange = (selectedOptions) => setSelectedUsers(selectedOptions);

  return (
    <Modal show onHide={() => closeFlyout()} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <MeetingNameField
            label="Meeting name"
            isInvalid={false}
            error={[]}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />

          {meetingType === 'anyone-can-join' ? (
            <MeetingMaximumField value={size} setValue={setSize} />
          ) : (
            <MeetingUserField
              label="Invite Users"
              isInvalid={false}
              error={[]}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={meetingType === '1-on-1' ? { asPlainText: true } : false}
              isClearable={false}
              placeholder="Select users"
            />
          )}

          <MeetingDateField selected={startDate} setStartDate={setStartDate} />

          <Form.Group className="mt-3" controlId="statusSwitch">
            <Form.Check
              type="switch"
              label="Cancel Meeting"
              checked={!status}
              onChange={(e) => setStatus(!e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CreateMeetingsButtons createMeeting={editMeeting} isEdit closeFlyout={closeFlyout} />
      </Modal.Footer>
    </Modal>
  );
};

export default Editflyout;
