import {  PRODUCTS_LOAD, TABLE_LOAD, GET_PAGE } from "./types";
const initialState = {
    products: [],
    row: [],
    page: 0
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
            };
        })
            case TABLE_LOAD:
            const proNew =  action.data.map((item,i)=>{
            return{
                id: i+1,
                logo: item.logo_url,
                name: {name:item.name, category: item.category},
                views: item.views,
                start_date: item.start_date,
                end_date: item.end_date,
                key: i+1
            }})
            return{
                ...state,
                row: proNew, 
                products: productsNew
            }  
            case GET_PAGE:
            const newPage = action.page-1;
            return{
                ...state,
                page: newPage
            }  
        default: return state
    }
}