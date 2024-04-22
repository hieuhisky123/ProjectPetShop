import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";
import Logo from "../assets/imgs/Logo.png";
import icons from "../utils/icons";

import Categories from "./Categories";

const Header = () => {
  const [isCategories, setIsCategories] = useState(false);

  const handleCategories = () => {
    setIsCategories(!isCategories);
  };
  // useEffect(() => {
  //   setIsCategories(!isCategories);
  // });

  return (
    <header className="w-full relative">
      <div className="flex h-[120px] items-center justify-between">
        <div className="flex items-center ml-[75px]">
          <Link to={path.HOME} className="mr-[38px]">
            <img src={Logo} width={122} height={39} alt="Village logo" />
          </Link>

          <div className=" mr-9">
            <span
              onClick={handleCategories}
              className="flex items-center justify-center cursor-pointer"
            >
              <icons.BiSolidCategoryAlt size={24} className="mr-[2px]" />
              <span className="text-xl">Danh mục Village</span>
              <icons.IoChevronDown size={16} className="ml-[2px] mt-[2px]" />
            </span>

            {/******Categories*******/}
            {isCategories && <Categories />}
          </div>

          <div className="flex items-center justify-center text-xl border-2 border-borderColor rounded-[10px] py-4">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className="w-[384px] ml-[34px] outline-none"
            />
            <icons.IoIosSearch
              sx={{ fontSize: "18px" }}
              className="ml-[110px] mr-[21px]"
            />
          </div>
        </div>

        <div className="flex mr-[75px]">
          <button className="px-[25px] py-4 text-xl rounded-[10px] font-semibold mr-1">
            Đăng ký
          </button>
          <button className="px-[25px] py-4 bg-buttonColor text-white text-xl rounded-[10px] font-semibold">
            Đăng nhập
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
