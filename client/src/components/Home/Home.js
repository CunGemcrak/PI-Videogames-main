import React, {useState, useEffect} from "react"
import Cards from "../Cards/Cards.js";
import './Home.css';
import saltomario from '../../img/saltomario.png'
import saltoluigui from '../../img/saltoluigui.png'
import estrella from '../../img/estrella.png'
import derecha from '../../img/derecha.png'
import izquieda from '../../img/izquierda.png'
import cuadrored from '../../img/blocred.png'

import { useSelector,useDispatch } from 'react-redux';
import {fiterCard, CopiaAllVideoGamer} from '../../Redux/actions.js'






const Home =  ()=>{
    //const busqueda= useSelector((state) => state.allVideoGamer)
    const busqueda= useSelector((state) => state.allVideoGamer)
   
    const genres = useSelector((state) => state.genres)
    const dispatch = useDispatch(); 

    // Obtener los valores almacenados del almacenamiento local al cargar la página
const storedStartIndex = parseInt(localStorage.getItem('startIndex')) || 0;
const storedEndIndex = parseInt(localStorage.getItem('endIndex')) || 15;
const storedPage = parseInt(localStorage.getItem('page')) || 1;

    const [startIndex, setStartIndex] = useState(storedStartIndex)
    const [endIndex, setEndIndex] = useState(storedEndIndex)
    const [page, setPage ] = useState(storedPage)
   


    
    useEffect(() => {
        // Guardar los valores de la paginación en el almacenamiento local al cambiar
        localStorage.setItem('startIndex', startIndex);
        localStorage.setItem('endIndex', endIndex);
        localStorage.setItem('page', page);       
    }, [startIndex, endIndex, page]);


const hondleFilter=(event)=>{
    if(event.target.value === "No"){
        
        dispatch(CopiaAllVideoGamer("No"))
    
        
        setStartIndex(0)
        setEndIndex(15)
        setPage(1)
       

       
    }else{
       // alert("entro al event filtrar y selecciono "+ event.target.value)
      
       dispatch(fiterCard(event.target.value));
        setStartIndex(0)
        setEndIndex(15)
        setPage(1)
       
       // Actualiza busqueda utilizando useState
       //setBusqueda(useSelector((state) => state.allVideoGamer));
    }
   
}


const handleNex = ()=>{
    //alert("Siguiente busqueda");

    if(endIndex < busqueda.length ){
        setStartIndex(startIndex + 15);
            setEndIndex(endIndex + 15);
            setPage(page+1)
            
    }else{ 
        setStartIndex(0);
            setEndIndex(15);
            setPage(1)
    }

   
}

const handleback = ()=>{
   // alert("Anterior ");
   const newStartIndex = Math.max(startIndex - 15, 0);
   setStartIndex(newStartIndex);
   setEndIndex(newStartIndex + 15);
   setPage( Math.max(page - 1, 1))
    
}
    
 
    return (
    
            <div className="bodyHome">
                <div className="containerHome">
                <div>
                <div className="ordenar">
              <select className="filtro"   onChange={hondleFilter}>

               
                              <option value="No">Selecciona filtro</option>
                                               {
                     genres.map((element , index)=> (<option key={element.id}  value={element.name}>{element.name}</option>))
                }
              </select>
              <img src={cuadrored} alt="Imagen cuadro" className="imagen-ordenar" />
            </div>
            <br/>
                    <img src={saltomario} alt="salto mario" className="manejoimagenmario"/>
                </div>
                 <div className="containerHomeCard">
              
                 <Cards className="containerHomeCard" startIndex={startIndex} endIndex={endIndex} busqueda={busqueda}/>
                    
                    </div>
                    <div>
              
                    <img src={saltoluigui} alt="salto mario" className="manejoimagenluigui"/>
                </div>   
                </div>  
                <div className="paginas">
                    <div>
                        <img src={izquieda} alt="Anterior" className="anterior" onClick={handleback}/>
                        <img src={estrella} alt="mario" className="estrella"/>
                                <label className="pagelabel">{ page }</label>
                        <img src={estrella} alt="mario" className="estrella"/>
                        <img src={derecha} alt="siguiente" className="siguiente" onClick={handleNex} />
                    </div>


                </div>
            </div>)
}





export default Home