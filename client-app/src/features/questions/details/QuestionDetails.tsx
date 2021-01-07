import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext } from 'react'
import { Button, Grid, Header, Label, Segment } from 'semantic-ui-react'
import QuestionForm from '../form/QuestionForm';
import { RootStoreContext } from '../../../app/stores/rootStore';
import QuestionVoteButton from '../../../app/common/vote/QuestionVoteButton';

interface IProps {
  id: string;
}

const QuestionDetails: React.FC<IProps> = ({ id }) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedQuestion, deleteQuestion } = rootStore.questionStore;
  const { openModal } = rootStore.modalStore;
  const { user } = rootStore.userStore;

  return (
    <Fragment>
      <Segment clearing style={{ marginTop: '3em' }}>
        <Grid>
          <Grid.Column width={15}>
            <Header as='h1'>{selectedQuestion?.title}</Header>
            <p>{selectedQuestion?.description}</p>

            {selectedQuestion?.categories.map((category, idx) => (
              <Label key={selectedQuestion.categories[idx]} floated='left'>{category}</Label>
            ))}

            {user && selectedQuestion?.asked && <>
              <Button
                // name={activity.id}
                onClick={() => deleteQuestion(id)}
                floated='right'
                content='Delete'
                color='red'
              />
              <Button
                onClick={() => openModal(<QuestionForm id={id} />)}
                floated='right'
                content='Edit'
                color='blue'
              />
            </>
            }

          </Grid.Column>
          {selectedQuestion && <Grid.Column width={1}>
            <QuestionVoteButton buttonSize='mini' iconSize='small' likes={selectedQuestion.likes} questionId={selectedQuestion.id} />
          </Grid.Column>}
        </Grid>
      </Segment>
    </Fragment>

  )
}

export default observer(QuestionDetails)
