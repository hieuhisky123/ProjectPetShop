import axios from "axios";

export const apiGetCategories = () => axios({
    url: 'http://127.0.0.1:5000/api/productcategory',
    method: 'get'
})