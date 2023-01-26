import React from 'react'
import {useSelector} from 'react-redux';
import { Rating } from '@mui/material';
import StarIcon from '@material-ui/icons/Star';
import { withStyles } from '@material-ui/core/styles';




export default function Card() {


    const rowData = useSelector(state=>{
        const {mainReducer} = state; 
        return mainReducer.data;
    })

    const StyledRating = withStyles({
        iconFilled: {
          color: '#211E43',
        }
      })(Rating);
      

    return (
        <div className='card'>
          <div className='card__box'>
          <div className='card__header'>
          <div className='card__header-discount'>
          {rowData.discount!=0&& rowData.discount}
            </div> 
            <div className='card__header-logobox'>
                <img className='card__header-logo'src={rowData.logo}alt="logo"/>
            </div> 
            </div> 
          <div className='card__content'>
            <div className='card__content-imgbox'>
                <img className='card__header-logo'src={rowData.img} alt="item image"/>
            </div> 
            <div className='card__contentbox'>
            <h1 className='card__content-title'>{rowData.name.name}</h1>
            <div className='card__content-pricebox'>
            <div className='card__content-oldprice'>
                {rowData.old_price}
            </div>
            <div className='card__content-newprice'>
            <div className='card__content-stars'>
                <StyledRating
        name="customized-color" 
        value={rowData.stars}
          precision={0.5}
          icon={<StarIcon fontSize="inherit" />}
    size="large"/>
    </div>
            <div className='card__content-newprice'>{rowData.new_price!=0&&rowData.new_price}</div>
            </div>
            </div>
            </div> 
            </div> 
            <div className='card__footer'>
            {rowData.disclaimer}
            </div>
          </div>
        </div>
      )
}