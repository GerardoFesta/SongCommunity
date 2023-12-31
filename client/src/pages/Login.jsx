import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import api from '../api';
import { useDispatch } from 'react-redux';
import { setUser } from '../components/store';
import { connect } from 'react-redux';

const Login = (props) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const {isAuthenticated} = props;

    if (isAuthenticated) {
      history('/songs/list');
    }
  }, [history]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.login(username, password);
      // Se il login è avvenuto con successo, reindirizza l'utente alla pagina di dashboard
      setShowSuccessAlert(true);
      
      const userData = {
        userId: response.data.data._id,
        username: response.data.data.username,
        admin: response.data.data.admin || null,
      };
      dispatch(setUser(userData));
      
      history("/songs/list")
    } catch (error) {
      setShowErrorAlert(true);
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
              {showSuccessAlert && (
                <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                  Login Corretto
                </Alert>
              )}
              {showErrorAlert && (
                <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                  {errorMessage}
                </Alert>
              )}
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
                <Button variant="primary" type="submit" className="btn btn-dark">
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

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.user,
  userId: state.user?.userId || null,
  username: state.user?.username || null,
  admin: state.user?.admin || null, // Se lo stato contiene l'utente, allora l'utente è autenticato
});

export default connect(mapStateToProps)(Login);
