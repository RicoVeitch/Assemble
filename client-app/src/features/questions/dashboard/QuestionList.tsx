import React, { Fragment, useContext, useEffect } from 'react'
import QuestionListItem from './QuestionListItem'
import QuestionStore from '../../../app/stores/questionStore';
import { observer } from 'mobx-react-lite';
import { Item } from 'semantic-ui-react';

const QuestionList = () => {
  const questionStore = useContext(QuestionStore);
  const { loadQuestions, questions, activitiesByDate } = questionStore;

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
