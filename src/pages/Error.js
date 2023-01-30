import React from 'react';
import { useSelector } from 'react-redux';
import errorImg from "../assets/error.jpg"


export default function Error() {
    const error = useSelector(state => state.error);
  return (
    <div className='error__box'>
       <div className='error__msg'>
              {error}
            </div>
        <img className='error__img' src={errorImg} alt="грустная собака"/>
    </div>
  )
}
