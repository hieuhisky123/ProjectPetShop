import React, {memo, useState} from 'react'
import {productInfoTabs} from '../utils/contantsDetail'

const activedStyle = '' 
const notActivedStyle = '' 

const ProductInformation = () => {
    const [activedTabs, setActivedTabs] = useState(1)
  return (
    <div>
      <div className='flex items-center gap-2 relative bottom-[-1px]'>
      {productInfoTabs.map(el => (
        <span 
        className={`py-2 px-4 cursor-pointer ${activedTabs === el.id ? 'bg-white border border-b-0': 'bg-gray-200'}`} 
        key={el.id}
        onClick={() => setActivedTabs(el.id)}
        >
        {el.name}</span>
      ))}
      </div>
      <div className='w-[80%] border p-4'>
      {productInfoTabs.some(el => el.id === activedTabs) && productInfoTabs[activedTabs -1] ?.content}
      </div>
    </div>
  )
}

export default memo(ProductInformation)
