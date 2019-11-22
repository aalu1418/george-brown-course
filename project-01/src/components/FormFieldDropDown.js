import './FormFieldDropDown.css'
import React from 'react'

import FormFieldFrame from './FormFieldFrame'

const FormFieldDropDown = ({ label, onChange, list, id, disableIf }) => {
  return (
    <FormFieldFrame label={label}>
      <select
        disabled={disableIf}
        className='DropDown-select'
        id={id}
        onChange={onChange}
      >
        {list.map(value => (
          <option className='DropDown-option' key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </FormFieldFrame>
  )
}

export default FormFieldDropDown
