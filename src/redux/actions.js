import { PRODUCTS_LOAD, GET_PAGE } from "./types";

export function getPage(params){
    return{
        type: GET_PAGE,
        page: params
    }
}


export function productsLoad(){
    return async dispatch => {
        const response = await fetch ('https://files.rerotor.ru/rerotor/products.json');
        const jsonData = await response.json();
        dispatch({
            type: PRODUCTS_LOAD,
            data: jsonData
        });
    }
}