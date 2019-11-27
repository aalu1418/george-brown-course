import './App.css'
import React from 'react'

export default function App() {
  const [screen, setScreen] = React.useState(window.innerWidth < 600 ? "narrow" : "wide")

  React.useEffect(() => {
    const changeScreen = () => setScreen(window.innerWidth < 600 ? "narrow" : "wide")

    window.addEventListener('resize', changeScreen)

    return () => {
      window.removeEventListener('resize', changeScreen)
    }
  }, [])

  const renderEx1 = <label><h3 className='App-SubTitle'>Give a rating based on your experience</h3><Exercise1 /></label>
  const noRenderEx1 = null

  return (
    <div className='App'>
      <div className='App-Content'>
        <h1 className='App-Title'>Feedback Form</h1>

        {screen === "wide" ? renderEx1 : noRenderEx1 }

        <h3 className='App-SubTitle'>
          Select all options based on your experience
        </h3>
        <Exercise2 />
      </div>
    </div>
  )
}

const RadioButton = ({ value, currentValue, onChange }) => {
  return (
    <label>
      <input
        type='radio'
        value={value}
        checked={currentValue === value}
        onChange={onChange}
      />
      {value}
    </label>
  )
}

const CheckBox = ({ value, onChange, children }) => {
  return (
    <div>
      <label>
        <input type='checkbox' checked={value} onChange={onChange} />
        {children}
      </label>
    </div>
  )
}

const ScaleItem = ({ label, state }) => {
  const range = ['1', '2', '3', '4', '5']

  return (
    <div>
      <label>
        {label}
        {range.map(number => (
          <RadioButton
            key={number}
            value={number}
            currentValue={state.value}
            onChange={state.onChange}
          ></RadioButton>
        ))}
      </label>
    </div>
  )
}

const NewState = (start = 0, target = 'value') => {
  const [value, setValue] = React.useState(start)
  const onChange = event => setValue(event.target[target])
  return { value, onChange }
}

function Exercise1() {
  // Put your answers here for Exercise 1 👇
  const foodHook = NewState()
  const poolHook = NewState()
  const bedsHook = NewState()
  const showersHook = NewState()

  return (
    <div>
      <ScaleItem label='Food' state={foodHook}></ScaleItem>
      <ScaleItem label='Pool' state={poolHook}></ScaleItem>
      <ScaleItem label='Beds' state={bedsHook}></ScaleItem>
      <ScaleItem label='Showers' state={showersHook}></ScaleItem>
      <br />
      Average Value:{' '}
      {(Number(foodHook.value) +
        Number(poolHook.value) +
        Number(bedsHook.value) +
        Number(showersHook.value)) /
        4}
    </div>
  )
}

function Exercise2() {
  // Put your answers here for Exercise 2 👇
  const qOne = NewState(false, 'checked')
  const qTwo = NewState(false, 'checked')
  const qThree = NewState(false, 'checked')

  return (
    <div>
      <CheckBox value={qOne.value} onChange={qOne.onChange}>
        Did you enjoy your stay?
      </CheckBox>
      <CheckBox value={qTwo.value} onChange={qTwo.onChange}>
        Will you consider returning again?
      </CheckBox>
      <CheckBox value={qThree.value} onChange={qThree.onChange}>
        Would you recommend our service?
      </CheckBox>
      <br />
      Total remaining:{' '}
      {[qOne.value, qTwo.value, qThree.value].filter(elem => !elem).length}
    </div>
  )
}
