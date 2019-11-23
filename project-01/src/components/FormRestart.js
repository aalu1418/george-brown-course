import './FormRestart.css'
import React from 'react'

const FormRestart = ({info, form}) => {
  const onClick = () => {
    form.setValue(0)
    info.setValue({
      fname: '',
      lname: '',
      diet: 'None',
      city: '',
      province: 'Ontario',
      payment: "",
      terms:false,
    })
  }

  return (
      <div className="FormRestart-div">
        <button className="FormRestart-button" onClick={onClick}>Click Here to Submit Another Form</button>
      </div>
  )
}

export default FormRestart;
