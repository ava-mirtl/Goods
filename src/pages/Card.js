import React from 'react';
import './Card.scss'
import {useSelector} from 'react-redux';
import { Rating } from '@mui/material';
import {Button} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from "react-router-dom";
import {withStyles} from '@mui/styles';




export default function Card() {

const index = useSelector(state=>{
  return state.index; 
})//индекс товара из стора

const rowData = useSelector(state=>{
        return state.products[index];
    })//данные текущей карточки 


const StyledRating = withStyles({
        iconFilled: {
          color: '#211E43',
        }
      })(Rating);

      //возвращаю карточку с проверками данных - если их нет или равны нулю, элемент не отображается

    return (<>
      <div className='card__btn-box'><Button size="small" variant="outlined"><Link to="/">Назад</Link></Button></div>

        <div className='card'>
          <div className='card__box'>
          <div className='card__header'>
          
          {rowData.discount!==0?<div className='card__header-discount'><p>- {rowData.discount}%</p></div>:<span></span> }
          

            <div className='card__header-logobox'>
                <img className='card__header-logo'src={rowData.logo}alt="logo"/>
            </div> 
            </div> 
          <div className='card__content'>
            <div className='card__content-imgbox'>
                <img className='card__content-img'src={rowData.img} alt="item"/>
            </div> 
            <div className='card__contentbox'>
            <h1 className='card__content-title'>{rowData.name.name}</h1>
            <div className='card__content-pricebox'>
            <div className='card__content-oldpricebox'>
                <p  className='card__content-oldprice'>{rowData.old_price}&#8381;</p>
                <p className='card__content-pricetext'>СТАРАЯ ЦЕНА</p>
            </div>
            <div className='card__content-newpricebox'>
            {rowData.stars!==0&& <div className='card__content-stars'><StyledRating
        name="customized-color" 
        readOnly
        value={rowData.stars}
          icon={<StarIcon fontSize="inherit" />}
    size="large"/>    </div>}
              {!!rowData.new_price?<><p className='card__content-newprice'>{rowData.new_price}&#8381;</p><p className='card__content-pricetext'>ЦЕНА ПО АКЦИИ</p> 
              </>:<span></span>}
              </div>
            </div>
            </div> 
            </div>
          </div>{!!rowData.disclaimer?
            <div className='card__footer'>
            <div className='footer__txt'>{rowData.disclaimer}</div>
            </div>: <></>}
        </div></>
      )
}