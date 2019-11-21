import React from 'react'

import FormField from './FormField'
import FormFieldHeading from './FormFieldHeading'
import FormLabel from './FormLabel'

const FormFieldFrame = ({ label, children }) => {
  return (
    <FormField>
      <FormFieldHeading>
        <FormLabel text={label}></FormLabel>
      </FormFieldHeading>
      {children}
    </FormField>
  )
}

export default FormFieldFrame;
