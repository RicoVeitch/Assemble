import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Comment, Header, Label, Segment } from 'semantic-ui-react'
import QuestionForm from '../form/QuestionForm';
import { RootStoreContext } from '../../../app/stores/rootStore';
import AnswerForm from '../form/AnswerForm';
import { formatDistance } from 'date-fns';
import VoteButton from '../../../app/common/vote/VoteButton';

interface DetailParams {
  id: string;
}

const QuestionDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedQuestion, loadQuestion, deleteQuestion, deselectQuestion, submitting } = rootStore.questionStore;
  const { openModal } = rootStore.modalStore;
  const { deleteAnswer } = rootStore.answerStore;
  const { user } = rootStore.userStore;

  useEffect(() => {
    loadQuestion(match.params.id);
    return deselectQuestion;
  }, [loadQuestion, match.params.id, deselectQuestion]);

  return (
    <Fragment>
      <Segment clearing style={{ marginTop: '7em' }}>
        <Header as='h1'>{selectedQuestion?.title}</Header>
        <p>{selectedQuestion?.description}</p>

        {selectedQuestion?.categories.map((category, idx) => (
          <Label key={selectedQuestion.categories[idx]} floated='left'>{category}</Label>
        ))}

        <VoteButton buttonSize='mini' iconSize='small' likes={selectedQuestion?.likes} questionId={selectedQuestion?.id} />

        {selectedQuestion?.asked && <>
          <Button
            onClick={() => openModal(<QuestionForm id={match.params.id} />)}
            floated='left'
            content='Edit'
            color='blue'
          />
          <Button
            // name={activity.id}
            onClick={() => deleteQuestion(match.params.id)}
            floated='left'
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
          {selectedQuestion && selectedQuestion.answers && selectedQuestion.answers.map(({ id, username, displayName, message, createdAt, likes }) => (
            <Comment key={id} style={{ marginBottom: '5em' }}>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>{displayName}</Comment.Author>
                <Comment.Metadata>
                  <span>{formatDistance(new Date(createdAt!), new Date())} ago</span>
                </Comment.Metadata>
                <Comment.Text>{message}</Comment.Text>
                <VoteButton buttonSize='mini' iconSize='small' likes={likes} questionId={selectedQuestion.id} answerId={id} />
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
                {username === user?.username && <>
                  <Button size='mini' color='red' floated='left' onClick={() => deleteAnswer(id, selectedQuestion.id)}>Delete</Button>
                  <Button size='mini' floated='left' onClick={() => openModal(<AnswerForm question={selectedQuestion} message={message} answerId={id} />)}>Edit</Button>
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
