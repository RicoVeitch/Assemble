import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import { categories, IQuestion, QuestionFormValues } from '../../../app/models/question';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import CategoryInput from '../../../app/common/form/CategoryInput';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
// import { set } from 'mobx';
// import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { toJS } from 'mobx';

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
  const rootStore = useContext(RootStoreContext);
  const { createQuestion, selectedQuestion, editQuestion } = rootStore.questionStore;
  const { closeModal } = rootStore.modalStore;

  const [question, setQuestion] = useState<IQuestion>(new QuestionFormValues());

  useEffect(() => {
    if (id) {
      setQuestion(new QuestionFormValues(selectedQuestion!));
    }
  }, [selectedQuestion])

  const handleFinalFormSubmit = (values: any) => {
    if (id) {
      let newQuestion: IQuestion = { ...question, ...values, date: new Date().toJSON() };
      editQuestion(newQuestion);
    } else {
      let newQuestion: IQuestion = { ...values, asked: true, id: uuid(), date: new Date().toJSON() };
      createQuestion(newQuestion);
    }
    closeModal();

  };

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
