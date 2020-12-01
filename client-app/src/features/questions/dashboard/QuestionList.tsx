import React, { Fragment, useContext, useEffect } from 'react'
import QuestionListItem from './QuestionListItem'
import { observer } from 'mobx-react-lite';
import { Item } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';

const QuestionList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadQuestions, activitiesByDate } = rootStore.questionStore;

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  return (
    <Fragment>
      <Item.Group divided>
        {activitiesByDate.map(question => (
          <QuestionListItem key={question.id} question={question} />
        ))}
      </Item.Group>
    </Fragment>
  )
}

export default observer(QuestionList);
