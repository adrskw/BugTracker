import React from 'react';

interface Props {
  errors: string[];
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <p>
      {errors.map((error: string) => error)}
    </p>
  )
}