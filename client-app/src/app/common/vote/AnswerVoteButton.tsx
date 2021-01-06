import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Icon, Statistic } from 'semantic-ui-react'
import LoginForm from '../../../features/user/LoginForm';
import { RootStoreContext } from '../../stores/rootStore';

interface IProps {
  buttonSize: "big" | "small" | "mini" | "tiny" | "large" | "huge" | "medium" | "massive" | undefined;
  iconSize: "big" | "small" | "mini" | "tiny" | "large" | "huge" | "massive" | undefined;
  likes: number | undefined;
  questionId: string | undefined;
  answerId?: string;
}

const AnswerVoteButton: React.FC<IProps> = ({ buttonSize, iconSize, likes, questionId, answerId }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedQuestion } = rootStore.questionStore;
  const { likeAnswer, dislikeAnswer, ratedAnswers } = rootStore.answerStore;
  const { user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  const handleVote = (op: string) => {
    if (user && answerId) {
      if (op === 'like') {
        likeAnswer(answerId, questionId!);
      } else {
        dislikeAnswer(answerId, questionId!);
      }
    } else {
      openModal(<LoginForm />);
    }
  }

  const getVoteColor = (pos: string): 'green' | 'grey' | 'red' => {
    if (selectedQuestion && answerId) {
      const liked = ratedAnswers.has(answerId) ? ratedAnswers.get(answerId) : null;
      if (pos === 'top' && liked) {
        return 'green';
      } else if (pos === 'bottom' && liked === false) {
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

export default observer(AnswerVoteButton);
