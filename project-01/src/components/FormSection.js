import './FormSection.css'
import React from 'react'

import FormSubmit from './FormSubmit'
import ErrorMessage from './ErrorMessage'
import useNetworkStatusEffect from '../hooks/useNetworkStatusEffect'
import LoadingAnimation from './LoadingAnimation'

const FormSection = ({ title, children, state, conditions }) => {
  const network = useNetworkStatusEffect()
  const goBack = () => state.setValue(state.value - 1)
  const backButton = (
    <button
      className='FormSection-BackButton'
      title='Go Back'
    >
      <i className='fas fa-chevron-left' onClick={goBack}></i>
    </button>
  )

  return (
    <section className='FormSection-Section'>
      <h2>{title}</h2>
      {children}
      {!network.isOnline && (
        <ErrorMessage label='Please connect to the internet to continue'></ErrorMessage>
      )}
      <div className='FormSection-Buttons'>
        <div className='FormSection-SmallSpace'>
          {state.value > 0 && state.value < 3 && backButton}
        </div>
        <FormSubmit
          onClick={state.onChange}
          isComplete={state.value >= 4}
          isDisabled={conditions || !network.isOnline}
          isLoading={state.value === 3}
          completeText='Success!'
          loadingText={<LoadingAnimation></LoadingAnimation>}
          submitText={state.value === 2 ? 'Submit' : 'Continue'}
        ></FormSubmit>
        <div className='FormSection-SmallSpace'></div>
      </div>
    </section>
  )
}

export default FormSection
