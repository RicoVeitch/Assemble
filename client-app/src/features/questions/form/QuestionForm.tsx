import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import { categories, IQuestion } from '../../../app/models/question';
import QuestionStore from '../../../app/stores/questionStore';
import ModalStore from '../../../app/stores/modalStore';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import CategoryInput from '../../../app/common/form/CategoryInput';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { set } from 'mobx';
import { RouteComponentProps } from 'react-router-dom';

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

interface IProps {
  id?: string;
}

const QuestionForm: React.FC<IProps> = ({ id }) => {
  console.log(id);
  const questionStore = useContext(QuestionStore);
  const { createQuestion, setEdditing, selectedQuestion, editQuestion } = questionStore;

  const modalStore = useContext(ModalStore);
  const { closeModal } = modalStore;

  const [question, setQuestion] = useState<IQuestion>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    if (id) {
      setQuestion(selectedQuestion!);
    }
  }, [selectedQuestion])

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

  const handleChange = () => {
    console.log('changed');
  }

  return (
    <Grid>
      <Grid.Column width={16} >
        <Segment clearing>
          <FinalForm
            validate={validator}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid }) => (
              <Form onSubmit={handleSubmit}>
                <Field name='title' placeholder='title' initialValue={question.title} component={TextInput} />
                <Field name='description' placeholder='description' initialValue={question.description} component={TextAreaInput} />
                <Field name='category' initialValue={question.category} options={categories} component={CategoryInput} />
                <Button positive disabled={invalid} type='submit'>Submit</Button>
                <Button
                  onClick={closeModal}
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
