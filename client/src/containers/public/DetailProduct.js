import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis'

const DetailProduct = () => {
  const {pid, title} = useParams()
  // console.log(pid, title);
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid)
    console.log(response);
  }
  useEffect(() => {
    if(pid) fetchProductData()
  }, [pid])
  return (
    <div>
      <h3>{title}</h3>
    </div>
  )
}

export default DetailProduct
