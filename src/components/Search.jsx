import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import icon from '../assets/pngwing.com.png';
import Card from '../pages/Card';
import { searchData, searchReq } from '../redux/actions';

export default function Search() {
  const dispatch = useDispatch()
const handleChange=(e)=>{
dispatch(searchReq(e.target.value))
}
const result = useSelector(state=>{
  const {mainReducer} = state; 
  return mainReducer.searchReq;
})

const products = useSelector(state=>{
  const {mainReducer} = state; 
  return mainReducer.products;
})

const handleSearch=(e)=>{
  e.preventDefault();
  const arr = products.map(item=>item.name.name);
  const resI= arr.findIndex(el=>el.includes(result))
  dispatch(searchData(resI));
}

console.log(result);
  return (
    <form className='search'  onSubmit={handleSearch} > 
    <input onChange={handleChange}type="text" placeholder="Поиск..." className="search-field"/>
    <img src={icon} alt="" className="search-icon"></img>
    </form>
  )
}
