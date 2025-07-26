import React from 'react'
import nothingfound from "/public/file.png"
import Image from 'next/image'
const NothingFound = () => {
  return (
    <div className='flex justify-center flex-col items-center w-full'>
        <Image src={nothingfound} width={200} height={200} alt='Nothing found' />
        <span className='text-sm text-muted-foreground'>Resource you are looking for is not found</span>
    </div>
  )
}

export default NothingFound