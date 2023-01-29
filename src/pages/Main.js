import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {  Link } from "react-router-dom";
import { productsLoad, getPage, searchData } from '../redux/actions';
import Search from '../components/Search';
import Pagination from '@mui/material/Pagination';
import Card from './Card';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";



export default function Main () {
  const [data, setData] = useState([]);
  
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
      sortable: false,
      width: 450,
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
      width: 150,
    },
    {
      field: 'start_date',
      sortable: false,
      headerName: 'Начало ротации',
      type: 'number',
      width: 150
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
    const dateFormat=(x)=>{
      const dateParts = x.split("/");
      const date = new Date(dateParts[2], dateParts[0]-1, dateParts[1]);
      const dd = date.getDate();
      const mm = date.getMonth()+1;
      const yyyy = date.getFullYear();
      return (
        `${dd<10?'0'+dd:dd}.${mm<10?'0'+mm:mm}.${yyyy}`
      )
      
    }
    useEffect(() => {
      if (products && products.length) {
        console.log("zhest", products);
        setData(products.map(item=>({...item,
                start_date: dateFormat(item.start_date),
                end_date: dateFormat(item.end_date)
        }
          ))
          )
      }
    }, [products])
    const page= useSelector(state=>{
        const {mainReducer} = state; 
        return mainReducer.page;
    })
    const rowData = useSelector(state=>{
      const {mainReducer} = state; 
      return mainReducer.data;
  })
  const index = useSelector(state=>{
    const {mainReducer} = state; 
    return mainReducer.index;
})
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(productsLoad());
    }, [])

    function handleChange(e, page) {
        e.preventDefault();
        dispatch(getPage(page))
    }
    const handleShow = (e)=>{
      dispatch(searchData(e.id-1) )}
      const handleSort = (type) => {
        if (!type) {
          return
        }
        if (type === 'name') {
          const sorted = [...data].sort((a,b) => {
            if (a.name.name.toLowerCase() < b.name.name.toLowerCase()) {
              return -1;
            }
            if (a.name.name.toLowerCase() > b.name.name.toLowerCase()) {
              return 1;
            }
            return 0;
          })
          setData(sorted)
        }
        if (type === 'views') {
          const sorted = [...data].sort((a,b) => {
            if (a.views < b.views) {
              return -1;
            }
            if (a.views > b.views) {
              return 1;
            }
            return 0;
          })
          setData(sorted)
        }
        if (type === 'dateBegin') {
          const sorted = [...data].sort((a,b) => {
            if (a.start_date < b.start_date) {
              return -1;
            }
            if (a.start_date > b.start_date) {
              return 1;
            }
            return 0;
          })
          setData(sorted)
        }
        
        
        if (type === 'dateEnd') {
          
          const sorted = [...data].sort((a,b) => {
            const aPartDate=a.start_date.split(".")
            const bPartDate=b.start_date.split(".")
            const aDate= new Date(aPartDate[2], aPartDate[1], aPartDate[0])
            const bDate= new Date(bPartDate[2], bPartDate[1], bPartDate[0])

            if (aDate < bDate) {
              return -1;
            }
            if (aDate > bDate) {
              return 1;
            }
            return 0;
          })
          setData(sorted)
        }
      }

    return(<div className='main-box'>
        <div className='main-box__container'>
        <h1>Карточки контента</h1>
        <div className='main-box__sort'>
    <div className='sort__container'>
<div className='main-box__txt'>Сортировать:</div>
<div onClick={() => handleSort('name')} className='main-box__link'>По названию</div>
<div onClick={() => handleSort('views')} className='main-box__link'>По просмотрам</div>
<div onClick={() => handleSort('dateBegin')} className='main-box__link'>По дате начала</div>
<div onClick={() => handleSort('dateEnd')} className='main-box__link'>По дате окончания</div>
    </div>
<div className='main-box__search'>
<Search/>
</div>
</div>

<Box sx={{ height: 300, width: '100%' }}>
<Pagination  onChange={handleChange} count={4} variant="outlined" shape="rounded" />
      <DataGrid
      onCellClick={handleShow}
      page={page}
      onPageChange={()=>{page=page}}
      hideFooterPagination={true}
        rows={data}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[3]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
        </div>
        
        </div>
    )

}
