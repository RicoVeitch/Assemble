import React, { useContext } from 'react'
import { Button, Form, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import { combineValidators, isRequired } from 'revalidate';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import FormError from '../../app/common/form/FormError';

const validator = combineValidators({
  email: isRequired({ message: 'Specify a Email' }),
  password: isRequired({ message: 'Specify a Password' }),
  username: isRequired({ message: 'Specify a Username' }),
  displayName: isRequired({ message: 'Specify a Displayname' })
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      validate={validator}
      onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
        [FORM_ERROR]: error //submitError checks FORM_ERROR constant for the error.
      }))
      }
      render={({ handleSubmit, invalid, submitError, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Register to Assemble'
            color='green'
            textAlign='center'
          />
          <Field name='email' icon='user' iconPosition='left' placeholder='Email' component={TextInput} />
          <Field name='username' icon='user' iconPosition='left' placeholder='Username' component={TextInput} />
          <Field name='displayName' icon='user' iconPosition='left' placeholder='Display name' component={TextInput} />
          <Field name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' component={TextInput} />
          {/* {submitError && <Label color='red' basic content={submitError.data.errors} />} */}
          {submitError && <FormError error={submitError} />}
          <Button fluid positive disabled={(invalid && !dirtySinceLastSubmit)} type='submit'>Register</Button>
        </Form>
      )}
    />
  );
}

export default RegisterForm
