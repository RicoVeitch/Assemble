import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Dropdown, Menu, Image } from 'semantic-ui-react'
import QuestionStore from '../../app/stores/questionStore';
import ModalStore from '../../app/stores/modalStore';
import QuestionForm from '../questions/form/QuestionForm';

export const NavBar: React.FC = () => {
  const questionStore = useContext(QuestionStore);
  const { setEdditing } = questionStore

  const modalStore = useContext(ModalStore);
  const { openModal } = modalStore;
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={Link} to={'/'} >Assemble</Menu.Item>
        <Menu.Item header as={Link} to={'/'} name='Questions' />
        <Menu.Item>
          {/* <Button onClick={setEdditing} positive content='Create Question' /> */}
          <Button onClick={() => openModal(<QuestionForm />)} positive content='Create Question' />
          {/* <Button as={Link} to={'/manage'} positive content='Create Activity' /> */}
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default observer(NavBar);