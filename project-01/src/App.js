import './App.css'
import React from 'react'
import FormTitle from './components/FormTitle'
import FormField from './components/FormField'
import FormFieldHeading from './components/FormFieldHeading'
import FormLabel from './components/FormLabel'
import TextInput from './components/TextInput'
import FormSubmit from './components/FormSubmit'

export default function App() {
  let [value, setValue] = React.useState({
    fname: '',
    lname: '',
    diet: 'None',
    city: '',
    province: 'Ontario',
    payment: "",
    terms:false,
  })
  const onChange = event => {
    switch(event.target.id){
      case "terms":
        setValue({ ...value, [event.target.id]: event.target.checked })
        break;
      default:
        setValue({ ...value, [event.target.id]: event.target.value })
        break;
    }
  }

  const info_basic = (
    <FormSection title='Basic Information'>
      <FormFieldTextInput
        label='First Name'
        placeholder='Input your first name'
        id='fname'
        onChange={onChange}
      ></FormFieldTextInput>
      <FormFieldTextInput
        label='Last Name'
        placeholder='Input your last name'
        id='lname'
        onChange={onChange}
      ></FormFieldTextInput>
      <FormFieldDropDown
        label='Diet Restriction'
        list={['None', 'Vegan', 'Vegetarian', 'Halal/Kosher']}
        onChange={onChange}
        id='diet'
      ></FormFieldDropDown>
    </FormSection>
  )

  const info_address = (
    <FormSection title='Address Information'>
      <FormFieldTextInput
        label='City'
        placeholder='Input your city'
        id='city'
        onChange={onChange}
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
        onChange={onChange}
        id='province'
      ></FormFieldDropDown>
    </FormSection>
  )

  const info_payment = (
    <FormSection title='Payment Information'>
      <FormFieldRadioButtons
        label='Payment Method'
        list={['Bitcoin', 'PayPal', 'Credit Card']}
        id = "payment"
        onChange={onChange}
        value = {value.payment}
      ></FormFieldRadioButtons>
    <FormFieldCheckbox id='terms' label='I agree to the Terms and Conditions' onChange={onChange}></FormFieldCheckbox>
    </FormSection>
  )

  return (
    <div className='App'>
      <div className='App-Content'>
        <div>
          <FormTitle>Checkout</FormTitle>
          {info_basic}
          {info_address}
          {info_payment}
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

const FormFieldTextInput = ({ label, placeholder, id, onChange }) => {
  return (
    <FormFieldFrame label={label}>
      <TextInput
        placeholder={placeholder}
        id={id}
        onChange={onChange}
      ></TextInput>
    </FormFieldFrame>
  )
}

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

const FormFieldCheckbox = ({ label, id, onChange}) => {
  return (
    <FormFieldFrame>
      <label>
        <input id={id} type='checkbox' onChange={onChange}/>
        {label}
      </label>
    </FormFieldFrame>
  )
}
