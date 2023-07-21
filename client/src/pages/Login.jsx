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
      console.log(response.data.data.admin)
      if(response.data.data.admin != null)
        localStorage.setItem('admin', 'true');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userId', response.data.data._id);
      history("/songs/list")
    } catch (error) {
      console.log(error)
      setErrorMessage('Username o password non validi.');
    }
  };

  return (
<Container className="mt-4 mt-5">
  <Row className="justify-content-center text-center">
    <Col xs={20} md={6}>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          {errorMessage && <p className="card-text">{errorMessage}</p>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="username">
              <br />
              <Form.Label className="fw-bold">Username</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control form-control-sm" />
            </Form.Group>
            <Form.Group controlId="password">
              <br />
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-sm" />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" className="btn btn-primary">
              Accedi
            </Button>
          </Form>
        </div>
      </div>
    </Col>
  </Row>
</Container>


  );
}

export default Login;
