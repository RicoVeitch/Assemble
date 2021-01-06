import React, { useContext } from 'react';
import QuestionDashboard from '../../features/questions/dashboard/QuestionDashboard';
// import 'semantic-ui-css/semantic.min.css'
// import  NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import QuestionDetails from '../../features/questions/details/QuestionDetails';
import Notfound from '../common/Notfound';
import { ToastContainer } from 'react-toastify';
import QuestionForm from '../../features/questions/form/QuestionForm';
import ModalContainer from '../common/modals/ModalContainer';
import NavBar from '../../features/nav/NavBar';
import { RootStoreContext } from '../stores/rootStore';

function App() {
  const rootStore = useContext(RootStoreContext);
  const { token, getCurrentUser } = rootStore.userStore;
  const { getLikedAnswers, getDislikedAnswers } = rootStore.answerStore;

  async function init() {
    if (token) {
      await getCurrentUser();
      await getLikedAnswers();
      await getDislikedAnswers();
    }
  }
  init();

  return (
    <>
      <ToastContainer position='top-right' />
      <NavBar />
      <ModalContainer />
      {console.log('main')}
      <Container style={{ marginTop: '2em' }}>
        <Route exact path='/' component={QuestionDashboard} />
        {/* <Route path='/home' component={QuestionDashboard} /> */}
        <Route path='/:id' component={QuestionDetails} />
        <Route path='/notfound' component={Notfound} />
        <Route path='/manage' component={QuestionForm} />
        {/* <QuestionDashboard /> */}
      </Container>
    </>
  );
}

export default App;
