import React from 'react'
import notfound from '../../assets/error.svg'
import { Helmet } from 'react-helmet'

export default function Notfound() {
  return (
    <div className='w-full flex justify-center h-4/5 p-4'>
      <Helmet>
                          <title>Error 404</title>
                        </Helmet>
      <img src={notfound} alt='not found'/>
    </div>
  )
}
