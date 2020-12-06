import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react'
import { Dropdown, DropdownProps, Header, Input, Menu, Statistic } from 'semantic-ui-react'
import { categories } from '../../../app/models/question';
import { RootStoreContext } from '../../../app/stores/rootStore'

const QuestionFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate, predicates, questions } = rootStore.questionStore;
  const handleCategory = (data: string | number | boolean | (string | number | boolean)[] | undefined) => {
    console.log(data);
    if (Array.isArray(data)) {
      console.log(data.join('+'));
      setPredicate('categories', data.join('+'));
    }
  }
  return (
    <Fragment>
      <Statistic value={questions.size} label='Questions' color='green' style={{ marginLeft: '8em' }} />
      <Menu vertical size={'large'} style={{ width: '100%', marginTop: 50 }}>
        <Header icon={'filter'} attached color={'teal'} content={'Filters'} />
        <Menu.Item
          active={predicates.size === 0}
          onClick={() => setPredicate('all', 'true')}
          color={'blue'}
          name={'all'}
          content={'All Questions'}
        />
        <Menu.Item
          active={predicates.has('likedQuestions')}
          onClick={() => setPredicate('likedQuestions', 'true')}
          color={'blue'}
          name={'liked questions'}
          content={"Liked Questions"}
        />
        <Menu.Item
          active={predicates.has('unansweredQuestions')}
          onClick={() => setPredicate('unansweredQuestions', 'true')}
          color={'blue'}
          name={'host'}
          content={"Unanswered Questions"}
        />
        <Dropdown
          placeholder='Categories'
          fluid multiple selection search
          onChange={(e, data) => handleCategory(data.value)} //console.log(data.value)
          options={categories}
        />
      </Menu>
      {/* <Dropdown multiple text='Categories'>
        <Dropdown.Menu>
          <Input icon='search' iconPosition='left' className='search' />
          <Dropdown.Divider />
          <Dropdown.Header icon='tags' content='Category' />
          <Dropdown.Menu scrolling>
            {categories.map((option) => (
              <Dropdown.Item key={option.key} value={option.value} text={option.text} />
            ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown> */}

    </Fragment>
  )
}

export default observer(QuestionFilters);
