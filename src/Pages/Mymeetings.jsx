
import React, { useEffect, useState } from 'react';
import { Table, Button, Badge, Container, Row, Col, Card, Form, InputGroup, Pagination } from 'react-bootstrap';
import { getDocs, where, query, orderBy } from 'firebase/firestore';
import { meetingsRef } from '../Firebase/FirebaseConfig';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../Redux/Hooks';
import Header from '../Components/Header';
import Useauth from '../Hook/Useauth';
import Editflyout from '../Components/Editflyout';

const MyMeetings = () => {
  Useauth();
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditFlyout, setShowEditFlyout] = useState(false);
  const [editMeeting, setEditMeeting] = useState(null);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const meetingsPerPage = 5;

  const getMyMeetings = async () => {
    try {
      const firestoreQuery = query(meetingsRef, where('createdBy', '==', userInfo?.uid), orderBy('meetingDate', 'desc'));
      const fetchedMeetings = await getDocs(firestoreQuery);
      const myMeetings = [];
      fetchedMeetings.forEach((meeting) => {
        myMeetings.push({
          docId: meeting.id,
          ...meeting.data(),
        });
      });

      setMeetings(myMeetings);
      setFilteredMeetings(myMeetings);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  useEffect(() => {
    if (userInfo?.uid) getMyMeetings();
  }, [userInfo]);

  useEffect(() => {
    const filtered = meetings.filter(meeting =>
      meeting.meetingName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeetings(filtered);
    setCurrentPage(1); 
  }, [searchTerm, meetings]);

  const openEditFlyout = (meeting) => {
    setShowEditFlyout(true);
    setEditMeeting(meeting);
  };

  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(null);
    if (dataChanged) {
      getMyMeetings();
    }
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
                <InputGroup className="mt-2">
                  <Form.Control
                    type="text"
                    placeholder="Search by Meeting Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Meeting Name</th>
                      <th>Meeting Type</th>
                      <th>Meeting Date</th>
                      <th>Status</th>
                      <th>Edit</th>
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
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => openEditFlyout(meeting)}
                          >
                            ✎ Edit
                          </Button>
                        </td>
                        <td>
                          <Button variant="outline-secondary" size="sm" onClick={() => copyLink(meeting.meetingId)}>
                            📋 Copy
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filteredMeetings.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">
                          No meetings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages).keys()].map((number) => (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentPage}
                      onClick={() => setCurrentPage(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {showEditFlyout && <Editflyout closeFlyout={closeEditFlyout} meeting={editMeeting} />}
    </div>
  );
};

export default MyMeetings;
