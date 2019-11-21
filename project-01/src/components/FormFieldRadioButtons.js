import React from 'react'

import FormFieldFrame from './FormFieldFrame'

const FormFieldRadioButtons = ({ label, list, onChange, value, id }) => {
  return (
    <FormFieldFrame label={label}>
      {list.map((element) => {
        return (
          <div key={element}>
            <label key={element}>
              <input key={element} type='radio' value={element} checked={value === element} onChange={onChange} id={id}/>
              {element}
            </label>
          </div>
        )
      })}
    </FormFieldFrame>
  )
}

export default FormFieldRadioButtons;
