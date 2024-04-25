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
  FinalRegister
} from "./containers/public";
import path from "./utils/path";
import * as actions from "./store/actions";
import { useEffect } from "react";
import {getCategories} from './store/actions/asyncActions'


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
            <Route path={path.DETAIL_PRODUCT__PID__TITLLE} element={<DetailProduct/>} />
            <Route path={path.BLOGS} element={<Blog/>} />
            <Route path={path.DOG} element={<DogProduct />} />
            <Route path={path.CAT} element={<CatProduct />} />
            <Route path={path.PROMOTION} element={<Promotion />} />
            <Route path={path.STAR} element={<Home />} />
          </Route>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
