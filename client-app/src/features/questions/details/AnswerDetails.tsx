import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Comment, Grid, Header, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import AnswerForm from '../form/AnswerForm';
import { formatDistance } from 'date-fns';
import AnswerVoteButton from '../../../app/common/vote/AnswerVoteButton';
import AnswerReplyForm from '../form/AnswerReplyForm';

interface IProps {
  questionId: string;
}

const AnswerDetails: React.FC<IProps> = ({ questionId }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedQuestion } = rootStore.questionStore;
  const { openModal } = rootStore.modalStore;
  const { deleteAnswer, deleteReplyAnswer } = rootStore.answerStore;
  const { user } = rootStore.userStore;

  return (
    <Segment>
      <Comment.Group style={{ margin: '0px', maxWidth: '100%' }}>
        <Header as='h3' dividing>
          Answers
        </Header>
        <Segment>
          {selectedQuestion && selectedQuestion.answers && Array.from(selectedQuestion.answers.values()).map(({ id: answerId, username, displayName, message, createdAt, likes, replies }) => (
            // <Grid>
            // <Grid.Column width={15}>
            <Comment key={answerId} style={{ marginBottom: '4em' }}>
              <Grid>
                <Grid.Column width={15}>
                  <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>{displayName}</Comment.Author>
                    <Comment.Metadata>
                      <span>{formatDistance(new Date(createdAt!), new Date())} ago</span>
                    </Comment.Metadata>
                    <Comment.Text>{message}</Comment.Text>
                    <Comment.Actions>
                      {user && <Comment.Action onClick={() => openModal(<AnswerReplyForm answerId={answerId} questionId={questionId} />)}>Reply</Comment.Action>}
                      {username === user?.username && <>
                        <Comment.Action onClick={() => openModal(<AnswerForm question={selectedQuestion} message={message} answerId={answerId} />)}>Edit</Comment.Action>
                        <Comment.Action onClick={() => deleteAnswer(answerId, selectedQuestion.id)}>Delete</Comment.Action>
                      </>
                      }
                    </Comment.Actions>
                  </Comment.Content>
                </Grid.Column>
                <Grid.Column width={1}>
                  <AnswerVoteButton buttonSize='mini' iconSize='small' likes={likes} questionId={selectedQuestion.id} answerId={answerId} />
                </Grid.Column>
              </Grid>

              {replies && replies.map(({ id: replyId, message, displayName, createdAt }) => (
                <Comment.Group key={replyId}>
                  <Comment>
                    <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                      <Comment.Author as='a'>{displayName}</Comment.Author>
                      <Comment.Metadata>
                        <span>{formatDistance(new Date(createdAt!), new Date())} ago</span>
                      </Comment.Metadata>
                      <Comment.Text>{message}</Comment.Text>
                      {user &&
                        <Comment.Actions>
                          <Comment.Action onClick={() => openModal(<AnswerReplyForm replyId={replyId} message={message} answerId={answerId} questionId={questionId} />)}>Edit</Comment.Action>
                          <Comment.Action onClick={() => deleteReplyAnswer(replyId, questionId, answerId)}>Delete</Comment.Action>
                        </Comment.Actions>
                      }
                    </Comment.Content>
                  </Comment>
                </Comment.Group>
              ))}
            </Comment>
          ))}
          {selectedQuestion && <AnswerForm question={selectedQuestion} />}
        </Segment>
      </Comment.Group>
    </Segment>
  )
}

export default observer(AnswerDetails);
