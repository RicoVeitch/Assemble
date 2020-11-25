import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react'
import { IQuestion } from '../../../app/models/question'
import QuestionStore from '../../../app/stores/questionStore';

const QuestionListItem: React.FC<{ question: IQuestion }> = ({ question }) => {
  const questionStore = useContext(QuestionStore);
  const { selectQuestion, deleteQuestion } = questionStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        <Item>
          <Item.Content>
            <Item.Header as={Link} to={`/${question.id}`}> {question.title} </Item.Header>
            <Item.Meta>{question.date}</Item.Meta>
            <Item.Description>
              {question.description}
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>

      <Item.Group>
        <Item.Extra>
          <Label floated='left'>{question.category}</Label>
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
      </Item.Group>

    </Segment>
  )
}

export default observer(QuestionListItem)
