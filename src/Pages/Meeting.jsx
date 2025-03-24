

// import React, { useEffect, useState } from 'react';
// import { Table, Button, Badge, Container, Row, Col, Card } from 'react-bootstrap';
// import { getDocs, where, query } from 'firebase/firestore';
// import { meetingsRef } from '../Firebase/FirebaseConfig';
// import moment from 'moment';
// import { Link } from 'react-router-dom';
// import { useAppSelector } from '../Redux/Hooks';
// import Header from '../Components/Header';
// import Useauth from '../Hook/Useauth';


// const Meeting = () => {
//   Useauth();
//   const [meetings, setMeetings] = useState([]);
  

//   const userInfo = useAppSelector((state) => state.auth.userInfo);


//   useEffect(() => {
//     if(userInfo){
//         const getUserMeetings = async () => {
//             const firestoreQuery = query(meetingsRef)
//             const fetchedMeetings = await getDocs(firestoreQuery)
//             if(fetchedMeetings.docs.length){
//                 const myMeetings : Array<MeetingType> = []
//                 fetchedMeetings.forEach(meeting=>{
//                     const data  = meeting.data() as MeetingType
//                     if (data.createdBy === userInfo?.uid){
//                         myMeetings.push(meeting.data() as MeetingType);}
//                       else if (data.meetingType === "anyone-can-join"){
//                         myMeetings.push(meeting.data() as MeetingType);}
//                       else {
//                         const index = data.invitedUsers.findIndex(
//                           (user: string) => user === userInfo?.uid
//                         );
//                         if (index !== -1) {
//                           myMeetings.push(meeting.data() as MeetingType);
//                         }
//                 })
//                 setMeetings(myMeetings)
//             }
//         }
//         getUserMeetings()
//     }
//   }, [userInfo]);

 

//   const copyLink = (meetingId) => {
//     const link = `${import.meta.env.VITE_APP_HOST}/join/${meetingId}`;
//     navigator.clipboard.writeText(link);
//     alert('Meeting link copied!');
//   };

//   const getStatusBadge = (meeting) => {
//     if (!meeting.status) return <Badge bg="danger">Cancelled</Badge>;

//     const today = moment().startOf('day');
//     const meetingDate = moment(meeting.meetingDate, 'YYYY-MM-DD').startOf('day');

//     if (meetingDate.isSame(today)) {
//       return (
//         <Badge bg="success">
//           <Link to={`/join/${meeting.meetingId}`} style={{ color: 'white', textDecoration: 'none' }}>
//             Join Now
//           </Link>
//         </Badge>
//       );
//     } else if (meetingDate.isBefore(today)) {
//       return <Badge bg="secondary">Ended</Badge>;
//     } else {
//       return <Badge bg="primary">Upcoming</Badge>;
//     }
//   };

//   return (
//     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <Header />
//       <Container className="my-4">
//         <Row className="justify-content-center">
//           <Col md={12}>
//             <Card>
//               <Card.Header><h4>My Meetings</h4></Card.Header>
//               <Card.Body>
//                 <Table striped bordered hover responsive>
//                   <thead>
//                     <tr>
//                       <th>Meeting Name</th>
//                       <th>Meeting Type</th>
//                       <th>Meeting Date</th>
//                       <th>Status</th>
//                       <th>Edit</th>
//                       <th>Copy Link</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {meetings.map((meeting, idx) => {
//                       const meetingDate = moment(meeting.meetingDate, 'YYYY-MM-DD').startOf('day');
//                       const today = moment().startOf('day');
//                       return (
//                         <tr key={idx}>
//                           <td>{meeting.meetingName}</td>
//                           <td>{meeting.meetingType}</td>
//                           <td>{meeting.meetingDate}</td>
//                           <td>{getStatusBadge(meeting)}</td>
//                           {/* <td>
//                             <Button
//                               variant="outline-danger"
//                               size="sm"
//                               // disabled={!meeting.status || meetingDate.isBefore(today)}
//                               onClick={() => openEditFlyout(meeting)}
//                             >
//                               ✎ Edit
//                             </Button>
//                           </td> */}
//                           <td>
//                             <Button variant="outline-secondary" size="sm" onClick={() => copyLink(meeting.meetingId)}>
//                               📋 Copy
//                             </Button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                     {meetings.length === 0 && (
//                       <tr>
//                         <td colSpan="6" className="text-center text-muted">
//                           No meetings found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
     


//     </div>
//   );
// };

// export default Meeting;




import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Container, Row, Col, Card } from 'react-bootstrap';
import { getDocs, query } from 'firebase/firestore';
import { meetingsRef } from '../Firebase/FirebaseConfig';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../Redux/Hooks';
import Header from '../Components/Header';
import Useauth from '../Hook/Useauth';

const Meeting = () => {
  Useauth();
  const [meetings, setMeetings] = useState([]);

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      const getUserMeetings = async () => {
        const firestoreQuery = query(meetingsRef);
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          const myMeetings = [];
          fetchedMeetings.forEach((meeting) => {
            const data = meeting.data();

            if (data.createdBy === userInfo.uid) {
              myMeetings.push(data);
            } else if (data.meetingType === 'anyone-can-join') {
              myMeetings.push(data);
            } else {
              const index = data.invitedUsers?.findIndex((user) => user === userInfo.uid);
              if (index !== -1) {
                myMeetings.push(data);
              }
            }
          });

          setMeetings(myMeetings);
        }
      };

      getUserMeetings();
    }
  }, [userInfo]);

  const copyLink = (meetingId) => {
    const link = `${window.location.origin}/join/${meetingId}`;
    navigator.clipboard.writeText(link);
    alert('Meeting link copied!');
  };

  const getStatusBadge = (meeting) => {
    if (!meeting.status) return <Badge bg="danger">Cancelled</Badge>;

    const today = moment().startOf('day');
    const meetingDate = moment(meeting.meetingDate, 'YYYY-MM-DD').startOf('day');

    if (meetingDate.isSame(today)) {
      return (
        <Badge bg="success">
          <Link to={`/join/${meeting.meetingId}`} style={{ color: 'white', textDecoration: 'none' }}>
            Join Now
          </Link>
        </Badge>
      );
    } else if (meetingDate.isBefore(today)) {
      return <Badge bg="secondary">Ended</Badge>;
    } else {
      return <Badge bg="primary">Upcoming</Badge>;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={12}>
            <Card>
              <Card.Header>
                <h4>My Meetings</h4>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Meeting Name</th>
                      <th>Meeting Type</th>
                      <th>Meeting Date</th>
                      <th>Status</th>
                      <th>Copy Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetings.map((meeting, idx) => (
                      <tr key={idx}>
                        <td>{meeting.meetingName}</td>
                        <td>{meeting.meetingType}</td>
                        <td>{meeting.meetingDate}</td>
                        <td>{getStatusBadge(meeting)}</td>
                        <td>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => copyLink(meeting.meetingId)}
                          >
                            📋 Copy
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {meetings.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          No meetings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Meeting;
