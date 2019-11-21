import './App.css'
import React from 'react'
import FormTitle from './components/FormTitle'
import FormField from './components/FormField'
import FormFieldHeading from './components/FormFieldHeading'
import FormLabel from './components/FormLabel'
import FormTextInput from './components/FormTextInput'
import FormSubmit from './components/FormSubmit'

export default function App() {
  const info_basic = (
    <FormSection title='Basic Information'>
      <FormFieldTextInput
        label='First Name'
        placeholder='Input your first name'
      ></FormFieldTextInput>
      <FormFieldTextInput
        label='Last Name'
        placeholder='Input your last name'
      ></FormFieldTextInput>
      <FormFieldDropDown
        label='Diet Restriction'
        list={['None', 'Vegan', 'Vegetarian', 'Halal/Kosher']}
      ></FormFieldDropDown>
    </FormSection>
  )

  const info_address = (
    <FormSection title='Address Information'>
      <FormFieldTextInput
        label='City'
        placeholder='Input your city'
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
      ></FormFieldDropDown>
    </FormSection>
  )

  const info_payment = (
    <FormSection title='Payment Information'>
      <FormFieldRadioButtons
        label='Payment Method'
        list={['Bitcoin', 'PayPal', 'Credit Card']}
      ></FormFieldRadioButtons>
      <FormFieldCheckbox label='I agree to the Terms and Conditions'></FormFieldCheckbox>
    </FormSection>
  )

  return (
    <div className='App'>
      <div className='App-Content'>
        <div>
          <FormTitle>Checkout</FormTitle>
          {[info_basic, info_address, info_payment]}
        </div>
      </div>
    </div>
  )
}

const FormSection = ({ title, children }) => {
  return (
    <section>
      <h2>{title}</h2>
      {children}
      <FormSubmit isComplete={true} completeText='Continue'></FormSubmit>
    </section>
  )
}

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

const FormFieldTextInput = ({ label, placeholder }) => {
  return (
    <FormFieldFrame label={label}>
      <FormTextInput placeholder={placeholder}></FormTextInput>
    </FormFieldFrame>
  )
}

const FormFieldDropDown = ({ label, setValue, list }) => {
  const onChange = event => setValue(event.target.value)
  return (
    <FormFieldFrame label={label}>
      <select onChange={onChange}>
        {list.map(value => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </FormFieldFrame>
  )
}

const FormFieldRadioButtons = ({ label, list }) => {
  return (
    <FormFieldFrame label={label}>
      {list.map(element => {
        return (
          <div>
            <label>
              <input type='radio' value={element} />
              {element}
            </label>
          </div>
        )
      })}
    </FormFieldFrame>
  )
}

const FormFieldCheckbox = ({ label }) => {
  return (
    <FormFieldFrame>
      <label>
        <input type='checkbox' />
        {label}
      </label>
    </FormFieldFrame>
  )
}
