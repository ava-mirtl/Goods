import { PRODUCTS_LOAD, GET_PAGE, GET_DATA,SEARCH_REQ, SEARCH_DATA } from "./types";

export function getPage(params){
    return{
        type: GET_PAGE,
        page: params
    }
}

export function getData(params){
    return{
        type: GET_PAGE,
        data: params
    }
}

export function searchReq(params){
    return{
        type: SEARCH_REQ,
        data: params
    }
}
export function searchData(params){
    return{
        type: SEARCH_DATA,
        index: params
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