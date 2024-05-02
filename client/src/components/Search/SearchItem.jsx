import React, {memo, useEffect, useState} from 'react'
import icons from 'utils/icons'
import { subcategories } from 'utils/contantsDetail'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import path from 'utils/path'
import { getProducts } from 'apis'
import useDebounce from 'hooks/useDebounce'

const {IoChevronDown} = icons
const SearchItem = ({name, activeClick, changeActiveFilter, type = 'checkbox'}) => {
    const navigate = useNavigate()
    const {category} = useParams()
    const [selected, setSelected] = useState([])
    const [params] = useSearchParams()
    const [price, setPrice] = useState({
        from: '',
        to: ''
    })
    const [bestPrice, setBestPrice] = useState(null)
    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value)
        if (alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        changeActiveFilter(null)
        
    }
    const fetchBestPriceProduct = async () => {
        const response = await getProducts({sort: '-price', limit: 1})
        if (response.success) setBestPrice(response.products[0]?.price)
    }
    
    const deboucePriceFrom = useDebounce(price.from, 500)    
    const deboucePriceTo = useDebounce(price.to, 500)  
    useEffect(() => {
        let param = []
        for(let i of params.entries()) param.push(i)
        const queries = {}
        for(let i of param) queries[i[0]] = i[1]    
    if (selected.length > 0) {
    
    if (selected) queries.subcategories = selected.join(',')
    
    queries.page = 1
    } else delete queries.subcategories
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
                })
    }, [selected])
    useEffect(() => {
        if (type === 'input') fetchBestPriceProduct()
    },[type])

    useEffect(() => {
        if (price.from && price.to && price.from > price.to) alert('Giá nhập vào không thể lớn hơn giá cuối')
    },[price])

    useEffect(() => {
        let param = []
        for(let i of params.entries()) param.push(i)
        const queries = {}
        for(let i of param) queries[i[0]] = i[1]
    if(Number(price.from) > 0) queries.from = price.from
    else delete queries.from
    if(Number(price.to) > 0) queries.to = price.to
    else delete queries.to
    queries.page = 1
    navigate({
        pathname: `/${category}`,
        search: createSearchParams(queries).toString()
            })
    },[deboucePriceFrom,deboucePriceTo])

  return (
    <div 
    className='p-4 cursor-pointer text-gray-500 text-xs gap-6 relative border border-gray-800 flex justify-between items-center'
    onClick={() => changeActiveFilter(name)}
    >
      <span className='capitalize'>{name}</span>
      <IoChevronDown/>
      {activeClick === name && <div className='absolute z-10 top-[calc(100%+1px)] left-0 p-4 w-fit border bg-white min-w-[200px]'>
        {type === 'checkbox' && <div className=''>
            <div className='p-4 items-center flex justify-between gap-8 border-b'>
                <span className='whitespace-nowrap'>{`${selected.length} Đã chọn`}</span>
                <span onClick={e => {
                    e.stopPropagation()
                    setSelected([])
                    changeActiveFilter(null)
                }} className='underline cursor-pointer hover:text-bg-user'>Reset</span>
            </div>
            <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                {subcategories.map((el,index) => (
                    <div key={index} className='flex items-center gap-5'>
                        <input 
                        type="checkbox" 
                        name={el}
                        onChange={handleSelect}
                        value={el}
                        id={el}
                        checked={selected.some(selectedItem => selectedItem === el)}
                        className='form-checkbok'
                        // class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                        />
                         <label className='capitalize text-gray-700' htmlFor={el}>{el}</label>
                    </div>
                ))}
            </div>
            </div>}
            {type === 'input' && <div onClick={e => e.stopPropagation()}>
            <div className='p-4 items-center flex justify-between gap-8 border-b'>
                <span className='whitespace-nowrap'>{`Giá cao nhất ${Number(bestPrice).toLocaleString()} VNĐ`}</span>
                <span onClick={e => {
                    e.stopPropagation()
                    setPrice({from: '',to:''})
                    changeActiveFilter(null)

                }} className='underline cursor-pointer hover:text-bg-user'>Reset</span>
            </div>
            <div className='flex items-center p-2 gap-2'>
                <div className='flex items-center gap-2'>
                <label htmlFor="from">Từ</label>
                <input 
                className='form-input' 
                type="number" 
                id='from'
                value={price.from}
                onChange={e => setPrice(prev => ({...prev, from: e.target.value}))}
                 />
                </div>
                <div className='flex items-center gap-2'>
                <label htmlFor="to">Đến</label>
                <input 
                className='form-input' 
                type="number" 
                id='to'
                value={price.to}
                onChange={e => setPrice(prev => ({...prev, to: e.target.value}))}

                 />
                </div>
            </div>
                </div>}
      </div>}
    </div>
  )
}

export default memo(SearchItem)
