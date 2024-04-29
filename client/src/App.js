import { useDispatch, useSelector } from "react-redux"; //UseSelector lấy dữ liệu từ redux, useDispatch đi tới redux
import { Routes, Route } from "react-router-dom";
import "./App.css";
import appReducer from "./store/reducers/appReducer";
import {
  Home,
  Public,
  Login,
  DogProduct,
  CatProduct,
  Promotion,
  DetailProduct,
  Blog,
  FinalRegister,
  ResetPassword,
  Products
} from "./containers/public";
import path from "./utils/path";
import * as actions from "./store/actions";
import { useEffect } from "react";
import {getCategories} from './store/actions/asyncActions'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
  },[])
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(actions.getProducts());
  // }, []);

  return (
    <>
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLLE} element={<DetailProduct/>} />
            <Route path={path.BLOGS} element={<Blog/>} />
            <Route path={path.DOG} element={<DogProduct />} />
            <Route path={path.CAT} element={<CatProduct />} />
            <Route path={path.PROMOTION} element={<Promotion />} />
            <Route path={path.STAR} element={<Home />} />
            <Route path={path.PRODUCTS} element={<Products />} />
          </Route>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        </Routes>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
