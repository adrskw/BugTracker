import React from 'react';
import { useField } from 'formik';
import { FloatingLabel, Form } from 'react-bootstrap';

interface Props {
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
}

export default function FloatingLabelTextArea(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <FloatingLabel controlId={props.name} label={props.label}>
      <Form.Control as="textarea" {...field} {...props} isInvalid={meta.touched && !!meta.error} />
      <Form.Control.Feedback type="invalid">
        {meta.error || ''}
      </Form.Control.Feedback>
    </FloatingLabel>
  )
}