import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Icon, Statistic } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'

interface IProps {
  buttonSize: "big" | "small" | "mini" | "tiny" | "large" | "huge" | "medium" | "massive" | undefined;
  iconSize: "big" | "small" | "mini" | "tiny" | "large" | "huge" | "massive" | undefined;
  likes: number | undefined;
  questionId: string | undefined;
  answerId?: string;
}

const VoteButton: React.FC<IProps> = ({ buttonSize, iconSize, likes, questionId, answerId }) => {
  // const buttonColor = 'grey'
  const rootStore = useContext(RootStoreContext);
  const { likeQuestion, dislikeQuestion, selectedQuestion } = rootStore.questionStore;
  const { likeAnswer, dislikeAnswer } = rootStore.answerStore;
  const handleLike = () => {
    if (answerId) {
      likeAnswer(answerId, questionId!);
    } else {
      likeQuestion(questionId!)
    }
  }

  const handleDislike = () => {
    if (answerId) {
      dislikeAnswer(answerId, questionId!);
    } else {
      dislikeQuestion(questionId!);
    }
  }
  return (
    <Button.Group floated='right' vertical style={{ position: 'absolute', top: '8px', right: '16px' }}>
      <Button icon size={buttonSize} onClick={handleLike}>
        <Icon name='angle up' color='green' size={iconSize} />
      </Button>
      <Statistic size='mini' value={likes} style={{ margin: '5px' }} />
      <Button icon size={buttonSize} onClick={handleDislike}>
        <Icon name='angle down' color='red' size={iconSize} />
      </Button>
    </Button.Group>
  )
}

export default observer(VoteButton);
