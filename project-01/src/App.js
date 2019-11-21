import './App.css'
import React from 'react'
import FormTitle from './components/FormTitle'
import FormSection from './components/FormSection'
import FormFieldDropDown from './components/FormFieldDropDown'
import FormFieldRadioButtons from './components/FormFieldRadioButtons'
import FormFieldTextInput from './components/FormFieldTextInput'
import FormFieldCheckbox from './components/FormFieldCheckbox'
import useInfoState from './hooks/useInfoState'
import useFormState from './hooks/useFormState'

export default function App() {
  const info = useInfoState()
  const form = useFormState()

  const info_basic = (
    <FormSection
      title='Basic Information'
      onClick={form.onChange}
      value={form.value}
      conditions={info.value.fname === '' || info.value.lname === ''}
    >
      <FormFieldTextInput
        label='First Name'
        placeholder='Input your first name'
        id='fname'
        onChange={info.onChange}
      ></FormFieldTextInput>
      <FormFieldTextInput
        label='Last Name'
        placeholder='Input your last name'
        id='lname'
        onChange={info.onChange}
      ></FormFieldTextInput>
      <FormFieldDropDown
        label='Diet Restriction'
        list={['None', 'Vegan', 'Vegetarian', 'Halal/Kosher']}
        onChange={info.onChange}
        id='diet'
      ></FormFieldDropDown>
    </FormSection>
  )

  const info_address = (
    <FormSection
      title='Address Information'
      onClick={form.onChange}
      value={form.value}
      conditions={info.value.city === ''}
    >
      <FormFieldTextInput
        label='City'
        placeholder='Input your city'
        id='city'
        onChange={info.onChange}
      ></FormFieldTextInput>
      <FormFieldDropDown
        label='Province'
        list={[
          'Ontario',
          'Alberta',
          'British Columbia',
          'Manitoba',
          'New Brunswick',
          'Newfoundland and Labrador',
          'Nova Scotia',
          'Prince Edward Island',
          'Quebec',
          'Saskatchewan',
          'Northwest Territories',
          'Nunavut',
          'Yukon',
        ]}
        onChange={info.onChange}
        id='province'
      ></FormFieldDropDown>
    </FormSection>
  )

  const info_payment = (
    <FormSection
      title='Payment Information'
      onClick={form.onChange}
      value={form.value}
      conditions={info.value.payment === '' || !info.value.terms}
    >
      <FormFieldRadioButtons
        label='Payment Method'
        list={['Bitcoin', 'PayPal', 'Credit Card']}
        id='payment'
        onChange={info.onChange}
        value={info.value.payment}
      ></FormFieldRadioButtons>
      <FormFieldCheckbox
        id='terms'
        label='I agree to the Terms and Conditions'
        onChange={info.onChange}
      ></FormFieldCheckbox>
    </FormSection>
  )

  return (
    <div className='App'>
      <div className='App-Content'>
        <div>
          <FormTitle>Checkout</FormTitle>
          {form.value === 0 && info_basic}
          {form.value === 1 && info_address}
          {form.value >= 2 && info_payment}
        </div>
      </div>
    </div>
  )
}
