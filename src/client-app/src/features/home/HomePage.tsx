import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { AiOutlineBug } from 'react-icons/ai';
import LoginForm from '../users/LoginForm';

export default function HomePage() {
  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Card border="light" className="login-view">
        <Card.Body>
          <Card.Title className="text-center text-uppercase mb-3">
            <AiOutlineBug size="50" className="logo-icon h2 mb-1" />
            <p className="h2">Bug Tracker</p>
          </Card.Title>
          <LoginForm />
        </Card.Body>
      </Card>
    </Container >
  )
}