// components/Login.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import './Login.css';

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi de la requête de connexion
      const response = await axios.post("http://localhost:3000/api/users/login", {
        username,
        password,
      });

      const { token, role } = response.data;

      // Stocker les données dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role); // Sauvegarder le rôle

      // Mettre à jour le contexte avec le rôle
      login(username, token, role);

      setSuccess("Login successful!");
      setError("");
      navigate("/"); // Rediriger vers la page d'accueil
    } catch (error) {
      setError("Login failed. " + (error.response?.data?.error || error.message));
      setSuccess("");
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100' />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}

              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Username'
                  id='formControlUsername'
                  type='text'
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='formControlPassword'
                  type='password'
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MDBBtn className="mb-4 px-5" color='dark' size='lg' type="submit">Login</MDBBtn>
              </form>

              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Don't have an account? <a href="/register" style={{ color: '#393f81' }}>Register here</a>
              </p>


            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
