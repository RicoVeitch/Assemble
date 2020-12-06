import React, { useContext } from 'react'
import QuestionListItem from './QuestionListItem'
import { observer } from 'mobx-react-lite';
import { Input, Item, Menu, MenuItemProps, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';

const QuestionList = () => {
  const rootStore = useContext(RootStoreContext);
  const { sortBy, setSortMethod, sortMethod } = rootStore.questionStore;

  return (
    <Segment>
      {/* <Menu>
        <Menu.Item>
          <Input className='icon' icon='search' placeholder='Search...' />
        </Menu.Item>

        <Menu.Item position='right'>
          <Input
            action={{ type: 'submit', content: 'Go' }}
            placeholder='Navigate to...'
          />
        </Menu.Item>
      </Menu> */}
      <Menu pointing>
        <Menu.Item header>Sort By</Menu.Item>
        <Menu.Item
          name='mostRecent'
          active={sortMethod == 'mostRecent'}
          onClick={() => setSortMethod('mostRecent')}
        />
        <Menu.Item
          name='mostPopular'
          active={sortMethod == 'mostPopular'}
          onClick={() => setSortMethod('mostPopular')}
        />
        <Menu.Item
          name='mostAnswers'
          active={sortMethod == 'mostAnswers'}
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
