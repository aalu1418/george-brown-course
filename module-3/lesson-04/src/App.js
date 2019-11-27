import React from 'react'
import './App.css'
import ErrorMessage from './ErrorMessage.js'

const FormField = ({ children, formFieldHeader }) => {
  return (
    <div className='FormField'>
      <div className='FormField-Heading'>{formFieldHeader}</div>
      {children}
    </div>
  )
}

const LabelField = ({
  label,
  placeholder,
  value,
  checked,
  onChange,
  inputClasses = 'FormField-Input FormField-Input__Text',
  inputType = 'text',
  extraText,
  labelClasses = 'FormField-Label',
  spanClasses = 'FormField-LabelText',
  errorMessage = false,
}) => {
  return (
    <label className={labelClasses}>
      <span className={spanClasses}>{label}</span>
      <input
        className={inputClasses}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {extraText}
      {errorMessage && value === '' ? (
        <ErrorMessage label='Input required'></ErrorMessage>
      ) : (
        ''
      )}
    </label>
  )
}

const RadioSelect = (state, name, array) => {
  return (
    <FormField formFieldHeader={name}>
      {array.map(element => {
        return (
          <LabelField
            key={element}
            labelClasses='FormField-Label FormField-Label__Radio'
            spanClasses='FormField-LabelText FormField-LabelText__Radio'
            inputClasses='FormField-Input FormField-Input__Radio'
            inputType='radio'
            value={element}
            checked={state.value === element}
            onChange={state.onChange}
            extraText={element}
          ></LabelField>
        )
      })}
    </FormField>
  )
}

const useInputState = (init, target = 'value') => {
  const [value, setValue] = React.useState(init)
  const onChange = event => {
    setValue(event.target[target])
  }
  return { value, onChange }
}

export default function App() {
  const firstNameState = useInputState('')
  const lastNameState = useInputState('')
  const ageCheckState = useInputState('', 'checked')
  const dietCheckState = useInputState(null)
  const [onlineState, setOnline] = React.useState(true)

  const onClickSubmit = () => {
    console.log('Clicked submit button!')
  }

  const setOnlineTrue = () => setOnline(true)
  const setOnlineFalse = () => setOnline(false)

  React.useEffect(() => {
    window.addEventListener('online', setOnlineTrue)
    window.addEventListener('offline', setOnlineFalse)

    return () => {
      window.removeEventListener('online', setOnlineTrue)
      window.removeEventListener('offline', setOnlineFalse)
    }
  }, [])

  return (
    <div className='App'>
      <div className='App-Content'>
        <h1 className='App-Title'>Registration Form</h1>

        <FormField>
          <LabelField
            label='First Name'
            placeholder='Enter your first name'
            value={firstNameState.value}
            onChange={firstNameState.onChange}
            errorMessage={true}
          ></LabelField>
        </FormField>

        <FormField>
          <LabelField
            label='Last Name'
            placeholder='Enter your last name'
            value={lastNameState.value}
            onChange={lastNameState.onChange}
            errorMessage={true}
          ></LabelField>
        </FormField>

        <FormField>
          <LabelField
            value={ageCheckState.value}
            onChange={ageCheckState.onChange}
            inputClasses='FormField-Input FormField-Input__Checkbox'
            inputType='checkbox'
            extraText='Above 19?'
          ></LabelField>
        </FormField>

        {RadioSelect(dietCheckState, 'Diet Restriction', [
          'vegetarian',
          'vegan',
          'halal-kosher',
          'none',
        ])}
        {onlineState ? <div>Online</div> : <div>Offline</div>}
        <div className='FormSubmit'>
          <button
            className='FormSubmit-Button'
            onClick={onClickSubmit}
            disabled={
              !firstNameState.value ||
              !lastNameState.value ||
              !dietCheckState.value ||
              !onlineState
            }
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}
