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
// import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDfEBS4Ee0JJRJ_pYfr2HQ1UEI1LQLieGM',
  authDomain: 'gb-fullstackiii-project.firebaseapp.com',
  databaseURL: 'https://gb-fullstackiii-project.firebaseio.com',
  projectId: 'gb-fullstackiii-project',
  storageBucket: 'gb-fullstackiii-project.appspot.com',
  messagingSenderId: '829648199918',
  appId: '1:829648199918:web:b9238e3d42356b3c5453ff',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default function App() {
  const info = useInfoState()
  const form = useFormState()

  //send to database using a hook on form.value state
  const submit_check = form.value === 3 //prevents run if form.value changes from 0 -> 1 -> 2
  React.useEffect(() => {
    const db = firebase.firestore()
    if (form.value === 3) { //prevents run on first renders
      db.collection('entries')
        .doc(String(Date.now()))
        .set(info.value)
        .then(() => {
          setTimeout(() => { //use timeout to give a pause between button states
            console.log('Database successfully written!')
            form.onChange()
          }, 2000)
        })
        .catch(function(error) {
          console.error('Error writing database: ', error)
        })
    }
  }, [submit_check])

  //basic information
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
        disableIf={form.value >= 3}
      ></FormFieldTextInput>
      <FormFieldTextInput
        label='Last Name'
        placeholder='Input your last name'
        id='lname'
        onChange={info.onChange}
        disableIf={form.value >= 3}
      ></FormFieldTextInput>
      <FormFieldDropDown
        label='Diet Restriction'
        list={['None', 'Vegan', 'Vegetarian', 'Halal/Kosher']}
        onChange={info.onChange}
        id='diet'
        disableIf={form.value >= 3}
      ></FormFieldDropDown>
    </FormSection>
  )

  //address information
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
        disableIf={form.value >= 3}
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
        disableIf={form.value >= 3}
      ></FormFieldDropDown>
    </FormSection>
  )

  //payment information
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
        disableIf={form.value >= 3}
      ></FormFieldRadioButtons>
      <FormFieldCheckbox
        id='terms'
        label='I agree to the Terms and Conditions'
        onChange={info.onChange}
        disableIf={form.value >= 3}
      ></FormFieldCheckbox>
    </FormSection>
  )

  return (
    <div className='App'>
      <div className='App-Content'>
        <div>
          <FormTitle>Checkout</FormTitle>
          {/**show forms based on page state**/}
          {form.value === 0 && info_basic}
          {form.value === 1 && info_address}
          {form.value >= 2 && info_payment}
        </div>
      </div>
    </div>
  )
}
