
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../Firebase/FirebaseConfig';
import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { changeTheme } from '../Redux/Slices/Authslice';
import { getCreateMeetingBreadCrumbs,getMeetingsBreadCrumbs, getMyMettingsBreadCrumbs, getVideoConferenceBreadCrumbs } from '../Firebase/BreadCrumbs';
import OneonOnebreadCrumb from '../Firebase/OneonOneBreadCrumb';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.userInfo?.name);
  const isDarkTheme = useSelector((state) => state.auth.isDarkTheme);

  const [isResponsive, setIsResponsive] = useState(false);
  const [breadcrumbs, setBreadCrumbs] = useState([]);

  const logout = () => {
    signOut(firebaseAuth);
  };

  const toggleTheme = () => {
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
    document.body.className = !isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark';
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/create') {
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    }
    else if(pathname==='/create1on1'){
      setBreadCrumbs(OneonOnebreadCrumb(navigate))
    } else if(pathname === '/videoconference'){
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate))
    }else if(pathname==='/mymeetings'){
      setBreadCrumbs(getMyMettingsBreadCrumbs(navigate))
    }else if(pathname==='/meetings'){
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate))
    }
    else {
      setBreadCrumbs([]); 
    }
  }, [location, navigate]);

  useEffect(() => {
    if (window.innerWidth < 480) {
      setIsResponsive(true);
    }
    document.body.className = isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [isDarkTheme]);

  return (
    <>
      
      <Navbar bg={isDarkTheme ? 'dark' : 'light'} variant={isDarkTheme ? 'dark' : 'light'}  expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <h2 style={{ color: '#0b5cff', margin: 0 }}>Skillfusion</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {username && (
                <Nav.Item className="me-3 d-flex flex-row align-items-center gap-2">
                  <h5 className="mb-0">Hello</h5>
                  <h5 className="mb-0 fw-bold" style={{ color: isDarkTheme ? '#fff' : '#000' }}>
                    {username}
                  </h5>
                </Nav.Item>
              )}
              <Nav.Item className="me-2">
                <Button variant="outline-secondary" onClick={toggleTheme} title="Toggle Theme">
                  {isDarkTheme ? <BsSunFill /> : <BsMoonStarsFill />}
                </Button>
              </Nav.Item>
              <NavDropdown title="Account" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      {breadcrumbs.length > 0 && (
        <Container className="mt-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {breadcrumbs.map((item, index) => (
                <li
                  key={index}
                  className={`breadcrumb-item ${!item.href ? 'active' : ''}`}
                  onClick={item.onClick}
                  style={{ cursor: item.onClick ? 'pointer' : 'default' }}
                >
                  {item.href ? <a href={item.href}>{item.text}</a> : item.text}
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      )}
    </>
  );
};

export default Header;

