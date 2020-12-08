import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { List, Segment } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import PopularCategoryItem from './PopularCategoryItem'

const PopularCategoryList = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadPopularCategories, popularCategories } = rootStore.categoryStore;

  useEffect(() => {
    loadPopularCategories();
  }, [loadPopularCategories]);

  return (
    <Segment>
      <List divided verticalAlign='middle'>
        <List.Header content='Popular Categories' style={{ marginBottom: '2em', fontFamily: ["Montserrat", "sans-serif"] }} />
        {popularCategories && popularCategories.map((category) => (
          <PopularCategoryItem key={category} category={category} />
        ))}
      </List>
    </Segment>
  )
}

export default observer(PopularCategoryList);
