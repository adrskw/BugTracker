import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaKey, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddonTextInput from '../../app/common/form/AddonTextInput';
import LoadingButtonContentComponent from '../../app/layout/loading/LoadingButtonContentComponent';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ username: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) => userStore.login(values)
        .catch(error => setErrors({ error: 'Invalid username or password' }))}>

      {({ handleSubmit, isSubmitting, errors }) => (
        <Form onSubmit={handleSubmit}>
          <ErrorMessage name="error" render={() =>
            <p className="text-danger text-center fs-6">{errors.error}</p>} />

          <div className="d-grid gap-3">
            <AddonTextInput name="username" placeholder="username" addonPlacement="right" addonContent={<FaUser />} />
            <AddonTextInput name="password" placeholder="password" addonPlacement="right" addonContent={<FaKey />} />

            <Button
              variant="primary"
              className="btn-block"
              type="submit"
              disabled={isSubmitting}>
              {(isSubmitting) ? <LoadingButtonContentComponent /> : 'Login'}
            </Button>

            <div className="text-end mt-1">
              <Link to="/" className="link-primary">Forgot Password?</Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
})