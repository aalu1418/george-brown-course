import React from 'react'

const useFormState = (info) => {
  let [value, setValue] = React.useState(0)
  const onChange = () => {
    //save to local storage if when form state is 0, 1, or 2 (basic, address, payment)
    if (value < 3) {
      localStorage.setItem('info', JSON.stringify(info.value))
    }
    setValue(value+1)
  }

  return {value, onChange, setValue}
}

export default useFormState;
