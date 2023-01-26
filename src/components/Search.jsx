import React from 'react';
import icon from '../assets/pngwing.com.png';

export default function Search() {
  return (
    <div className='search'> 
    <input type="text" placeholder="Поиск..." className="search-field"/>
    <img src={icon} alt="" className="search-icon"></img>
    </div>

  )
}
