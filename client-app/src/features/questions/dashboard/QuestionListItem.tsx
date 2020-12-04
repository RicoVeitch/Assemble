import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom';
import { Icon, Item, ItemContent, Label, Segment } from 'semantic-ui-react'
import { formatDistance } from 'date-fns';
import { IQuestion } from '../../../app/models/question'

const QuestionListItem: React.FC<{ question: IQuestion }> = ({ question }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        <Item>
          <Item.Content>
            <Item.Header as={Link} to={`/${question.id}`}> {question.title} </Item.Header>
            <Label attached='top right' size='huge' circular color='green'>{question.likes}</Label>
            <Item.Meta>Asked {formatDistance(question.date, new Date())} ago</Item.Meta>
            <Item.Description>
              {question.description}
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>

      <Item.Group>
        <Item.Extra>
          {question.categories.map((category, idx) => (
            <Label key={question.categories[idx]} floated='left'>{category}</Label>
          ))}
        </Item.Extra>
      </Item.Group>

    </Segment>
  )
}

export default observer(QuestionListItem)
