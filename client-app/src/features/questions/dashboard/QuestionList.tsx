import React, { useContext } from 'react'
import QuestionListItem from './QuestionListItem'
import { observer } from 'mobx-react-lite';
import { Button, Icon, Item, Menu, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';

const QuestionList = () => {
  const rootStore = useContext(RootStoreContext);
  const { sortBy, setSortMethod, sortMethod, query, clearQuery } = rootStore.questionStore;

  return (
    <Segment>
      {query &&
        <Menu fluid widths={1}>
          <Menu.Item header>
            Results for: {query}
            <Button circular icon size='mini'
              basic style={{ marginLeft: '1em' }}
              onClick={clearQuery}
            >
              <Icon name='cancel' />
            </Button>
          </Menu.Item>
        </Menu>
      }
      <Menu pointing fluid widths={4}>
        <Menu.Item header>Sort By</Menu.Item>
        <Menu.Item
          name='mostRecent'
          active={sortMethod === 'mostRecent'}
          onClick={() => setSortMethod('mostRecent')}
        />
        <Menu.Item
          name='mostPopular'
          active={sortMethod === 'mostPopular'}
          onClick={() => setSortMethod('mostPopular')}
        />
        <Menu.Item
          name='mostAnswers'
          active={sortMethod === 'mostAnswers'}
          onClick={() => setSortMethod('mostAnswers')}
        />
      </Menu>

      <Item.Group divided>
        {sortBy.map(question => (
          <QuestionListItem key={question.id} question={question} />
        ))}
      </Item.Group>
    </Segment>
  )
}

export default observer(QuestionList);
