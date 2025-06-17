import { Button } from '@/components/ui/button'
import React from 'react'
import { TabsComponent } from '../components/register/tabs'

function Register() {
  return (
    <div className='mx-10  rounded-lg p-4'>
      <div className="text-7xl italic font-bold bg-gradient-to-r from-[#8EC5FC] to-[#0093E9] bg-clip-text text-transparent">
        Skill Match
      </div>

      <div className='text-sm text-gray-500'>
        Register to get started
      </div>
      <div className='text-2xl font-bold'>Join skill match to find the right job faster — it’s quick and free!</div>

      <div className='bg-accent rounded-lg p-6 mt-10'>
        <TabsComponent/>
      </div>
    </div>
  )
}

export {Register}