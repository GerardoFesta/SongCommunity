import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { connect } from 'react-redux';

function Register(props) {
  const history = useNavigate();

  useEffect(() => {
    const {isAuthenticated} = props;

    if (isAuthenticated) {
      history('/songs/list');
    }
  }, [history]);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.register(username, password, email);
      console.log(response);
      // Se la registrazione è avvenuta con successo, reindirizza l'utente alla pagina di login
      history('/login');
    } catch (error) {
      // In caso di errore, mostra un messaggio di errore
      setShowErrorAlert(true);
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
              {showErrorAlert && (
                <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                  {errorMessage}
                </Alert>
              )}
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
                <Button variant="primary" type="submit" className="btn btn-dark">
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

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.user,
  userId: state.user?.userId || null,
  username: state.user?.username || null,
  admin: state.user?.admin || null, // Se lo stato contiene l'utente, allora l'utente è autenticato
});

export default connect(mapStateToProps)(Register);

