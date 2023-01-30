import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { productsLoad, getPage, searchData } from '../redux/actions';
import Search from '../components/Search';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { tableColumns } from '../components/Table';
import dayjs  from 'dayjs' ;
import './Main.scss';



export default function Main () {

const dispatch = useDispatch();
const [data, setData] = useState([]); //переменная для хранения массива данных, которыми можно оперировать внутри компонента, больше не обращаясь к бэку
const columns = tableColumns; //импорт колонок для data-grid



    const products= useSelector(state=>{
        return state.products; //массив данных из стора
    })

    const pageN = useSelector(state=>{
      return state.page; //номер страницы для пагинации
  })

    useEffect(()=>{
        dispatch(productsLoad());//однократно при загрузке страницы кладем массив в стор
        }, [])
    useEffect(() => {
      if (products && products.length) {
        setData(products.map(item=>{
           return(
          {...item,
                start_date: dayjs(item.start_date, "MM-DD-YYYY").format("DD.MM.YYYY"),
                end_date: dayjs(item.end_date, "MM-DD-YYYY").format("DD.MM.YYYY")
        })
      }))
      
      }
    }, [products]) //кладем в стейт измененный массив(меняем формат даты для корректного отображения)

    


    function handleChange(e, page) {
        e.preventDefault();
        dispatch(getPage(page))
    }//меняем страницы для пагинации


    const handleShow = (e)=>{
      dispatch(searchData(e.id-1) )}
//кладем индекс выбранной карточки в стор

    const handleSort = (type) => {//функция сортировки выполняет сравнение в зависимости от типа, раскрывая массив из стейта
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
            const aPartDate=a.start_date.split(".")
            const bPartDate=b.start_date.split(".")
            const aDate= new Date(aPartDate[2], aPartDate[1], aPartDate[0])
            const bDate= new Date(bPartDate[2], bPartDate[1], bPartDate[0])//создаем объект даты для сравнения

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
        if (type === 'dateEnd') {
          
          const sorted = [...data].sort((a,b) => {
            const aPartDate=a.end_date.split(".")
            const bPartDate=b.end_date.split(".")
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


      const onSearch =(value)=>{
        if(!value){
          const parsed = products.map((item)=>({
...item,
start_date: dayjs(item.start_date, "MM-DD-YYYY").format("DD.MM.YYYY"),
end_date: dayjs(item.end_date, "MM-DD-YYYY").format("DD.MM.YYYY")
          }));
          setData(parsed)
        }else{
          const result= products.filter((el)=>el.name.name.toLowerCase().includes(value.toLowerCase()));
setData(result)
        }
        
      } // проверяем на value поискового инпута , если нет - масив из стора кладем в удобном формате в стейт, 
      //если есть - получаем массив элементов подходящих по критериям поиска и кладем в стейт



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
<Search onSearch={onSearch}/>
</div>
</div>

<Box sx={{ height: 300, width: '100%' }}>
<Pagination  onChange={handleChange} count={4} variant="outlined" shape="rounded" />
      <DataGrid
      onCellClick={handleShow}
      page={pageN}
      hideFooter={true}
      rows={data}
      columns={columns}
      pageSize={3}
      rowsPerPageOptions={[3]}
      disableSelectionOnClick
      disableColumnFilter	={true}
      disableColumnMenu	={true}

      experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
        </div>
        
        </div>
    )

}
