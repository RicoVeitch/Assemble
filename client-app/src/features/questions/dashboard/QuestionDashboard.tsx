import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import QuestionList from './QuestionList'
import QuestionStore from '../../../app/stores/questionStore';
import QuestionForm from '../form/QuestionForm';

const QuestionDashboard = () => {
  const questionStore = useContext(QuestionStore);
  const { edditing, selectedQuestion } = questionStore;
  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <QuestionList />
        </Grid.Column>
        <Grid.Column width={6}>
          {edditing ? (
            <QuestionForm />
          ) : (
              <> </>
            )}
        </Grid.Column>
      </Grid>
    </>
  )
}

export default observer(QuestionDashboard)
