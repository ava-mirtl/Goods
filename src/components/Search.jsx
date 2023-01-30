import React, {useState} from 'react';
import icon from '../assets/pngwing.com.png';
import './Search.scss'

export default function Search({onSearch}) {
const [value, setValue]= useState('');

const handleChange=(e)=>{
setValue(e.target.value)
}
const handleSearch = (e)=>{
  e.preventDefault();
  onSearch(value);
};

  return (
    <form className='search'  onSubmit={handleSearch} > 
    <input value = {value} onChange={handleChange}type="text" placeholder="Поиск..." className="search-field"/>
    <img src={icon} alt="" className="search-icon"/>
    </form>
  )
}
