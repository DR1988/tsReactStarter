import React from 'react'
import s from './Button.scss'

const Button = (props) => (
  <button onClick={props.onClick} className={s.root}>
    <div style={{ width: '100%', height: '100%' }}>
      {props.children}
    </div>
  </button>
)

export default Button
