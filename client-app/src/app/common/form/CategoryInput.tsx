import React, { useContext } from 'react'
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Dropdown } from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootStore';

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
  FormFieldProps { }

const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  meta: { touched, error }
}) => {
  const rootStore = useContext(RootStoreContext);
  const { selectedQuestion } = rootStore.questionStore;

  return (
    <Form.Field error={touched && !!error} width={width}>
      <Dropdown
        placeholder='Categories'
        fluid multiple selection search
        onChange={(e, data) => input.onChange(data.value)}
        defaultValue={selectedQuestion?.categories}
        options={options}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  )
}

export default SelectInput
