import React from 'react'

import './Button.scss'

const Button = ({type, value}) => {
  return (
    <div>
      <button 
      className={['btn', type === 'login' ? 'login_button' : '' ].join(' ')}
      type="Submit">{value}</button>
    </div>
  )
}

export default Button
