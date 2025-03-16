

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Useauth from '../Hook/Useauth';
import Header from '../Components/Header';
import meeting1 from '../assets/meeting1.png';
import meeting2 from '../assets/meeting2.png';
import '../Pages/CreateMeeting.css'; 

const CreateMeeting = () => {
  Useauth();
  const navigate = useNavigate();

  const cards = [
    {
      image: meeting1,
      title: 'Create 1 on 1 Meeting',
      description: 'Create a personal single person meeting.',
      onClick: () => navigate('/create1on1'),
    },
    {
      image: meeting2,
      title: 'Create Video Conference',
      description: 'Invite multiple persons to the meeting.',
      onClick: () => navigate('/videoconference'),
    },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center mt-4">
        <Row className="w-100 justify-content-center g-4">
          {cards.map((card, idx) => (
            <Col xs={12} md={6} lg={4} key={idx} className="d-flex justify-content-center">
              <Card
                className="meeting-card text-center shadow-sm"
                onClick={card.onClick}
              >
                <div className="card-image-wrapper">
                  <Image src={card.image} alt="icon" fluid className="card-img" />
                </div>
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CreateMeeting;
