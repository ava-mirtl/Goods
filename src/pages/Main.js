import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { productsLoad } from '../redux/actions';

export default function Main () {
    const products= useSelector(state=>{
        const {mainReducer} = state; 
        return mainReducer.products;
    })
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(productsLoad());
    }, [])

    return(<div>
        {!!products.length && products.map(res =>{
            return  <div>{res.name}</div>
        })}</div>
    )

}