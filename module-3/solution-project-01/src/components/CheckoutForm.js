import React from 'react'
import FormSubmit from './FormSubmit'
import FormTitle from './FormTitle'
import FormTextInput from './FormTextInput'
import FormLabel from './FormLabel'
import FormField from './FormField'
import FormFieldHeading from './FormFieldHeading'
import ErrorMessage from './ErrorMessage'

export default function CheckoutForm({ submitData }) {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [dietRestriction, setDietRestriction] = React.useState('none')
  const [activeSection, setActiveSection] = React.useState('basic-info')
  const [city, setCity] = React.useState('')
  const [province, setProvince] = React.useState('none')
  const [paymentMethod, setPaymentMethod] = React.useState(null)
  const [status, setStatus] = React.useState(null)
  const [hasConnection, setHasConnection] = React.useState(navigator.onLine)
  const [agreedTerms, setAgreedTerms] = React.useState(false)

  const onChangePaymentMethod = event => setPaymentMethod(event.target.value)

  const fake__submitData = () => {
    setStatus('loading')
    setTimeout(() => {
      setStatus('completed')
    }, 3000)
  }

  React.useEffect(() => {
    const handleOnline = () => setHasConnection(true)
    const handleOffline = () => setHasConnection(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div>
      <FormTitle>Checkout</FormTitle>

      <Section isVisible={activeSection === 'basic-info'}>
        <SectionHeading>Basic Info</SectionHeading>

        <FormField>
          <FormFieldHeading>
            <FormLabel htmlFor='input-first-name' text='First Name' />
          </FormFieldHeading>
          <FormTextInput
            id='input-first-name'
            placeholder='Enter your first name'
            value={firstName}
            setValue={setFirstName}
          />
        </FormField>

        <FormField>
          <FormFieldHeading>
            <FormLabel htmlFor='input-last-name' text='Last Name' />
          </FormFieldHeading>
          <FormTextInput
            id='input-last-name'
            placeholder='Enter your last name'
            value={lastName}
            setValue={setLastName}
          />
        </FormField>

        <FormField>
          <FormFieldHeading>
            <FormLabel
              htmlFor='select-diet-restriction'
              text='Diet restriction'
            />
          </FormFieldHeading>
          <select
            id='select-diet-restriction'
            value={dietRestriction}
            onChange={event => setDietRestriction(event.target.value)}
          >
            <option value='none'>None</option>
            <option value='vegan'>Vegan</option>
            <option value='vegetarian'>Vegetarian</option>
            <option value='halal-kosher'>Halal/Kosher</option>
          </select>
        </FormField>

        <FormSubmit
          onClick={() => setActiveSection('address-info')}
          isDisabled={!firstName || !lastName}
          submitText='Continue'
        />
      </Section>

      <Section isVisible={activeSection === 'address-info'}>
        <SectionHeading>Address Info</SectionHeading>

        <FormField>
          <FormFieldHeading>
            <FormLabel htmlFor='input-city' text='City' />
          </FormFieldHeading>
          <FormTextInput
            id='input-city'
            placeholder='Enter your city'
            value={city}
            setValue={setCity}
          />
        </FormField>

        <FormField>
          <FormFieldHeading>
            <FormLabel htmlFor='select-province' text='Province' />
          </FormFieldHeading>
          <select
            id='select-province'
            value={province}
            onChange={event => setProvince(event.target.value)}
          >
            <option value='none' disabled={true}>
              Select a province
            </option>
            <option value='ab'>Alberta</option>
            <option value='bc'>British Columbia</option>
            <option value='mb'>Manitoba</option>
            <option value='nb'>New Brunswick</option>
            <option value='nl'>Newfoundland & Labrador</option>
            <option value='ns'>Nova Scotia</option>
            <option value='on'>Ontario</option>
            <option value='pe'>Prince Edward Island</option>
            <option value='qc'>Quebec</option>
            <option value='sk'>Saskatchewan</option>
          </select>
        </FormField>

        <FormSubmit
          onClick={() => setActiveSection('payment-info')}
          isDisabled={!city || province === 'none'}
          submitText='Continue'
        />
      </Section>

      <Section isVisible={activeSection === 'payment-info'}>
        <SectionHeading>Payment Info</SectionHeading>

        <FormField>
          <FormFieldHeading>
            <FormLabel text='Payment Method' />
          </FormFieldHeading>
          <div style={{ marginBottom: 5 }}>
            <label htmlFor='input-payment-bitcoin'>
              <input
                type='radio'
                name='payment-method'
                id='input-payment-bitcoin'
                value='bitcoin'
                checked={paymentMethod === 'bitcoin'}
                onChange={onChangePaymentMethod}
              />
              &nbsp;Bitcoin
            </label>
          </div>
          <div style={{ marginBottom: 5 }}>
            <label htmlFor='input-payment-paypal'>
              <input
                type='radio'
                name='payment-method'
                id='input-payment-paypal'
                value='paypal'
                checked={paymentMethod === 'paypal'}
                onChange={onChangePaymentMethod}
              />
              &nbsp;PayPal
            </label>
          </div>
          <div style={{ marginBottom: 5 }}>
            <label htmlFor='input-payment-cc'>
              <input
                type='radio'
                name='payment-method'
                id='input-payment-cc'
                value='credit-card'
                checked={paymentMethod === 'credit-card'}
                onChange={onChangePaymentMethod}
              />
              &nbsp;Credit Card
            </label>
          </div>
        </FormField>

        <FormField>
          <label htmlFor='input-terms'>
            <input
              type='checkbox'
              id='input-terms'
              checked={agreedTerms}
              onChange={() => setAgreedTerms(!agreedTerms)}
            />
            <span>I agree to the Terms & Conditions.</span>
          </label>
        </FormField>

        {!hasConnection && (
          <div style={{ marginBottom: 10 }}>
            <ErrorMessage label='You are offline. Go online to save the data.' />
          </div>
        )}

        <FormSubmit
          isDisabled={!paymentMethod || !agreedTerms || !hasConnection}
          isLoading={status === 'loading'}
          isComplete={status === 'completed'}
          loadingText='Saving info...'
          completeText='Saved! 👏'
          submitText='Submit'
          onClick={fake__submitData}
        />
      </Section>
    </div>
  )
}

function Section({ children, isVisible }) {
  if (!isVisible) {
    return null
  }

  return <div>{children}</div>
}

function SectionHeading({ children }) {
  return <h2 className='SectionHeading'>{children}</h2>
}
