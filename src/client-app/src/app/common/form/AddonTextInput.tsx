import React from 'react';
import { useField } from 'formik';
import { Form, InputGroup, } from 'react-bootstrap';
import { IconType } from 'react-icons';

interface Props {
  name: string;
  placeholder: string;
  type?: string;
  addonContent: string | JSX.Element;
  addonPlacement: "left" | "right";
}

export default function AddonTextInput(props: Props) {
  const [field, meta] = useField(props.name);
  const { addonContent, addonPlacement, ...inputProps } = props;

  return (
    <InputGroup hasValidation>
      {props.addonPlacement === "left" &&
        <InputGroup.Text>{props.addonContent}</InputGroup.Text>}

      <Form.Control {...field} {...inputProps} isInvalid={meta.touched && !!meta.error} />

      {props.addonPlacement === "right" &&
        <InputGroup.Text>{props.addonContent}</InputGroup.Text>}

      <Form.Control.Feedback type="invalid">
        {meta.error || ''}
      </Form.Control.Feedback>
    </InputGroup>
  )
}