import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { formatDistance } from 'date-fns';
import { IQuestion } from '../../../app/models/question'

const QuestionListItem: React.FC<{ question: IQuestion }> = ({ question }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        <Item >
          <Item.Content >
            <Item.Header as={Link} to={`/${question.id}`}> {question.title} </Item.Header>
            <Label
              attached='top right' size='large'
              circular color='green'
              style={{ marginTop: '1em', marginRight: '10em' }}
            >
              {question.likes}
              <Label.Detail>Likes</Label.Detail>
            </Label>
            <Label
              attached='top right'
              size='large' circular
              style={{ marginTop: '1em', marginRight: '2em' }}
            >
              {question.answers.size}
              <Label.Detail>Answers</Label.Detail>
            </Label>
            <Item.Meta>Asked {formatDistance(question.date, new Date())} ago</Item.Meta>
            <Item.Description style={{ overflow: 'hidden', height: '7em' }}>
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
          <Button floated='right' size='tiny' color='blue' as={Link} to={`/${question.id}`}>
            View more
        </Button>
        </Item.Extra>
      </Item.Group>

    </Segment>
  )
}

export default observer(QuestionListItem)
