import icons from "./icons"

const { FaStar, FaRegStar } = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')

export const renderStarFromNumber = (number) => {
    if (!Number(number)) return
    // 4 => [1,1,1,1,0]
    // 2 => [1,1,0,0,0]
    const stars = [] 
    for(let i = 0; i < +number; i++) stars.push(<FaStar color="orange"/>)
    for(let i = 5; i > +number; i--) stars.push(<FaRegStar color="orange"/>)
    return stars
}

export const validate = (payload, setInvalidFields) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    for (let arr of formatPayload){
        if (arr[1].trim() === '') {
            invalids++
            setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Hãy nhập vào đây'}])
        }
    }
    for (let arr of formatPayload){
        switch (arr[0]) {
            case 'email':
                const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!arr[1].match(regex)){
                    invalids++
                    setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Email không hợp lệ'}])
                }
                break ;
                case 'password':
                
                if (arr[1].length <6){
                    invalids++
                    setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Mật khẩu tối thiểu 6 ký tự'}])
                }
                break;
            default:
                break;
        }
    }

    return invalids
}