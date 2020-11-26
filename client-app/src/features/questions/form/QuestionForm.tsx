import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import { categories, IQuestion } from '../../../app/models/question';
import QuestionStore from '../../../app/stores/questionStore';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import CategoryInput from '../../../app/common/form/CategoryInput';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { set } from 'mobx';

const validator = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )()
});

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
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>, data: FormProps) => {
  //   if (selectedQuestion) {
  //     let newQuestion: IQuestion = { ...question, date: new Date().toJSON() };
  //     console.log('edditing');
  //     editQuestion(newQuestion);
  //   } else {
  //     let newQuestion: IQuestion = { ...question, id: uuid(), date: new Date().toJSON() };
  //     console.log(newQuestion);
  //     createQuestion(newQuestion);
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    if (selectedQuestion) {
      let newQuestion: IQuestion = { ...values, date: new Date().toJSON() };
      editQuestion(newQuestion);
    } else {
      let newQuestion: IQuestion = { ...values, id: uuid(), date: new Date().toJSON() };
      createQuestion(newQuestion);
    }

  };

  // const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.currentTarget;
  //   setQuestion({ ...question, [name]: value });
  // };

  return (
    <Grid>
      <Grid.Column width={16} >
        <Segment clearing>
          <FinalForm
            validate={validator}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid }) => (
              <Form onSubmit={handleSubmit}>
                <Field name='title' placeholder='title' component={TextInput} />
                <Field name='description' placeholder='description' component={TextAreaInput} />
                <Field name='category' placeholder='category' options={categories} component={CategoryInput} />
                <Button positive disabled={invalid} type='submit'>Submit</Button>
                <Button
                  onClick={deselectQuestion}
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>

  )
}

export default observer(QuestionForm)
