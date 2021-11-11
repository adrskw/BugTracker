import React from 'react';
import { Button, } from 'react-bootstrap';
import { FaRegFrown } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

export default function ServerError() {
  return (
    <div className="text-center">
      <p className="h1 py-2">
        <FaRegFrown size="2em" />
        <br />
        <span className="fs-2">Internal Server Error</span>
      </p>

      <p className="fs-5">Sorry, there were some technical issues while processing your request.</p>

      <LinkContainer exact to="/">
        <Button variant="outline-primary">Go to Home Page</Button>
      </LinkContainer>
    </div >
  )
}