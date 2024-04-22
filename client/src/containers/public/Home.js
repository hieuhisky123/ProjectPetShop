import React, { useEffect } from "react";
import { Introduce } from "../../components";
import * as apis from "../../apis";
const Home = () => {
  // useEffect(() => {
  //   const fetchDataHome = async () => {
  //     const response = await apis.getHome();
  //     console.log(response);
  //   };
  //   fetchDataHome();
  // }, []);
  return (
    <>
      <Introduce />
    </>
  );
};

export default Home;
