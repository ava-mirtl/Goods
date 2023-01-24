import { PRODUCTS_LOAD } from "./types";

// export function decrementLikes(){
//     return{
//         type: DECREMENT
//     }
// }


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