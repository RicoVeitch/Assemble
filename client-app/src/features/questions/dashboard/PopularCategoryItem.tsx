import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Icon, List } from 'semantic-ui-react'
import { categoryIcon } from '../../../app/models/category'
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {
  category: string;
}

const PopularCategoryItem: React.FC<IProps> = ({ category }) => {
  const rootStore = useContext(RootStoreContext);
  const { setFilterMethod, filterMethod } = rootStore.questionStore;

  return (
    <List.Item style={{ marginBottom: '2em', fontFamily: ["Montserrat", "sans-serif"] }}>
      <List.Content >
        <Button icon labelPosition='left'
          fluid style={{ fontSize: '15px' }}
          onClick={() => setFilterMethod('categories', category)}
          active={filterMethod.get('categories') === category}
        >
          <Icon name={categoryIcon.get(category)} />
          {category}
        </Button>
      </List.Content>
    </List.Item>
  )
}

export default observer(PopularCategoryItem);
