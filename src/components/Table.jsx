import Avatar from "@mui/material/Avatar";
import {  Link } from "react-router-dom";


export const tableColumns = [
    { field: 'logo', headerName: 'Фото', width: 60,
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
      sortable: false,
      width: 550,
      renderCell: (params)=>{
        return (
        <div className='table-row__box'> 
        <Link to="/card">{params.value.name}</Link>
        <p className='table-row__category'>{params.value.category}</p></div>
        )
        
        
    }},
    {
      field: 'views',
      sortable: false,
      headerName: 'Просмотры',
      width: 100,
    },
    {
      field: 'start_date',
      sortable: false,
      headerName: 'Начало ротации',
      type: 'number',
      width: 120
     },
    {
      field: 'end_date',
      headerName: 'Конец ротарии',
      width: 120,
      sortable: false,
    }
  ];
  