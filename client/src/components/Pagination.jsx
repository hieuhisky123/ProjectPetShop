import React from 'react';
import usePagination from '../hooks/usePagination';
import PagiItem from './PagiItem';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams()
  const pagination = usePagination(totalCount, 2);

  const range = () => {
    const currentPage = +params.get('page')
    const pageSize = +process.env.REACT_APP_PRODUCT_LIMIT || 10
    const start = ((currentPage - 1) * pageSize) + 1
    const end = Math.min(currentPage * pageSize, totalCount)
    return `${start} - ${end}`
  }
  return (
    <div className='flex justify-between items-center gap-4'>
    {!+params.get('page') && <span className='text-sm italic'>{`Hiển thị sản phẩm 1 - ${+process.env.REACT_APP_PRODUCT_LIMIT || 10} của ${totalCount}`}</span>}
    {+params.get('page') && <span className='text-sm italic'>{`Hiển thị sản phẩm ${range()} của ${totalCount}`}</span>}
      <div className='flex items-center'>
      {pagination?.map((el) => (
        <PagiItem key={el}>{el}</PagiItem>
      ))}
    </div>
    </div>
  );
};

export default Pagination;



// trang đầu + trang cuối + trang giữa + sibling + 2*Dots
// min = 6 => sibling + 5
// totalPagination : giả sử sản phẩm 66, limitProduct = 10 => =7 (66/10) = 6.6 = 7
//totalPaginationItem : sinling + 5