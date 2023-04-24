import { MessageContext } from '../../App'
import './MessageStyles.scss'
import React, { useContext } from 'react'

export default function Message() {

  const data = useContext(MessageContext)

  return (
    <div className='Message'>
      Message {JSON.stringify(data)}
    </div>
  )
}
