import { PRODUCTS_LOAD, GET_PAGE, SEARCH_REQ, SEARCH_DATA, ERROR_DISPLAY_OFF, ERROR_DISPLAY_ON } from "./types";

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
        data: params
    }
}
export function errorOn(text) {
    return dispatch => {
      dispatch({
        type: ERROR_DISPLAY_ON,
        text
      });
  
      setTimeout(() => {
        dispatch(errorOff());
      }, 3000)
    }
  }
  export function errorOff() {
    return {
      type: ERROR_DISPLAY_OFF,
    }
  }
  

export function productsLoad(){
    return async dispatch => {
        try{ const response = await fetch ('https://files.rerotor.ru/rerotor/products.json');
        const jsonData = await response.json();
        setTimeout(() => {
            dispatch({
              type: PRODUCTS_LOAD,
              data: jsonData
            });
          }, 1000);
    }
    catch(err) {
        dispatch(errorOn('Ошибка API'));
      }
    }
}