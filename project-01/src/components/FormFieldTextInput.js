import React from 'react'

import FormFieldFrame from './FormFieldFrame'
import TextInput from './TextInput'

const FormFieldTextInput = ({ label, placeholder, id, onChange, disableIf }) => {
  return (
    <FormFieldFrame label={label}>
      <TextInput
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        disableIf = {disableIf}
      ></TextInput>
    </FormFieldFrame>
  )
}

export default FormFieldTextInput;
