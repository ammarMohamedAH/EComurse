import React from 'react'
import notfound from '../../assets/error.svg'

export default function Notfound() {
  return (
    <div className='w-full flex justify-center h-4/5 p-4'>
      <img src={notfound} alt='not found'/>
    </div>
  )
}
