import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form, Container } from 'semantic-ui-react';
import TextAreaInput from '../../../app/common/form/TextAreaInput';

const AnswerForm = () => {
  const display = (values: any) => {
    console.log(values);
  }
  return (
    <Container>
      <FinalForm
        onSubmit={display}
        render={({ handleSubmit, submitting }) => (
          <Form onSubmit={handleSubmit}>
            {//onSubmit={() => handleSubmit()!.then(() => form.reset())}
            }
            <Field
              name='comment'
              component={TextAreaInput}
              rows={2}
              placeholder='Add your answer'
            />
            <Button
              loading={submitting}
              content='Add Reply'
              labelPosition='left'
              icon='edit'
              primary
            />
          </Form>
        )}
      />
    </Container>
  )
}

export default observer(AnswerForm);