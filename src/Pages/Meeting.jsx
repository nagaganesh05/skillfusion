
import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Container, Row, Col, Card, Form, Pagination } from 'react-bootstrap';
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
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const meetingsPerPage = 5;

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      const getUserMeetings = async () => {
        const firestoreQuery = query(meetingsRef);
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          let myMeetings = [];
          fetchedMeetings.forEach((meeting) => {
            const data = meeting.data();

            if (data.createdBy === userInfo.uid || data.meetingType === 'anyone-can-join' || (data.invitedUsers?.includes(userInfo.uid))) {
              myMeetings.push(data);
            }
          });

          // Sort meetings by newest first
          myMeetings.sort((a, b) => moment(b.meetingDate).valueOf() - moment(a.meetingDate).valueOf());

          setMeetings(myMeetings);
          setFilteredMeetings(myMeetings);
        }
      };

      getUserMeetings();
    }
  }, [userInfo]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredMeetings(meetings.filter(meeting => meeting.meetingName.toLowerCase().includes(term)));
    setCurrentPage(1);
  };

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

  // Pagination logic
  const indexOfLastMeeting = currentPage * meetingsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
  const currentMeetings = filteredMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting);
  const totalPages = Math.ceil(filteredMeetings.length / meetingsPerPage);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={12}>
            <Card>
              <Card.Header>
                <h4>My Meetings</h4>
                <Form.Control type="text" placeholder="Search by name..." value={searchTerm} onChange={handleSearch} />
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
                    {currentMeetings.map((meeting, idx) => (
                      <tr key={idx}>
                        <td>{meeting.meetingName}</td>
                        <td>{meeting.meetingType}</td>
                        <td>{meeting.meetingDate}</td>
                        <td>{getStatusBadge(meeting)}</td>
                        <td>
                          <Button variant="outline-secondary" size="sm" onClick={() => copyLink(meeting.meetingId)}>
                            📋 Copy
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {currentMeetings.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          No meetings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="justify-content-center">
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                    {[...Array(totalPages).keys()].map((page) => (
                      <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => setCurrentPage(page + 1)}>
                        {page + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
                  </Pagination>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Meeting;
