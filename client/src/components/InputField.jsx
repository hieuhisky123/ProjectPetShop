import React from 'react'

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields}) => {
  return (
    <div className='w-full relative'>
        {value?.trim() !== '' && <label className='text-[10px] animate-slide-top absolute top-0 left-[12px] block bg-white px-1' htmlFor={nameKey}>{nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}</label>}
      <input 
      type={type || 'text'}
      className='flex-1 py-2 border w-full my-2 rounded-sm px-4 outline-none placeholder:text-sm placeholder:italic'
      placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
      value={value}
      onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value}))}
      onFocus={() => setInvalidFields([])}
       />
       {invalidFields?.some(el => el.name === nameKey) && <small className='text-red-600 italic'>
        {invalidFields.find(el => el.name === nameKey)?.mes}
        </small>}
    </div>
  )
}

export default InputField
