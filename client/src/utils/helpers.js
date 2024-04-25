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