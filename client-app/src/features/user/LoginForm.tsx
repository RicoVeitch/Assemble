import React, { useContext } from 'react'
import { Button, Form, Header, Message } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import { combineValidators, isRequired } from 'revalidate';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import FormError from '../../app/common/form/FormError';
import RegisterForm from './RegisterForm';

const validator = combineValidators({
  email: isRequired({ message: 'Specify Email' }),
  password: isRequired({ message: 'Specify Password' })
});
// JSON.stringify(form.getState()), include form in render
const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <FinalForm
      validate={validator}
      onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
        [FORM_ERROR]: error //submitError checks FORM_ERROR constant for the error.
      }))
      }
      render={({ handleSubmit, invalid, submitError, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Login to Assemble'
            color='green'
            textAlign='center'
          />
          <Field name='email' icon='user' iconPosition='left' placeholder='Email' component={TextInput} />
          <Field name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' component={TextInput} />
          {submitError && <FormError error={submitError} text='Invalid email or password' />}
          <br />
          <Button fluid positive disabled={invalid && !dirtySinceLastSubmit} type='submit'>Login</Button>
          <br />
          <Button fluid color='blue' onClick={() => openModal(<RegisterForm />)}>Register Here</Button>
        </Form>
      )}
    />
  )
}

export default LoginForm
