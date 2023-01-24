import {  PRODUCTS_LOAD } from "./types";
const initialState = {
    products: []
}

export const mainReducer = (state = initialState, action) => {
   console.log('main reducer>', action);
     switch (action.type) {
        case PRODUCTS_LOAD:
            const productsNew =  action.data.map(res=>{
            return{
                img: res.image_url,
                logo: res.logo_url,
                name: res.name,
                category: res.category,
                views: res.views,
                start_date: res.start_date,
                end_date: res.end_date,
                discount: res.discount,
                stars: res.stars,
                old_price: res.old_price,
                new_price: res.new_price,
                disclaimer: res.disclaimer
            }})
            return{
                ...state,
                products: productsNew
            }  
        default: return state
    }
}