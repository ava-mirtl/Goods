import {  PRODUCTS_LOAD, 
    GET_PAGE, 
    GET_DATA, 
    SEARCH_REQ, 
    SEARCH_DATA, 
    ERROR_DISPLAY_ON,
    ERROR_DISPLAY_OFF } from "./types";
import dayjs  from 'dayjs' ;


const initialState = {
    products: [],
    row: [],
    page: 0,
    data: {},
    searchReq: "",
    index: 0,
    error: null
}

export const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case PRODUCTS_LOAD:
            const productsNew =  action.data.map((res,i)=>{
            return{...res,
                id: i+1,
                img: res.image_url,
                logo: res.logo_url,
                name: {name:res.name, category: res.category},
                start_date: dayjs(res.start_date, "MM-DD-YYYY").format("DD.MM.YYYY"),
                end_date: dayjs(res.end_date, "MM-DD-YYYY").format("DD.MM.YYYY"),
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
            case ERROR_DISPLAY_ON:
                return {
                ...state,
                error: action.text
                }

            case ERROR_DISPLAY_OFF:
                return {
                ...state,
                error: null
                }
            case SEARCH_REQ:
            const searchRequest = action.data;
            return{
                ...state,
                searchReq: searchRequest
            }  
            case SEARCH_DATA:
                const index = action.data;
                return{
                    ...state,
                    index: index
                }  
        default: return state
    }
}