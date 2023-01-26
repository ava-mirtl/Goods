import {  PRODUCTS_LOAD, TABLE_LOAD, GET_PAGE, GET_DATA } from "./types";
const initialState = {
    products: [],
    row: [],
    page: 0,
    data: {}
}

export const mainReducer = (state = initialState, action) => {
   console.log('main reducer>', action);
     switch (action.type) {
        case PRODUCTS_LOAD:
            const productsNew =  action.data.map((res,i)=>{
            return{
                id: i+1,
                img: res.image_url,
                logo: res.logo_url,
                name: {name:res.name, category: res.category},
                category: res.category,
                views: res.views,
                start_date: res.start_date,
                end_date: res.end_date,
                discount: res.discount,
                stars: res.stars,
                old_price: res.old_price,
                new_price: res.new_price,
                disclaimer: res.disclaimer
            };
        })
            return{
                ...state,
                products: productsNew,
                data: productsNew[1]
            }  
            case GET_PAGE:
            const newPage = action.page-1;
            return{
                ...state,
                page: newPage
            } 
            case GET_DATA:
            const newCard = action.data;
            return{
                ...state,
                data: newCard
            }  
        default: return state
    }
}