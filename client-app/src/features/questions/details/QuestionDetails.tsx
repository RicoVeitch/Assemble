import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Container, Grid, Header } from 'semantic-ui-react'
import QuestionStore from '../../../app/stores/questionStore';
import ModalStore from '../../../app/stores/modalStore';
import QuestionForm from '../form/QuestionForm';

interface DetailParams {
  id: string;
}

const QuestionDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
  const questionStore = useContext(QuestionStore);
  const { selectedQuestion, loadQuestion, setEdditing, deleteQuestion, edditing } = questionStore;

  const modalStore = useContext(ModalStore);
  const { openModal } = modalStore;

  useEffect(() => {
    loadQuestion(match.params.id)
  }, [loadQuestion, match.params.id]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1'>{selectedQuestion?.title}</Header>
          <p>{selectedQuestion?.description}</p>
          <Button
            onClick={() => openModal(<QuestionForm id={match.params.id} />)}
            floated='right'
            content='Edit'
            color='blue'
          />
          <Button
            // name={activity.id}
            // loading={target === activity.id && submitting}
            onClick={() => deleteQuestion(match.params.id)}
            floated='right'
            content='Delete'
            color='red'
          />
        </Container>
      </Grid.Column>
      <Grid.Column width={6}>
        {edditing ? (
          <QuestionForm />
        ) : (
            <> </>
          )}
      </Grid.Column>
    </Grid>
  )
}

export default observer(QuestionDetails)
