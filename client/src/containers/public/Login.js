import React, {useState, useCallback} from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/imgs/Logo.png';
import image from '../../assets/imgs/Login.jpg';
import { FaGoogle, FaFacebook, FaUserAlt, FaLock } from 'react-icons/fa';
import {InputField, Button} from '../../components'
import { MdEmail } from "react-icons/md";
import {apiRegister, apiLogin} from '../../apis/user'
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import path from "../../utils/path";
import {register, userReducer} from '../../store/user/userSlice'
import { useDispatch } from "react-redux";

const Login = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
const location = useLocation()
console.log(location);
  const [payload, setPayLoad] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
  })

  const [isRegister, setIsRegister] = useState(false)
  const resetPayload = () => {
    setPayLoad({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
    })
  }
  const handleSubmit = useCallback(async() => {
    const {firstname, lastname, mobile, ...data} = payload
    if (isRegister){
      const response = await apiRegister(payload)
      if (response.success) {
        Swal.fire(
          'Congatulation', response.mes,
          'Success'
        ).then(() => {
          setIsRegister(false)
          resetPayload()
        })
      }else Swal.fire('Oops!', response.mes,'error')

    }else {
      const rs = await apiLogin(data)
      if (rs.success) {
        dispatch(register({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
       navigate(`/${path.HOME}`)
      }else {
        Swal.fire(
          'Oops!', rs.mes,
          'error'
        
        )
      }
    }
  },[payload, isRegister])
  const backgroundColor = '#CFF1F1'; // Đặt màu nền dựa trên mẫu trong Figma
  return (
    <div className="flex flex-col md:flex-row items-stretch h-screen" style={{ backgroundColor }}> {/* Change layout to column on small screens */}
      {/* Left section with image, logo, and title */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-10 items-center"> {/* Use full width on small screens */}
        {/* Logo at the top */}
        <div className="w-full flex justify-start md:justify-center md:mt-10">
          <Link to="/">
            <img src={logo} alt="PetVillage Logo" className="w-36 rounded-lg" />
          </Link>
        </div>
        {/* Title */}
        <div className="hidden md:block text-center my-10">
          <span className="text-4xl font-extrabold">Hệ thống siêu thị thú cưng</span>
        </div>
        {/* Large image */}
        <div className="w-full flex justify-center">
          <img src={image} alt="Login Visual" className="rounded-lg" style={{ maxWidth: '100%', maxHeight: '60vh', height: 'auto' }} />
        </div>
      </div>
      {/* Phần bên phải với form đăng nhập */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-[40px] leading-[54.47px] text-center font-extrabold mb-8">{isRegister ? 'Đăng ký': 'Đăng nhập'}</h2>
          {/* Trường nhập tên người dùng */}
          {isRegister && <div className="flex items-center gap-2 mb-6">
            <FaUserAlt className="mr-4 w-[20px]" />
            {/* <input type="text" placeholder="Tài khoản" className="flex-1 py-2 border-b-2 outline-none" /> */}
            <InputField
            value={payload.firstname}
            setValue={setPayLoad}
            nameKey='firstname'
            />
            {/* <input type="text" placeholder="Tài khoản" className="flex-1 py-2 border-b-2 outline-none" /> */}
            <InputField
            value={payload.lastname}
            setValue={setPayLoad}
            nameKey='lastname'
            />
            </div>}

          <div className="flex items-center mb-6">
            <MdEmail className="mr-4"/>
            <InputField
            value={payload.email}
            setValue={setPayLoad}
            nameKey='email'
            />
            </div>

            {isRegister && <div className="flex items-center mb-6">
            <MdEmail className="mr-4"/>
            <InputField
            value={payload.mobile}
            setValue={setPayLoad}
            nameKey='mobile'
            />
            </div>}
            
            <div className="flex items-center mb-6">
            <FaLock className="mr-4" />
            <InputField
            value={payload.password}
            setValue={setPayLoad}
            nameKey='password'
            type={'password'}
            />
          </div>
          
          <Button
          name={isRegister ? 'Đăng ký' : 'Đăng nhập'}
          handdleOnClick={handleSubmit}
          fw
          />
          {/* Đăng nhập qua mạng xã hội */}
          {!isRegister && <div className="text-sm">
            Chưa có tài khoản?
          <Link onClick={() => setIsRegister(true)} className="text-black font-semibold"> Đăng ký ngay!</Link>
          </div>}
            {!isRegister && <div className="flex flex-col justify-center">
              <Link to="#" className="text-black font-semibold mb-2">Quên mật khẩu</Link>
            </div>}
            {isRegister && <div className="flex flex-col justify-center">
              <Link onClick={() => setIsRegister(false)} className="text-black font-semibold mb-2 w-full text-center">Đi tới trang đăng nhập</Link>
            </div>}
            <div className="flex justify-center items-center my-4 space-x-4">
  {/* Google button */}
  <button className="flex items-center justify-center bg-[#db4437] text-white rounded w-[217px] h-[66px] shadow-lg">
    <FaGoogle className="mr-2 text-xl" />
    Google
  </button>
  {/* Facebook button */}
  <button className="flex items-center justify-center bg-[#4267b2] text-white rounded w-[217px] h-[66px] shadow-lg">
    <FaFacebook className="mr-2 text-xl" />
    Facebook
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
