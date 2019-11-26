import React from 'react'
import './App.css'

export default function App() {
  const [firstName, setFirstName] = React.useState('')
  const onChangeFirstName = event => setFirstName(event.target.value)

  const [lastName, setLastName] = React.useState('')
  const onChangeLastName = event => setLastName(event.target.value)

  const [isAbove19, setIsAbove19] = React.useState(false)
  const onChangeAbove19 = event => setIsAbove19(event.target.checked)

  const [diet, setDiet] = React.useState(null)
  const onChangeDiet = event => setDiet(event.target.value)

  const onClickSubmit = () => {
    console.log('Clicked submit button!')
  }

  return (
    <div className='App'>
      <div className='App-Content'>
        <h1 className='App-Title'>Registration Form</h1>

        <div className='FormField'>
          <label className='FormField-Label'>
            <span className='FormField-LabelText'>First Name</span>
            <input
              className='FormField-Input FormField-Input__Text'
              type='text'
              placeholder='Enter your first name'
              value={firstName}
              onChange={onChangeFirstName}
            />
          </label>
        </div>

        <div className='FormField'>
          <label className='FormField-Label'>
            <span className='FormField-LabelText'>Last Name</span>
            <input
              className='FormField-Input FormField-Input__Text'
              type='text'
              placeholder='Enter your last name'
              value={lastName}
              onChange={onChangeLastName}
            />
          </label>
        </div>

        <div className='FormField'>
          <label className='FormField-Label'>
            <span className='FormField-LabelText'>
              <input
                className='FormField-Input FormField-Input__Checkbox'
                type='checkbox'
                checked={isAbove19}
                onChange={onChangeAbove19}
              />
              Above 19?
            </span>
          </label>
        </div>

        <div className='FormField'>
          <div className='FormField-Heading'>Diet Restriction</div>

          <label className='FormField-Label FormField-Label__Radio'>
            <span className='FormField-LabelText FormField-LabelText__Radio'>
              <input
                className='FormField-Input FormField-Input__Radio'
                type='radio'
                value='vegetarian'
                checked={diet === 'vegetarian'}
                onChange={onChangeDiet}
              />
              Vegetarian
            </span>
          </label>

          <label className='FormField-Label FormField-Label__Radio'>
            <span className='FormField-LabelText FormField-LabelText__Radio'>
              <input
                className='FormField-Input FormField-Input__Radio'
                type='radio'
                value='vegan'
                checked={diet === 'vegan'}
                onChange={onChangeDiet}
              />
              Vegan
            </span>
          </label>

          <label className='FormField-Label FormField-Label__Radio'>
            <span className='FormField-LabelText FormField-LabelText__Radio'>
              <input
                className='FormField-Input FormField-Input__Radio'
                type='radio'
                value='halal-kosher'
                checked={diet === 'halal-kosher'}
                onChange={onChangeDiet}
              />
              Halal/Kosher
            </span>
          </label>

          <label className='FormField-Label FormField-Label__Radio'>
            <span className='FormField-LabelText FormField-LabelText__Radio'>
              <input
                className='FormField-Input FormField-Input__Radio'
                type='radio'
                value='none'
                checked={diet === 'none'}
                onChange={onChangeDiet}
              />
              None
            </span>
          </label>
        </div>

        <div className='FormSubmit'>
          <button className='FormSubmit-Button' onClick={onClickSubmit}>
            Register
          </button>
        </div>
      </div>
    </div>
  )
}
