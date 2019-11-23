import './App.css'
import React from 'react'
import FormTitle from './components/FormTitle'
import FormSection from './components/FormSection'
import FormFieldDropDown from './components/FormFieldDropDown'
import FormFieldRadioButtons from './components/FormFieldRadioButtons'
import FormFieldTextInput from './components/FormFieldTextInput'
import FormFieldCheckbox from './components/FormFieldCheckbox'
import FormRestart from './components/FormRestart'
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
  const form = useFormState(info) //0 - basic, 1 - address, 2 - payment, 3 - submitting, 4 - success
  const db = firebase.firestore()

  //checks to see if information is already stored in localstorage at the very beginning
  React.useEffect(() => {
    const storedValue = localStorage.getItem('info')
    //if value is present, set it to info.value (automatically populates the form)
    if (storedValue) {
      info.setValue(JSON.parse(storedValue))
    }
    // disabled because it shows warning about missing dependencies even though the useEffect is not dependent on them
    // eslint-disable-next-line
  }, [])

  //send to database using a hook on form.value state
  const submit_check = form.value === 3 //prevents run if form.value changes from 0 -> 1 -> 2
  React.useEffect(() => {
    //prevents run on first renders
    if (form.value === 3) {
      db.collection('entries')
        .doc(String(Date.now()))
        .set(info.value)
        .then(() => {
          localStorage.removeItem('info') //clears stored info in localstorage
          setTimeout(() => {
            //use timeout to give a pause between button states
            console.log('Database successfully written!')
            form.onChange()
          }, 3000)
        })
        .catch((error) => {
          console.error('Error writing database: ', error)
          form.setValue(2) //goes back to the submit screen
        })
    }
    // disabled because it shows warning about missing dependencies even though the useEffect is not dependent on them
    // eslint-disable-next-line
  }, [submit_check])

  //basic information
  const info_basic = (
    <FormSection
      title='Basic Information'
      onClick={form.onChange}
      value={form.value}
      conditions={
        info.value.fname === '' ||
        info.value.lname === '' ||
        info.value.fname.trim().length === 0 ||
        info.value.lname.trim().length === 0
      }
    >
      <FormFieldTextInput
        label='First Name'
        placeholder='Input your first name'
        id='fname'
        onChange={info.onChange}
        disableIf={form.value >= 3}
        value = {info.value.fname}
      ></FormFieldTextInput>
      <FormFieldTextInput
        label='Last Name'
        placeholder='Input your last name'
        id='lname'
        onChange={info.onChange}
        disableIf={form.value >= 3}
        value = {info.value.lname}
      ></FormFieldTextInput>
      <FormFieldDropDown
        label='Diet Restriction'
        list={['None', 'Vegan', 'Vegetarian', 'Halal/Kosher']}
        onChange={info.onChange}
        id='diet'
        disableIf={form.value >= 3}
        value={info.value.diet}
      ></FormFieldDropDown>
    </FormSection>
  )

  //address information
  const info_address = (
    <FormSection
      title='Address Information'
      onClick={form.onChange}
      value={form.value}
      conditions={info.value.city === '' || info.value.city.trim().length === 0}
    >
      <FormFieldTextInput
        label='City'
        placeholder='Input your city'
        id='city'
        onChange={info.onChange}
        disableIf={form.value >= 3}
        value={info.value.city}
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
        value={info.value.province}
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
        checked={info.value.terms}
      ></FormFieldCheckbox>
    </FormSection>
  )

  const restart = <FormRestart form={form} info={info}></FormRestart>

  return (
    <div className='App'>
      <div className='App-Content'>
        <div>
          <FormTitle>Checkout</FormTitle>
          {/**show forms based on form state**/}
          {form.value === 0 && info_basic}
          {form.value === 1 && info_address}
          {form.value >= 2 && info_payment}
          {form.value >= 4 && restart}
        </div>
      </div>
    </div>
  )
}
