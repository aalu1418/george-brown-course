import React from 'react'

import FormFieldFrame from './FormFieldFrame'
import TextInput from './TextInput'

const FormFieldTextInput = ({ label, placeholder, id, onChange, disableIf, value }) => {
  return (
    <FormFieldFrame label={label}>
      <TextInput
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        disableIf = {disableIf}
        value = {value}
      ></TextInput>
    </FormFieldFrame>
  )
}

export default FormFieldTextInput;
