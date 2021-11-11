import React from 'react';
import { Button, } from 'react-bootstrap';
import { FaRegFrown } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

export default function NotFound() {
  return (
    <div className="text-center">
      <p className="h1 py-2"><FaRegFrown size="2em" /></p>

      <p className="fs-5">Oops! The page you are looking for could not be found.</p>

      <LinkContainer exact to="/">
        <Button variant="outline-primary">Go to Home Page</Button>
      </LinkContainer>
    </div >
  )
}