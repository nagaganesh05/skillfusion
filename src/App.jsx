import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import CreateMeeting from './Pages/CreateMeeting';
import OneOnOneMeeting from './Pages/OneOnOneMeeting';
import ThemeSelector from './Components/ThemeSelector';
import { useAppDispatch, useAppSelector } from './Redux/Hooks';
import { setToasts } from './Redux/slices/MeetingSlice';
import { Toast, ToastContainer } from 'react-bootstrap';
import VideoConference from './Pages/VideoConference';
import Mymeetings from './Pages/Mymeetings';
import Meeting from './Pages/Meeting';
import JoinMeeting from './Pages/JoinMeeting';

export default function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const toasts = useAppSelector((state) => state.meetings.toasts || []);
  const isDarkTheme = useAppSelector((state) => state.auth.isDarkTheme);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('skill-theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.className = storedTheme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
    } else {
      localStorage.setItem('skill-theme', 'light');
      document.body.className = 'bg-light text-dark';
    }
  }, []);

  useEffect(() => {
    const newTheme = isDarkTheme ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('skill-theme', newTheme);
    document.body.className = newTheme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [isDarkTheme]);

  const removeToast = (toastId) => {
    const updatedToasts = toasts.filter((toast) => toast.id !== toastId);
    dispatch(setToasts(updatedToasts));
  };

  return (
    <>
      <ThemeSelector>
        <Routes location={location}>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateMeeting />} />
          <Route path="/create1on1" element={<OneOnOneMeeting />} />
          <Route path='/videoconference' element={<VideoConference/>}/>
          <Route path='/mymeetings' element={<Mymeetings/>}/>
          <Route path='/meetings' element={<Meeting/>} />
          <Route path='/join/:id' element={<JoinMeeting/>} />  
          <Route path="*" element={<Login />} />
        </Routes>

        <ToastContainer position="bottom-end" className="p-3">
          {toasts.map((toast) => (
            <Toast key={toast.id} onClose={() => removeToast(toast.id)} bg={toast.color || 'primary'}>
              <Toast.Header closeButton>
                <strong className="me-auto">{toast.title}</strong>
              </Toast.Header>
              {toast.message && (
                <Toast.Body>{toast.message}</Toast.Body> 
              )}
            </Toast>
          ))}
        </ToastContainer>
      </ThemeSelector>
    </>
  );
}

