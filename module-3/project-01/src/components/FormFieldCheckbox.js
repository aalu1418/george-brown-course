import './FormFieldCheckbox.css'
import React from 'react'

import FormFieldFrame from './FormFieldFrame'

const FormFieldCheckbox = ({ label, id, onChange, disableIf, checked }) => {
  return (
    <FormFieldFrame>
      <label className='Checkbox-label'>
        <input
          className='Checkbox-check'
          id={id}
          type='checkbox'
          onChange={onChange}
          disabled = {disableIf}
          checked={checked}
        />
        {label}
      </label>
    </FormFieldFrame>
  )
}

export default FormFieldCheckbox
