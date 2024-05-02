import React, { memo, Fragment, useState } from 'react'
import  logo  from 'assets/imgs/Logo.png';
import { adminSidebar } from 'utils/contantsDetail'
import { NavLink } from 'react-router-dom';
import clsx from 'clsx'
import { AiOutlineCaretDown,AiOutlineCaretRight } from 'react-icons/ai'

const activeStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 bg-gray-500'
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 hover:bg-gray-600'

const AdminSidebar = () => {
  const [actived,setActived] = useState([])
  const handleShowTab = (tabID) => {
    if (actived.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
    else setActived(prev => [...prev, tabID])
  }
  return (
    <div className=' bg-zinc-800 h-full py-4'>
      <div className='flex flex-col justify-center items-center gap-2 p-4 font-semibold'>
        <img className='w-[200px] object-contain rounded-md' src={logo} alt="logo" />
        <small>Quản Trị Viên</small>
      </div>
      <div>
        {adminSidebar.map(el => (
          <Fragment key={el.id}>
              {el.type === 'SINGLE' && <NavLink 
              to={el.path}
              className={({isActive}) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
                </NavLink>}
                {el.type === 'PARENT' && <div onClick={() => handleShowTab(+el.id)} className='flex flex-col text-gray-200'>
                <div className='flex items-center justify-between px-4 py-2 hover:bg-gray-600 cursor-pointer'>
                <div className='flex items-center gap-2'>
                <span>{el.icon}</span>
                <span>{el.text}</span>
                </div>
                {actived.some(id => id === el.id) ? <AiOutlineCaretDown/> : <AiOutlineCaretRight/>}
                </div>
                {actived.some(id => +id === +el.id) && <div className='flex flex-col'>
                  {el.submenu.map(item => (
                    <NavLink 
                    key={item.text} 
                    to={item.path}
                    onClick={e => e.stopPropagation()}
                    className={({isActive}) => clsx(isActive && activeStyle, !isActive && notActiveStyle, 'pl-10')}
                    >
                      {item.text}
                    </NavLink>
                  ))}
                </div>}
                  </div>}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default memo(AdminSidebar)
