import React from 'react'
import { List } from 'semantic-ui-react'
import { categoryIcon } from '../../../app/models/category'

interface IProps {
  category: string;
}

const PopularCategoryItem: React.FC<IProps> = ({ category }) => {
  return (
    <List.Item style={{ marginBottom: '2em' }}>
      <List.Icon name={categoryIcon.get(category)} size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header >{category}</List.Header>
        {/* <List.Description>Updated 10 mins ago</List.Description> */}
      </List.Content>
    </List.Item>
  )
}

export default PopularCategoryItem
