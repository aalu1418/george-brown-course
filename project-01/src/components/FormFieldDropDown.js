import React from 'react'

import FormFieldFrame from './FormFieldFrame'

const FormFieldDropDown = ({ label, onChange, list, id }) => {
  return (
    <FormFieldFrame label={label}>
      <select id={id} onChange={onChange}>
        {list.map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </FormFieldFrame>
  )
}

export default FormFieldDropDown;
