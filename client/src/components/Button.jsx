import React from 'react'

const Button = ({name, handdleOnClick, style, iconsBefore, iconAfter, fw}) => {
  return (
    <button
    type='button'
    className={style ? style : `bg-black text-white py-3 mb-4 font-semibold rounded-lg ${fw ? 'w-full' : 'w-fit'}`}
    onClick={() => {handdleOnClick && handdleOnClick()}}
    >
        {iconsBefore}
        <span>{name}</span>
        {iconAfter}
    </button>
  )
}

export default Button
