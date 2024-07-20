import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-fulll dark:bg-[#1F1F1F]'>
      {children}
    </div>
  )
}

export default layout
