import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Icon, SemanticCOLORS, Statistic } from 'semantic-ui-react'
import LoginForm from '../../../features/user/LoginForm';
import { RootStoreContext } from '../../stores/rootStore'

interface IProps {
  buttonSize: "big" | "small" | "mini" | "tiny" | "large" | "huge" | "medium" | "massive" | undefined;
  iconSize: "big" | "small" | "mini" | "tiny" | "large" | "huge" | "massive" | undefined;
  likes: number | undefined;
  questionId: string | undefined;
  answerId?: string;
}

const VoteButton: React.FC<IProps> = ({ buttonSize, iconSize, likes, questionId, answerId }) => {
  const rootStore = useContext(RootStoreContext);
  const { likeQuestion, dislikeQuestion, questions, selectedQuestion } = rootStore.questionStore;
  const { likeAnswer, dislikeAnswer } = rootStore.answerStore;
  const { user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  const handleVote = (op: string) => {
    if (user) {
      if (op === 'like') {
        if (answerId) {
          likeAnswer(answerId, questionId!);
        } else {
          likeQuestion(questionId!)
        }
      } else {
        if (answerId) {
          dislikeAnswer(answerId, questionId!);
        } else {
          dislikeQuestion(questionId!);
        }
      }
    } else {
      openModal(<LoginForm />);
    }
  }

  const getVoteColor = (pos: string): 'green' | 'grey' | 'red' => {
    if (selectedQuestion) {
      console.log(toJS(questions.get(questionId).liked));
      const liked = questions.get(questionId).liked;
      if (liked === null) {
        return 'grey';
      } else if (pos === 'top' && liked) {
        return 'green';
      } else if (pos === 'bottom' && !liked) {
        return 'red';
      }
    }
    return 'grey';
  }

  return (
    <Button.Group floated='right' vertical style={{ position: 'absolute', top: '8px', right: '16px' }}>
      <Button icon size={buttonSize} onClick={() => handleVote('like')} color={getVoteColor('top')}>
        <Icon name='angle up' color='black' size={iconSize} />
      </Button>
      <Statistic size='mini' value={likes} style={{ margin: '5px' }} />
      <Button icon size={buttonSize} onClick={() => handleVote('dislike')} color={getVoteColor('bottom')}>
        <Icon name='angle down' color='black' size={iconSize} />
      </Button>
    </Button.Group>
  )
}

export default observer(VoteButton);
