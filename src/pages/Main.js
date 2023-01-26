import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { productsLoad, getPage } from '../redux/actions';
import Search from '../components/Search';
import Pagination from '@mui/material/Pagination';
import Card from './Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";


export default function Main () {

const columns = [
    { field: 'logo', headerName: 'Фото', width: 100,
    sortable: false,
    renderCell: (params)=>{
        return (
            <>
            <Avatar src={params.value}/></>
        )
    }},
    {
      field: 'name',
      headerName: 'Название',
      width: 450,
      renderCell: (params)=>{
        console.log(params);
        return <Link to="/card"><div className='table-row__box'> 
        <p className='table-row__name'>{params.value.name}</p>
        <p className='table-row__category'>{params.value.category}</p></div></Link>
    }},
    {
      field: 'views',
      headerName: 'Просмотры',
      width: 150,
    },
    {
      field: 'start_date',
      headerName: 'Начало ротации',
      type: 'number',
      width: 150,
     },
    {
      field: 'end_date',
      headerName: 'Конец ротарии',
      width: 150}
  ];
  
  

    const products= useSelector(state=>{
        const {mainReducer} = state; 
        return mainReducer.products;
    })
    const row= useSelector(state=>{
        const {mainReducer} = state; 
        return mainReducer.row;
    })
    const page= useSelector(state=>{
        const {mainReducer} = state; 
        return mainReducer.page;
    })
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(productsLoad());
    }, [])

    function handleChange(e, page) {
        e.preventDefault();
        dispatch(getPage(page))
    }
    


    return(<div className='main-box'>
        <div className='main-box__container'>
        <h1>Карточки контента</h1>
        <div className='main-box__sort'>
    <div className='sort__container'>
<div className='main-box__txt'>Сортировать:</div>
<div className='main-box__link'>По названию</div>
<div className='main-box__link'>По просмотрам</div>
<div className='main-box__link'>По дате начала</div>
<div className='main-box__link'>По дате окончания</div>
    </div>
<div className='main-box__search'>
<Search/>
</div>
        </div>
<Box sx={{ height: 300, width: '100%' }}>
<Pagination  onChange={handleChange} count={4} variant="outlined" shape="rounded" />
      <DataGrid
      page={page}
      onPageChange={()=>{page=page}}
      hideFooterPagination={true}
        rows={row}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[3]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
        </div>
        <Routes>
          <Route path="/card" element={<Card content={row}/>} />
          <Route path="/" element={<Main />} />
        </Routes>
        </div>
    )

}
