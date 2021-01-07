import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form, Container } from 'semantic-ui-react';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { v4 as uuid } from 'uuid';
import { combineValidators, isRequired } from 'revalidate';
import LoginForm from '../../user/LoginForm';
import { IAnswerReply } from '../../../app/models/answerReply';

const validator = combineValidators({
  message: isRequired({ message: 'Message is required' }),
});

interface IProps {
  replyId?: string;
  answerId?: string;
  message?: string;
  questionId: string
}

const AnswerReplyForm: React.FC<IProps> = ({ replyId, answerId, message, questionId }) => {
  const rootStore = useContext(RootStoreContext);
  const { addReplyAnswer, editReplyAnswer } = rootStore.answerStore;
  const { closeModal, openModal } = rootStore.modalStore;
  const { user } = rootStore.userStore;

  const handleSubmitForm = async (values: any) => {
    if (user && answerId) {
      if (replyId) {
        const reply: IAnswerReply = { ...values, id: replyId }
        await editReplyAnswer(reply, answerId, questionId);
      } else {
        const reply: IAnswerReply = { id: uuid().toString(), answerId: answerId, ...values, createdAt: new Date() }
        await addReplyAnswer(reply, answerId, questionId);
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
              placeholder='Add your reply'
            />
            <Button
              loading={submitting}
              content={(replyId && "Edit Reply") || 'Add Reply'}
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

export default observer(AnswerReplyForm);