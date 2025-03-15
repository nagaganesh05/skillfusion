import React from 'react';
import Useauth from '../Hook/Useauth';
import dashboard1 from '../assets/dashboard1.png';
import dashboard2 from '../assets/dashboard2.png';
import dashboard3 from '../assets/dashboard3.png';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Header from '../Components/Header';

const Dashboard = () => {
  Useauth();
  const navigate = useNavigate();

  const cards = [
    {
      image: dashboard1,
      title: 'Create Meeting',
      description: 'Create a new meeting and invite people.',
      onClick: () => navigate('/create'),
    },
    {
      image: dashboard2,
      title: 'My Meetings',
      description: 'View your created meetings.',
      onClick: () => navigate('/mymeetings'),
    },
    {
      image: dashboard3,
      title: 'Meetings',
      description: 'View the meetings that you are invited to.',
      onClick: () => navigate('/meetings'),
    },
  ];

  return (
    <>
      <Header />
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center g-4">
          {cards.map((card, index) => (
            <Col xs={12} md={4} key={index} className="d-flex justify-content-center">
              <Card
                style={{ width: '100%', maxWidth: '18rem', cursor: 'pointer' }}
                className="text-center shadow-sm"
                onClick={card.onClick}
              >
                <Card.Body>
                  <Image
                    src={card.image}
                    alt="icon"
                    fluid
                    className="mb-3"
                    style={{ height: '100px', objectFit: 'contain' }}
                  />
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;



