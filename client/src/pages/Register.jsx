
// Register.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
  
  const history = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (isAuthenticated) {
      history('/songs/list');
    }
  }, [history]);


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    
    e.preventDefault();

    try {
      const response = await api.register(username, password, email);
      // Se la registrazione è avvenuta con successo, reindirizza l'utente alla pagina di login
      history('/login');
    } catch (error) {
      // In caso di errore, mostra un messaggio di errore
      setErrorMessage('Si è verificato un errore durante la registrazione.');
    }
  };

  return (
    <Container className="mt-4 mt-5">
    <Row className="justify-content-center text-center">
      <Col xs={12} md={6}>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Registration</h2>
            {errorMessage && <p className="card-text">{errorMessage}</p>}
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="username">
              <br />
                <Form.Label className="fw-bold">Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="email">
              <br />
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="password">
              <br />
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit" className="btn btn-primary">
                Register
              </Button>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default Register;
