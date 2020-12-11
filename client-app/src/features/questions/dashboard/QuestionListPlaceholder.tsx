import React, { Fragment } from 'react';
import { Segment, Placeholder } from 'semantic-ui-react';
const QuestionListPlaceholder = () => {
  return (
    <Fragment>
      <Placeholder fluid >
        <Segment style={{ minHeight: 150 }}>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Placeholder>
    </Fragment>
  );
};
export default QuestionListPlaceholder;