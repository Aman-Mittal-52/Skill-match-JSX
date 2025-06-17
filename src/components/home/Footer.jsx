import React from 'react';

function Footer() {
  // Debug: Render Footer component
  console.log('Rendering Footer component');

  return (
    <div className='bg-accent rounded-t-3xl p-4 md:p-10 flex flex-col md:flex-row justify-between items-start w-full gap-8 md:gap-4'>
        
      {/* Logo and description section */}
      <div className='flex flex-col w-full md:min-w-[220px]'>
        {/* Logo placeholder */}
        <div className='flex items-center mb-2'>
          {/* Replace with your logo if needed */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'><rect width="32" height="32" rx="6" fill="#000"/><path d="M8 16L16 8L24 16L16 24L8 16Z" fill="#fff"/></svg>
          <span className='text-xl font-bold'>Skill Match</span>
        </div>
        <p className='text-sm text-gray-500'>Skill Match is a platform that helps you find the right job faster — it's quick and free!</p>
      </div>

      {/* Links sections container */}
      <div className='grid grid-cols-2 md:flex md:flex-row gap-8 md:gap-4 w-full md:w-auto'>
        {/* Product section */}
        <div className='flex flex-col gap-2'>
          <h1 className='text-lg font-bold mb-2'>Product</h1>
          <a href='#' className='hover:underline text-base'>Features</a>
          <a href='#' className='hover:underline text-base'>Pricing</a>
          <a href='#' className='hover:underline text-base'>Calendar</a>
          <a href='#' className='hover:underline text-base'>Conferencing</a>
        </div>

        {/* Company section */}
        <div className='flex flex-col gap-2'>
          <h1 className='text-lg font-bold mb-2'>Company</h1>
          <a href='#' className='hover:underline text-base'>Contact</a>
          <a href='#' className='hover:underline text-base'>Faq</a>
          <a href='#' className='hover:underline text-base'>Blog</a>
          <a href='#' className='hover:underline text-base'>Pricing</a>
        </div>

        {/* Legal section */}
        <div className='flex flex-col gap-2'>
          <h1 className='text-lg font-bold mb-2'>Legal</h1>
          <a href='#' className='hover:underline text-base'>Terms</a>
          <a href='#' className='hover:underline text-base'>Privacy</a>
        </div>

        {/* Social section */}
        <div className='flex flex-col gap-2'>
          <h1 className='text-lg font-bold mb-2'>Social</h1>
          <div className='flex gap-4 mt-1'>
            {/* Instagram icon */}
            <a href='#' aria-label='Instagram' className='hover:opacity-80 transition-opacity'>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            </a>
            {/* Twitter icon */}
            <a href='#' aria-label='Twitter' className='hover:opacity-80 transition-opacity'>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1s-4.18 1.64-6.29 2.34A4.48 4.48 0 0 0 3 7.5v1A10.66 10.66 0 0 1 1 3s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            {/* LinkedIn icon */}
            <a href='#' aria-label='LinkedIn' className='hover:opacity-80 transition-opacity'>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="16" y1="8" x2="16" y2="16"/><line x1="8" y1="8" x2="8" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;