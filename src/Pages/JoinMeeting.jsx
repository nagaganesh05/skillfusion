
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth, meetingsRef } from '../Firebase/FirebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import moment from 'moment';
import UseToast from '../Hook/UseToast';
import { GenerateMeetingId } from '../Firebase/GenerateMeetingId';
import { Container, Spinner } from 'react-bootstrap';

const JoinMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const createToast = UseToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const meetingContainerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      setUserLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getMeetingData = async () => {
      if (id && userLoaded) {
        const firestoreQuery = query(meetingsRef, where('meetingId', '==', id));
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (!fetchedMeetings.empty) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user?.uid;
          const today = new Date().toISOString().split('T')[0]; 

          if (meeting.meetingType === '1-on-1') {
            const invitedUser = meeting.invitedUsers[0];
            if (invitedUser === user?.uid || isCreator) {
              if (moment(meeting.meetingDate, "YYYY-MM-DD").isSame(today, 'day')) {
                setIsAllowed(true);
              } else if (moment(meeting.meetingDate, "YYYY-MM-DD").isBefore(moment(today, "YYYY-MM-DD"))) {
                createToast({ title: 'Meeting has ended.', type: 'danger' });
                navigate(user ? '/dashboard' : '/login');
              } else {
                createToast({ title: `Meeting is on ${meeting.meetingDate}`, type: 'warning' });
                navigate(user ? '/dashboard' : '/');
              }
            } else {
              navigate(user ? '/dashboard' : '/');
            }

          } else if (meeting.meetingType === 'video-conference') {
            const isInvited = meeting.invitedUsers.includes(user?.uid);
            if (isInvited || isCreator) {
              if (moment(meeting.meetingDate, "YYYY-MM-DD").isSame(today, 'day')) {
                setIsAllowed(true);
              } else if (moment(meeting.meetingDate, "YYYY-MM-DD").isBefore(moment(today, "YYYY-MM-DD"))) {
                createToast({ title: 'Meeting has ended.', type: 'danger' });
                navigate(user ? '/dashboard' : '/');
              } else {
                createToast({ title: `Meeting is on ${meeting.meetingDate}`, type: 'warning' });
                navigate(user ? '/dashboard' : '/');
              }
            } else {
              createToast({ title: 'You are not invited to this meeting.', type: 'danger' });
              navigate(user ? '/dashboard' : '/');
            }

          } else {
            setIsAllowed(true);
          }
        } else {
          navigate('/dashboard');
        }
      }
    };

    getMeetingData();
  }, [userLoaded, id, user, navigate]);

  useEffect(() => {
    if (isAllowed && meetingContainerRef.current && user) {
      const appId = 518910758;
      const serverSecret = 'a375991731a4f5b62bd8600d686df4b4';

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        id,
        user.uid || GenerateMeetingId(),
        user.displayName || 'Guest'
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: meetingContainerRef.current,
        sharedLinks: [{
          name: 'Personal Link',
          url: `${window.location.origin}/join/${id}`
        }],
        maxUsers: 50,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference
        }
      });
    }
  }, [isAllowed, id, user]);

  return (
    <Container fluid className="p-0">
      {isAllowed ? (
        <div ref={meetingContainerRef} style={{ width: '100%', height: '100vh' }} />
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" role="status" />
        </div>
      )}
    </Container>
  );
};

export default JoinMeeting;
