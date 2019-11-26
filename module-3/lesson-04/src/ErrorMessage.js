import React from 'react'
import './ErrorMessage.css'

export default function ErrorMessage({ label }) {
  return (
    <div className='ErrorMessage'>
      <div className='ErrorMessage-Text'>{label}</div>
    </div>
  )
}
