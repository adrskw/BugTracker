import React from 'react';
import { useField } from 'formik';
import { FloatingLabel, Form } from 'react-bootstrap';
import { SelectOption } from '../options/selectOption';

interface Props {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
}

export default function FloatingLabelSelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <FloatingLabel controlId={props.name} label={props.label}>
      <Form.Select
        value={field.value || ''}
        placeholder={props.placeholder}
        isInvalid={meta.touched && !!meta.error}
        onChange={(event) => helpers.setValue(event.target.value)}
        onBlur={() => helpers.setTouched(true)}>

        {props.options.map(option => (
          <option value={option.value} key={option.value}>{option.displayedText}</option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {meta.error || ''}
      </Form.Control.Feedback>
    </FloatingLabel>
  )
}