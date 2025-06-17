import { Button } from '@/components/ui/button'
import React from 'react'
import { TabsComponent } from '../components/register/tabs'
import { Helmet } from 'react-helmet'

function Register() {
  return (
    <>
      <Helmet>
        <title>Register | Skill Match</title>
        <meta name="description" content="Create your Skill Match account and get hired for part-time tech jobs." />
      </Helmet>
      
      <div className='mx-4 sm:mx-6 md:mx-8 lg:mx-10 rounded-lg p-4'>
        <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic font-bold bg-gradient-to-r from-[#8EC5FC] to-[#0093E9] bg-clip-text text-transparent">
          Skill Match
        </div>

        <div className='text-xs md:text-sm text-gray-500'>
          Register to get started
        </div>
        <div className='text-lg md:text-xl lg:text-2xl font-bold'>Join skill match to find the right job faster — it's quick and free!</div>

        <div className='bg-accent rounded-lg p-4 sm:p-5 md:p-6 mt-6 sm:mt-8 md:mt-10'>
          <TabsComponent />
        </div>
      </div>
    </>

  )
}

export { Register }