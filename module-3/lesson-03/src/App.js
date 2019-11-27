import React from 'react'
import './App.css'

export default function App() {
  const [form_state, set_formstate] = React.useState({});

  const handle_change = (event) => {
    switch (event.target.id) {
      case "age":
        set_formstate({...form_state, [event.target.id]: event.target.checked});
        break;
      case "year":
        set_formstate({...form_state, [event.target.id]: Number(event.target.value)});
        break;
      default:
        set_formstate({...form_state, [event.target.id]: event.target.value});
    }
  }

  return (
    <div className='App'>
      <div className='App-content'>
        <h1>Registration Form</h1>
        {
          <form>
            <label>
              First Name:
              <input type='text' defaultValue='Bob' id="fname" onChange = {handle_change}/>
            </label>
            <br />
            <label>
              Last Name:
              <input type='text' defaultValue='Smith' id='lname' onChange={handle_change}/>
            </label>
            <br />
            <label>
              Above 19+:
              <input type='checkbox' id='age' onChange={handle_change}/>
            </label>
            <br />
            <label>
              Diet Restrictions:
              <select id="diet" onChange={handle_change}>
                <option value='vegetarian'>Vegetarian</option>
                <option value='vegan'>Vegan</option>
                <option value='halal/kosher'>Halal/Kosher</option>
                <option selected value='none'>
                  None
                </option>
              </select>
            </label>
            <br />
            <label>
              Current Year:
              <input type='text' defaultValue='2019' id="year" onChange={handle_change}/>
            </label>
            <br />
            <input type='submit' />
          </form>
        }
      </div>
    </div>
  )
}
