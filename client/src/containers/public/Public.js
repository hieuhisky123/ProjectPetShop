import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components";
const Public = () => {
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="overflow-y-auto">
        <Outlet />
        {/*dùng để hiển thị route con*/}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Public;
