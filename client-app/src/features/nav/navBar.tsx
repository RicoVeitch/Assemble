import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Dropdown, Form, InputOnChangeData, Menu, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { user, logout } = rootStore.userStore;
  const { setQuery } = rootStore.questionStore;

  const [query, editQuery] = useState('');

  const handleQueryChange = (_: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    editQuery(data.value);
  }

  const handleSubmit = () => {
    setQuery(query);
    editQuery('');
  }

  return (
    <header>
      <Button style={{ backgroundColor: 'rgb(47, 54, 74)' }} as={Link} to={'/'}>
        <img className='logo' src='/logosmall.png' alt='logo' />
      </Button>

      <Form onSubmit={handleSubmit} style={{ width: '40%', marginRight: '10em' }}>
        <Form.Field>
          <Form.Input
            action={{ icon: 'search' }}
            placeholder='Search...'
            name='query'
            value={query}
            onChange={handleQueryChange} />
        </Form.Field>
      </Form>


      {user ? (
        <Menu.Item >
          <Segment>
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  // as={Link}
                  // to={`/profile/${user.username}`}
                  text='My profile'
                  icon='user'
                />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Segment>
        </Menu.Item>
      ) : (<>
        <Button.Group size='small'>
          <Button positive onClick={() => openModal(<LoginForm />)}>Sign in</Button>
          <Button.Or />
          <Button color='blue' onClick={() => openModal(<RegisterForm />)}>Register</Button>
        </Button.Group>
      </>)}
    </header>
  )
}

export default observer(NavBar);