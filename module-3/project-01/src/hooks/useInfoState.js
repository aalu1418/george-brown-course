import React from 'react'

const useInfoState = () => {
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

  return {value, onChange, setValue}
}

export default useInfoState;
