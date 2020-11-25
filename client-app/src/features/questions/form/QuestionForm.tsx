import { observer } from 'mobx-react-lite'
import React, { FormEvent, useContext, useState } from 'react'
import { Button, Checkbox, Form, FormProps, TextArea } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import { IQuestion } from '../../../app/models/question';
import QuestionStore from '../../../app/stores/questionStore';

const QuestionForm = () => {

  const questionStore = useContext(QuestionStore);
  const { createQuestion, deselectQuestion, selectedQuestion, editQuestion } = questionStore;

  const [question, setQuestion] = useState<IQuestion>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
  });
  // date: new Date().toString()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    if (selectedQuestion) {
      let newQuestion: IQuestion = { ...question, date: new Date().toJSON() };
      console.log('edditing');
      editQuestion(newQuestion);
    } else {
      let newQuestion: IQuestion = { ...question, id: uuid(), date: new Date().toJSON() };
      console.log(newQuestion);
      createQuestion(newQuestion);
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setQuestion({ ...question, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input label='Title' onChange={handleInputChange} name='title' />
      <Form.TextArea label='Description' onChange={handleInputChange} name='description' />
      <Form.Input label='Category' onChange={handleInputChange} name='category' />
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Button positive type='submit'>Submit</Button>
      <Button
        onClick={deselectQuestion}
        floated='right'
        type='button'
        content='Cancel'
      />
    </Form>
  )
}

export default observer(QuestionForm)
