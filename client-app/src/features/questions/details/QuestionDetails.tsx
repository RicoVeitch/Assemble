import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Comment, Header, Segment } from 'semantic-ui-react'
import QuestionForm from '../form/QuestionForm';
import { RootStoreContext } from '../../../app/stores/rootStore';
import AnswerForm from '../form/AnswerForm';

interface DetailParams {
  id: string;
}

const QuestionDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedQuestion, loadQuestion, deleteQuestion } = rootStore.questionStore;
  const { openModal } = rootStore.modalStore;

  useEffect(() => {
    loadQuestion(match.params.id);
  }, [loadQuestion, match.params.id]);

  return (
    <Fragment>
      <Segment clearing style={{ marginTop: '7em' }}>
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
      </Segment>
      <Comment.Group>
        <Header as='h3' dividing>
          Answers
        </Header>
        <Segment>
          {selectedQuestion && selectedQuestion.answers && selectedQuestion.answers.map((answer) => (
            <Comment style={{ marginBottom: '3em' }}>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>Matt</Comment.Author>
                <Comment.Metadata>
                  <span>Today at 5:42PM</span>
                </Comment.Metadata>
                <Comment.Text>{answer.message}</Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
          <AnswerForm />
        </Segment>
      </Comment.Group>
    </Fragment>

  )
}

export default observer(QuestionDetails)
