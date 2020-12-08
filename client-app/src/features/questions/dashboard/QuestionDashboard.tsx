import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Button, Grid, Icon, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import LoginForm from '../../user/LoginForm'
import QuestionForm from '../form/QuestionForm'
import PopularCategoryList from './PopularCategoryList'
import QuestionFilters from './QuestionFilters'
import QuestionList from './QuestionList'
import QuestionListPlaceholder from './QuestionListPlaceholder'

const QuestionDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchingList, loadQuestions } = rootStore.questionStore;
  const { user } = rootStore.userStore;
  const { loadPopularCategories } = rootStore.categoryStore;
  const { openModal } = rootStore.modalStore;

  const handleCreateQuestion = () => {
    if (user) {
      openModal(<QuestionForm />);
    } else {
      openModal(<LoginForm />);
    }
  }

  useEffect(() => {
    loadQuestions();
    loadPopularCategories();
  }, [loadQuestions, user, loadPopularCategories]);

  return (
    <Grid>
      <Grid.Column width={3}>
        <Segment>
          <Button onClick={handleCreateQuestion} positive icon fluid >
            Ask A Question
            <Icon name='plus circle' />
          </Button>
        </Segment>
        <PopularCategoryList />
      </Grid.Column>
      <Grid.Column width={8}>
        {fetchingList ? <QuestionListPlaceholder /> : <QuestionList />}
      </Grid.Column>
      <Grid.Column width={5}>
        <QuestionFilters />
      </Grid.Column>
    </Grid>
  )
}

export default observer(QuestionDashboard)
