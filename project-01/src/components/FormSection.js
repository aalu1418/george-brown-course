import React from 'react'

import FormSubmit from './FormSubmit'

const FormSection = ({ title, children, onClick, value, conditions}) => {
  return (
    <section>
      <h2>{title}</h2>
      {children}
      <FormSubmit
        onClick = {onClick}
        isComplete={value === 4}
        isDisabled={conditions}
        isLoading={value === 3}
        completeText='Completed'
        loadingText= 'Loading'
        submitText={value === 2 ? 'Submit' : 'Continue'}
      ></FormSubmit>
    </section>
  )
}

export default FormSection
