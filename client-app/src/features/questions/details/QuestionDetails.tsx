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
  const { selectedQuestion, loadQuestion, deleteQuestion, deselectQuestion } = rootStore.questionStore;
  const { openModal } = rootStore.modalStore;
  const { deleteAnswer } = rootStore.answerStore;
  const { user } = rootStore.userStore;

  useEffect(() => {
    loadQuestion(match.params.id);
    return deselectQuestion;
  }, [loadQuestion, match.params.id, deselectQuestion, selectedQuestion]);

  return (
    <Fragment>
      <Segment clearing style={{ marginTop: '7em' }}>
        <Header as='h1'>{selectedQuestion?.title}</Header>
        <p>{selectedQuestion?.description}</p>
        {selectedQuestion?.asked && <>
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
        </>
        }
      </Segment>
      <Comment.Group>
        <Header as='h3' dividing>
          Answers
        </Header>
        <Segment>
          {selectedQuestion && selectedQuestion.answers && selectedQuestion.answers.map(({ id, username, displayName, message, createdAt }) => (
            <Comment key={id} style={{ marginBottom: '3em' }}>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>{displayName}</Comment.Author>
                <Comment.Metadata>
                  <span>{createdAt}</span>
                </Comment.Metadata>
                <Comment.Text>{message}</Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
                {username === user?.username && <>
                  <Button size='mini' color='red' floated='right' onClick={() => deleteAnswer(id, selectedQuestion.id)}>Delete</Button>
                  <Button size='mini' floated='right' onClick={() => openModal(<AnswerForm question={selectedQuestion} message={message} answerId={id} />)}>Edit</Button>
                </>
                }
              </Comment.Content>
            </Comment>
          ))}
          {selectedQuestion && <AnswerForm question={selectedQuestion} />}
        </Segment>
      </Comment.Group>
    </Fragment>

  )
}

export default observer(QuestionDetails)
