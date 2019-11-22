import React from 'react'
import './App.css'
import ErrorMessage from './ErrorMessage'

function useTextInputState() {
  const [value, setValue] = React.useState('')
  const onChange = event => setValue(event.target.value)
  return {
    value,
    onChange,
  }
}

function FormField({ children }) {
  return <div className='FormField'>{children}</div>
}

function FormFieldLabel({ children, type }) {
  let className = 'FormField-Label'
  if (type === 'radio') {
    className += ' FormField-Label__Radio'
  }
  return <label className={className}>{children}</label>
}

function FormFieldLabelText({ children, type }) {
  let className = 'FormField-LabelText'
  if (type === 'radio') {
    className += ' FormField-LabelText__Radio'
  }
  return <span className={className}>{children}</span>
}

function TextInputField({ placeholder, value, onChange, errorMessageLabel }) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasFocusedOnce, setHasFocusedOnce] = React.useState(false)

  const onFocus = () => {
    setIsFocused(true)
    setHasFocusedOnce(true)
  }

  const onBlur = () => setIsFocused(false)

  return (
    <div>
      <input
        className='FormField-Input FormField-Input__Text'
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {hasFocusedOnce && !isFocused && !value && (
        <ErrorMessage label={errorMessageLabel} />
      )}
    </div>
  )
}

function RadioInputField({ value, checked, onChange }) {
  return (
    <input
      className='FormField-Input FormField-Input__Radio'
      type='radio'
      value={value}
      checked={checked}
      onChange={onChange}
    />
  )
}

export default function App() {
  const firstNameState = useTextInputState()
  const lastNameState = useTextInputState()

  const [isAbove19, setIsAbove19] = React.useState(false)
  const onChangeAbove19 = event => setIsAbove19(event.target.checked)

  const [diet, setDiet] = React.useState(null)
  const onChangeDiet = event => setDiet(event.target.value)

  const [isOnline, setIsOnline] = React.useState(navigator.onLine)
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const onClickSubmit = () => {
    console.log('Clicked submit button!')
  }

  return (
    <div className='App'>
      <div className='App-Content'>
        <h1 className='App-Title'>Registration Form</h1>

        <FormField>
          <FormFieldLabel>
            <FormFieldLabelText>First Name</FormFieldLabelText>
            <TextInputField
              placeholder='Enter your first name'
              value={firstNameState.value}
              onChange={firstNameState.onChange}
              errorMessageLabel='First name required'
            />
          </FormFieldLabel>
        </FormField>

        <FormField>
          <FormFieldLabel>
            <FormFieldLabelText>Last Name</FormFieldLabelText>
            <TextInputField
              placeholder='Enter your last name'
              value={lastNameState.value}
              onChange={lastNameState.onChange}
              errorMessageLabel='Last name required'
            />
          </FormFieldLabel>
        </FormField>

        <FormField>
          <FormFieldLabel>
            <FormFieldLabelText>
              <input
                className='FormField-Input FormField-Input__Checkbox'
                type='checkbox'
                checked={isAbove19}
                onChange={onChangeAbove19}
              />
              Above 19?
            </FormFieldLabelText>
          </FormFieldLabel>
        </FormField>

        <FormField>
          <div className='FormField-Heading'>Diet Restriction</div>

          <FormFieldLabel type='radio'>
            <FormFieldLabelText type='radio'>
              <RadioInputField
                value='vegetarian'
                checked={diet === 'vegetarian'}
                onChange={onChangeDiet}
              />
              Vegetarian
            </FormFieldLabelText>
          </FormFieldLabel>

          <FormFieldLabel type='radio'>
            <FormFieldLabelText type='radio'>
              <RadioInputField
                value='vegan'
                checked={diet === 'vegan'}
                onChange={onChangeDiet}
              />
              Vegan
            </FormFieldLabelText>
          </FormFieldLabel>

          <FormFieldLabel type='radio'>
            <FormFieldLabelText type='radio'>
              <RadioInputField
                value='halal-kosher'
                checked={diet === 'halal-kosher'}
                onChange={onChangeDiet}
              />
              Halal/Kosher
            </FormFieldLabelText>
          </FormFieldLabel>

          <FormFieldLabel type='radio'>
            <FormFieldLabelText type='radio'>
              <RadioInputField
                value='none'
                checked={diet === 'none'}
                onChange={onChangeDiet}
              />
              None
            </FormFieldLabelText>
          </FormFieldLabel>
        </FormField>

        <div>
          <h5>Network status: {isOnline ? 'online' : 'offline'}</h5>
        </div>

        <div className='FormSubmit'>
          <button
            className='FormSubmit-Button'
            onClick={onClickSubmit}
            disabled={
              !firstNameState.value ||
              !lastNameState.value ||
              !diet ||
              !isOnline
            }
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}
