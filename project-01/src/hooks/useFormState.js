import React from 'react'

const useFormState = () => {
  let [value, setValue] = React.useState(0)
  const onChange = () => {setValue(value+1)}

  return {value, onChange}
}

export default useFormState;
