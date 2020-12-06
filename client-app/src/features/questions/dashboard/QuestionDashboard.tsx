import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Button, Grid, List, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import PopularCategoryList from './PopularCategoryList'
import QuestionFilters from './QuestionFilters'
import QuestionList from './QuestionList'
import QuestionListPlaceholder from './QuestionListPlaceholder'

const QuestionDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { fetchingList, loadQuestions } = rootStore.questionStore;
  const { user } = rootStore.userStore;
  const { loadPopularCategories, popularCategories } = rootStore.categoryStore;

  useEffect(() => {
    loadQuestions();
    loadPopularCategories();
  }, [loadQuestions, user, loadPopularCategories]);

  return (
    <Grid>
      <Grid.Column width={3}>
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
