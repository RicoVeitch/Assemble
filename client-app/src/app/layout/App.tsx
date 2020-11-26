import React from 'react';
import QuestionDashboard from '../../features/questions/dashboard/QuestionDashboard';
// import 'semantic-ui-css/semantic.min.css'
import { NavBar } from '../../features/nav/navBar';
import { Container } from 'semantic-ui-react';
import { Route, Router } from 'react-router-dom';
import QuestionDetails from '../../features/questions/details/QuestionDetails';
import Notfound from '../common/Notfound';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer position='top-right' />
      <NavBar />
      <Container style={{ marginTop: '8em' }}>
        <Route exact path='/' component={QuestionDashboard} />
        {/* <Route path='/home' component={QuestionDashboard} /> */}
        <Route path='/:id' component={QuestionDetails} />
        <Route path='/notfound' component={Notfound} />
        {/* <QuestionDashboard /> */}
      </Container>
    </>
  );
}

export default App;
