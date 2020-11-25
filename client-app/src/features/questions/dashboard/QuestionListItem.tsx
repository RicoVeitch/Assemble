import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react'
import { IQuestion } from '../../../app/models/question'
import QuestionStore from '../../../app/stores/questionStore';

const QuestionListItem: React.FC<{ question: IQuestion }> = ({ question }) => {
  const questionStore = useContext(QuestionStore);
  const { selectQuestion, deleteQuestion } = questionStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Header> {question.title}</Item.Header>
        <Item.Description>
          {question.description}
        </Item.Description>
        <Label>{question.category}</Label>
      </Segment>

      <Segment clearing>
        <Icon name='clock'>{question.date}</Icon>
        <Item.Extra>
          <Button
            onClick={() => selectQuestion(question)}
            floated='right'
            content='Edit'
            color='blue'
          />
          <Button
            // name={activity.id}
            // loading={target === activity.id && submitting}
            onClick={() => deleteQuestion(question)}
            floated='right'
            content='Delete'
            color='red'
          />
        </Item.Extra>
      </Segment>

    </Segment.Group>
  )
}

export default observer(QuestionListItem)
