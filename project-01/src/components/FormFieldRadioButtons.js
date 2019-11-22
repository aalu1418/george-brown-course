import './FormFieldRadioButtons.css'
import React from 'react'

import FormFieldFrame from './FormFieldFrame'

const FormFieldRadioButtons = ({ label, list, onChange, value, id, disableIf }) => {
  return (
    <FormFieldFrame label={label}>
      {list.map(element => {
        let divClass = 'RadioButton-div'
        if (value === element){
          divClass += ' RadioButton-div-selected'
        }
        return (
          <div
            className={divClass}
            key={element}
          >
            <label className='RadioButton-label' key={element}>
              <input
                className='RadioButton-button'
                key={element}
                type='radio'
                value={element}
                checked={value === element}
                onChange={onChange}
                id={id}
                disabled={disableIf}
              />
              {element}
            </label>
          </div>
        )
      })}
    </FormFieldFrame>
  )
}

export default FormFieldRadioButtons
