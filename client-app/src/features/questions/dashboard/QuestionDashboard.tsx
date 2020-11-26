import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import QuestionList from './QuestionList'

const QuestionDashboard = () => {

  return (
    <Grid>
      <Grid.Column width={10}>
        <QuestionList />
      </Grid.Column>
    </Grid>
  )
}

export default observer(QuestionDashboard)
