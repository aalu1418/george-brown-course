import React from 'react'

import FormSubmit from './FormSubmit'
import ErrorMessage from './ErrorMessage'
import useNetworkStatusEffect from '../hooks/useNetworkStatusEffect'

const FormSection = ({ title, children, onClick, value, conditions}) => {
  const network = useNetworkStatusEffect()

  return (
    <section>
      <h2>{title}</h2>
      {children}
      {!network.isOnline && <ErrorMessage label="Please connect to the internet to continue"></ErrorMessage>}
      <FormSubmit
        onClick = {onClick}
        isComplete={value >= 4}
        isDisabled={conditions || !network.isOnline}
        isLoading={value === 3}
        completeText='Success!'
        loadingText= 'Submitting'
        submitText={value === 2 ? 'Submit' : 'Continue'}
      ></FormSubmit>
    </section>
  )
}

export default FormSection
