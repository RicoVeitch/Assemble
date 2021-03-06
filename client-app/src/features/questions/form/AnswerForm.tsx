import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form, Container } from 'semantic-ui-react';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { IAnswer } from '../../../app/models/answer';
import { IQuestion } from '../../../app/models/question';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { v4 as uuid } from 'uuid';
import { combineValidators, isRequired } from 'revalidate';
import LoginForm from '../../user/LoginForm';

const validator = combineValidators({
  message: isRequired({ message: 'Message is required' }),
});

interface IProps {
  question: IQuestion;
  message?: string;
  answerId?: string;
}

const AnswerForm: React.FC<IProps> = ({ question, message, answerId }) => {
  const rootStore = useContext(RootStoreContext);
  const { addAnswer, editAnswer } = rootStore.answerStore;
  const { closeModal, openModal } = rootStore.modalStore;
  const { user } = rootStore.userStore;

  const handleSubmitForm = async (values: any) => {
    if (user) {
      if (answerId) {
        editAnswer(answerId, question.id, values);
      } else {
        const answer: IAnswer = { ...values, ...user, id: uuid().toString(), questionId: question.id, createdAt: new Date(), replies: [] };
        addAnswer(answer, question.id);
      }
      closeModal();
    } else {
      openModal(<LoginForm />);
    }
    // closeModal();
  }

  return (
    <Container>
      <FinalForm
        validate={validator}
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, submitting, invalid, form }) => (
          <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
            <Field
              name='message'
              initialValue={message}
              component={TextAreaInput}
              rows={2}
              placeholder='Add your answer'
            />
            <Button
              loading={submitting}
              content={(message && 'Edit Reply') || 'Add Answer'}
              labelPosition='left'
              icon='edit'
              disabled={invalid}
              primary
            />
          </Form>
        )}
      />
    </Container>
  )
}

export default observer(AnswerForm);