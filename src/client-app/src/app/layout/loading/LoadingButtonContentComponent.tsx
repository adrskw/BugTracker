import React from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
  text?: string;
}

export default function LoadingButtonContentComponent({ text = 'Loading...' }: Props) {
  return (
    <>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span className="ps-1">{text}</span>
    </>
  )
}