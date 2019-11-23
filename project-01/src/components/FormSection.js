import "./FormSection.css"
import React from 'react'

import FormSubmit from './FormSubmit'
import ErrorMessage from './ErrorMessage'
import useNetworkStatusEffect from '../hooks/useNetworkStatusEffect'
import LoadingAnimation from './LoadingAnimation'

const FormSection = ({ title, children, onClick, value, conditions}) => {
  const network = useNetworkStatusEffect()

  return (
    <section className="FormSection-Section">
      <h2>{title}</h2>
      {children}
      {!network.isOnline && <ErrorMessage label="Please connect to the internet to continue"></ErrorMessage>}
      <FormSubmit
        onClick = {onClick}
        isComplete={value >= 4}
        isDisabled={conditions || !network.isOnline}
        isLoading={value === 3}
        completeText='Success!'
        loadingText= {<LoadingAnimation></LoadingAnimation>}
        submitText={value === 2 ? 'Submit' : 'Continue'}
      ></FormSubmit>
    </section>
  )
}

export default FormSection
