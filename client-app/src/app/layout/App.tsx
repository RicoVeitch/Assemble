import React from 'react';
import QuestionDashboard from '../../features/questions/dashboard/QuestionDashboard';
import 'semantic-ui-css/semantic.min.css'
import { NavBar } from '../../features/nav/navBar';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '8em' }}>
        <QuestionDashboard />
      </Container>
    </>
  );
}

export default App;
