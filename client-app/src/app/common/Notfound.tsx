import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

const Notfound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
              Oops - we've looked everywhere but couldn't find this.
          </Header>
      <Segment.Inline>
        <Button as={Link} to='/' primary>
          Return to Home page
              </Button>
      </Segment.Inline>
    </Segment>
  )
}

export default Notfound
