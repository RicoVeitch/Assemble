import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import QuestionList from './QuestionList'
import QuestionListPlaceholder from './QuestionListPlaceholder'

const QuestionDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchingList, loadQuestions } = rootStore.questionStore;
  const { user } = rootStore.userStore;

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions, user]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {fetchingList ? <QuestionListPlaceholder /> : <QuestionList />}
      </Grid.Column>
    </Grid>
  )
}

export default observer(QuestionDashboard)
