import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container, Header } from 'semantic-ui-react'
import QuestionStore from '../../../app/stores/questionStore';

interface DetailParams {
  id: string;
}

const QuestionDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
  const questionStore = useContext(QuestionStore);
  const { selectedQuestion, loadQuestion } = questionStore;

  useEffect(() => {
    loadQuestion(match.params.id)
  }, [loadQuestion, match.params.id]);

  return (
    <div>
      <Container text style={{ marginTop: '7em' }}>
        <Header as='h1'>{selectedQuestion?.title}</Header>
        <p>{selectedQuestion?.description}</p>
      </Container>
    </div>
  )
}

export default observer(QuestionDetails)
