import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import api from '../api';

function Login() {
  
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.login(username, password);
      console.log(response)
      // Se il login è avvenuto con successo, reindirizza l'utente alla pagina di dashboard
      setErrorMessage('Login Corretto');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userId', response.data.data._id);
      history("/songs/list")
    } catch (error) {
      console.log(error)
      setErrorMessage('Username o password non validi.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Login</h2>
          {errorMessage && <p>{errorMessage}</p>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Accedi
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
