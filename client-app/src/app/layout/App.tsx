import React from 'react';
import QuestionDashboard from '../../features/questions/dashboard/QuestionDashboard';
// import 'semantic-ui-css/semantic.min.css'
import { NavBar } from '../../features/nav/navBar';
import { Container } from 'semantic-ui-react';
import { Route, Router } from 'react-router-dom';
import QuestionDetails from '../../features/questions/details/QuestionDetails';

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '8em' }}>
        <Route exact path='/' component={QuestionDashboard} />
        {/* <Route path='/home' component={QuestionDashboard} /> */}
        <Route path='/:id' component={QuestionDetails} />
        {/* <QuestionDashboard /> */}
      </Container>
    </>
  );
}

export default App;
