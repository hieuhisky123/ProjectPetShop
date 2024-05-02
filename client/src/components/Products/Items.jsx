import React, { memo, useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { UseSelector, useSelector } from "react-redux";
import {getProducts} from '../../apis/home'
import {renderStarFromNumber} from '../../utils/helpers'
import { Link } from "react-router-dom";
import path from "../../utils/path";


const Items = () => {
  const [bestSellers, setBestSellers] = useState(null)
  const fetchProducts = async () => {
    const response = await Promise.all([getProducts({sort: '-sold'}), getProducts({sort: '-createdAt'})])
    if (response[0]?.success) setBestSellers(response[0].products)
  }

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(actions.getProducts());
  // }, []);
  // const { products } = useSelector((state) => state.app);


  // Render your component with products data

  

  useEffect(() => {
    fetchProducts()
  },[])

  return (
    <div>
      <div
        className="px-12"
        // to={`/${path.DETAIL_PRODUCT}/${bestSellers[0]?.id}/${bestSellers[0]?.title}`}
      >
        <div className="flex justify-between items-center mb-[50px]">
          <p className="text-[#2E2437] font-bold text-[40px]">
            Sản phẩm bán chạy
          </p>
          <span className="font-semibold text-[20px] text-[#000000]">
            Xem tất cả
          </span>
        </div>
      </div>
  
      <div className="grid grid-cols-4 gap-x-10 gap-y-[50px]">
      {bestSellers && bestSellers.map(el => (
  <Link 
    key={el.id}
    to={`/${el.category?.toLowerCase()}/${el.subcategories[0]}/${el._id}/${el.title}`}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Sử dụng trực tiếp giá trị từ đối tượng el
  >
    <Card
      key={el.id}
      image={el.thumb}
      title={el.title}
      star={renderStarFromNumber(el.totalRatings)}
      sold={el.sold}
      discount={el.discount}
      price={el.price}
    />
  </Link>
))}

      </div>
    </div>
  );
  
};

export default memo(Items);
