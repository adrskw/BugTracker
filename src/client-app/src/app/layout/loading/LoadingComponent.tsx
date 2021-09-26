import React from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
  text?: string;
}

export default function LoadingComponent({ text = 'Loading...' }: Props) {
  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center text-center">
      <Spinner
        animation="border"
        variant="primary" />
      {text}
    </div>
  )
}