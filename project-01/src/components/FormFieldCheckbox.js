import React from 'react'

import FormFieldFrame from './FormFieldFrame'

const FormFieldCheckbox = ({ label, id, onChange}) => {
  return (
    <FormFieldFrame>
      <label>
        <input id={id} type='checkbox' onChange={onChange}/>
        {label}
      </label>
    </FormFieldFrame>
  )
}

export default FormFieldCheckbox;
