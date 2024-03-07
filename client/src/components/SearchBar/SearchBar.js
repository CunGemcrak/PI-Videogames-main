import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './SearchBar.css'
import logo from '../../img/524_supermario.png';


import { busquedaIndividual,CopiaAllVideoGamer } from '../../Redux/actions.js'


import { useDispatch } from 'react-redux';



const SearchBar = () =>{
//  const [userData, setUserData]=useState({search:''});
const [searchValue, setSearchValue] = useState('');

const dispatch = useDispatch(); 






useEffect(() => {
  if (searchValue.trim() === '' || !searchValue) {
    dispatch(CopiaAllVideoGamer())
  } else {
    dispatch(busquedaIndividual(searchValue))
  
  }
}, [searchValue, dispatch]);







const hondlebusqueda = (event) =>{
/*  setUserData({
    ...userData,
    [event.target.name]:event.target.value
})

  if(userData.search.trim()==='' || !userData.search){
   dispatch(CopiaAllVideoGamer())
  }else{
  dispatch(busquedaIndividual(userData.search))
  }*/

  setSearchValue(event.target.value);

}
  




    return(<div className="containersear">
            
            <img className="logo" src={logo} alt="mario bros"/>

            <div className="accesos"> 
            
                                <Link to='/home'>
                                <button className="botones">Home</button>
                                </Link>
                               
                                <Link to='/Form'>
                                  <button className="botones">Form</button>
                                </Link>
                                <Link to='/About'>
                                <button className="botones">About</button>
                                </Link>

                               
                               

                                

                                                     
            </div>
            <div className="contenedor_busquda">
            <button className="botonealeatorio" >Aleatorio</button>
            <div className="ingreso">
                <input 
                  type="text" 
                  name="search"  
                  value={searchValue}
                  onChange={hondlebusqueda}
                  className="ingresoinput"/>
            </div>
            <button className="botonebusqueda" onClick={hondlebusqueda}>Buscar</button>
            </div>

            
           

    </div>)
}


export default (SearchBar)