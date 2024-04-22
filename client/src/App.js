import { UseSelector, useDispatch, useSelector } from "react-redux"; //UseSelector lấy dữ liệu từ redux, useDispatch đi tới redux
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
} from "./containers/public";
import path from "./utils/path";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.DOG} element={<DogProduct />} />
            <Route path={path.CAT} element={<CatProduct />} />
            <Route path={path.PROMOTION} element={<Promotion />} />
            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
