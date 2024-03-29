import React, {useEffect, useState} from 'react';
import './App.css';
import Loading from './components/Loading/Loading.js';
import {  Routes,Route, useLocation} from "react-router-dom";




import SearchBar from './components/SearchBar/SearchBar.js';
import  Form from './components/From/Form.js';
import Detail from './components/Detail/Detail.js';
import About from './components/About/About.js';


//import axios from 'axios';
import Home from './components/Home/Home.js';





//datos para el dispach
import { useDispatch } from 'react-redux';
import {busquedaAll, genres} from './Redux/actions.js'



function App() {

  const location = useLocation()
  const [access, setAccess] = useState(false);
  //const [busqueda, setBusqueda] = useState([]); No lo estoy utilizando 
  const dispatch = useDispatch(); 
  
  //const busqueda = useSelector(state => state.allVideoGamer); Ya no lo estoy utilizando 

 





  useEffect(() => {
  
    const fetchData = async () => {
      try {
       
                     dispatch(busquedaAll());
                     dispatch(genres());
                     setAccess(true);
                      
                       
                } catch (error) {
        console.error('Error al mostrar Juegos:', error);
      }
    };
    fetchData();
    
  }, [dispatch]);













  
  return (
    <div className="App">
       <div className='container'>
   
        {

         access===true && location.pathname !== '/' 
          ?
          <SearchBar />    
          : null
        }
       
      <Routes>
              <Route path='/' element={<Loading/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/detail/:id' element={<Detail/>}/>
              <Route path='/form' element={<Form/>}/>
              <Route path='/about' element={<About/>}/>

             
      </Routes>
      </div>
    </div>

    

  );
}

export default App;
