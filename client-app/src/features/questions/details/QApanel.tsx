import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import AnswerDetails from './AnswerDetails';
import QuestionDetails from './QuestionDetails';

interface DetailParams {
  id: string;
}

const QApanel: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadQuestion, deselectQuestion } = rootStore.questionStore;
  const { user } = rootStore.userStore;

  useEffect(() => {
    loadQuestion(match.params.id);
    return deselectQuestion;
  }, [loadQuestion, match.params.id, deselectQuestion, user]);

  return (
    <Fragment>
      <QuestionDetails id={match.params.id} />
      <AnswerDetails questionId={match.params.id} />
    </Fragment>
  )
}

export default observer(QApanel);
