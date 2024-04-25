import axios from "../axios";

export const apiRegister = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/user/register",
        method: "post",
        data,
        withCredentials: true

        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  export const apiLogin = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/user/login",
        method: "post",
        data
        //params: {id: id} chuyền tham số
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });