import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react'
import QuestionForm from '../questions/form/QuestionForm';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';


const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { user, logout } = rootStore.userStore;

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={Link} to={'/'} >Assemble</Menu.Item>
        <Menu.Item header as={Link} to={'/'} name='Questions' />
        <Menu.Item>
          <Button onClick={() => openModal(<QuestionForm />)} positive content='Create Question' />
        </Menu.Item>
        {user ? (
          <Menu.Item position='right'>
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
          </Menu.Item>
        ) : (<>
          <Menu.Item header onClick={() => openModal(<LoginForm />)} name='Login' />
          <Menu.Item header onClick={() => openModal(<RegisterForm />)} name='Register' />
        </>)}
      </Container>
    </Menu>
  )
}

export default observer(NavBar);