//import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import './SearchBar.css'
import logo from '../../img/524_supermario.png';




const SearchBar = ({data}) =>{


  




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
                <input type="text" name="search"  className="ingresoinput"/>
            </div>
            <button className="botonebusqueda">Buscar</button>
            </div>
           

    </div>)
}


export default (SearchBar)