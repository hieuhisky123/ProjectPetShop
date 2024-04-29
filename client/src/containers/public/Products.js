import React, {useEffect, useState, useCallback} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {Breadcrumbs,Card,SearchItem} from '../../components/index'
import { getProducts } from '../../apis'
import Masonry from 'react-masonry-css'
import {renderStarFromNumber} from '../../utils/helpers'
import { Link } from 'react-router-dom'

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

const Products = () => {
    const [products,setProducts] = useState(null)
    const [activeClick,setActiveClick] = useState(null)
    const [params] = useSearchParams()

    const fetchProductByCategory = async (queries) => {
        const response = await getProducts(queries)
        if (response.success) setProducts(response.products)
    }
    const {category} = useParams()
    useEffect(() => {
        let param = []
        for(let i of params.entries()) param.push(i)
        const queries = {}
        let priceQuery = {}
        for (let i of params) queries[i[0]] = i[1]
        if (queries.to && queries.from) {
            priceQuery = {
            $and: [
                {price: {gte: queries.from}},
                {price: {lte: queries.to}},

            ]}
        delete queries.price

        }
        if (queries.from) queries.price = {gte: queries.from}
        if (queries.to) queries.price = {lte: queries.to}
        delete queries.to
        delete queries.from
        const q = {...priceQuery, ...queries}
        fetchProductByCategory(q)
    },[params])
    const changeActiveFilter = useCallback ((name) => {
        if (activeClick === name) setActiveClick(null)
        else setActiveClick(name)
    }, [activeClick])
  return (
    <div>
      <div className='w-full px-12'>
      <h3>{category}</h3>
      <Breadcrumbs category={category?.title} />
      </div>
      <div className='w-full bordder p-4 flex justify-center'>
        <div className='w-4/5 flex-auto pl-10 flex-col flex gap-3'>
            <span className='font-extrabold text-sm'>Tìm theo</span>
            <div className='flex items-center gap-4'>
            <SearchItem
            name='GIÁ'
            activeClick={activeClick}
            changeActiveFilter={changeActiveFilter}
            type='input'
            />
            <SearchItem
            name='LOẠI'
            activeClick={activeClick}
            changeActiveFilter={changeActiveFilter}
            />
            </div>
        </div>
      </div>
      <div className='grid mb-80 grid-cols-4 gap-x-10 gap-y-[50px] pl-10'>
      {/* <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid flex mx-[-10px] grid-cols-4 gap-x-10 gap-y-[50px]"
        columnClassName="my-masonry-grid_column"> */}
           {products?.map(el => <Link 
    key={el.id}
    to={`/${el.category}/${el.subcategories}/${el._id}/${el.title}`} // Sử dụng trực tiếp giá trị từ đối tượng el
  >
    <Card
      key={el._id}
      image={el.images[0]}
      title={el.title}
      star={renderStarFromNumber(el.totalRatings)}
      sold={el.sold}
      discount={el.discount}
      price={el.price}
    />
  </Link>)} 
            {/* </Masonry> */}
      </div>
    </div>
  )
}

export default Products
