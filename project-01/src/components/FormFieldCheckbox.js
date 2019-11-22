import './FormFieldCheckbox.css'
import React from 'react'

import FormFieldFrame from './FormFieldFrame'

const FormFieldCheckbox = ({ label, id, onChange, disableIf }) => {
  return (
    <FormFieldFrame>
      <label className='Checkbox-label'>
        <input
          className='Checkbox-check'
          id={id}
          type='checkbox'
          onChange={onChange}
          disabled = {disableIf}
        />
        {label}
      </label>
    </FormFieldFrame>
  )
}

export default FormFieldCheckbox
