import axios from "../axios";

export const getProducts = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/product",
        method: "get",
        params
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetProduct = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/product/"+ pid,
        method: "get",
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
