import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderAzZa, orderWeigthMinMax, temperamentsDogs, orderTemperaments, orderDb, getAll, orderBreeds, getBredFor, } from "../Redux/action";
import moduleFilter from "../Css/Filter.module.css"



export default function Filter ({setCurrentPage}){
    const dispatch = useDispatch()
    const temperaments = useSelector((state)=>state.temperaments)
   
    useEffect(()=>{
        dispatch(temperamentsDogs()) 
    },[])
    
// console.log(pepe)
   
   // console.log(temperaments)

    const handleChangeAlfabetic=(e)=>{
  
        dispatch(orderAzZa(e.target.value))
        setCurrentPage(1)
       
    }

    const handleChangeWeigth=(e)=>{
     
        dispatch(orderWeigthMinMax(e.target.value))
        setCurrentPage(1)
    
    }
    const handleTemperaments=(e)=>{
        dispatch(orderTemperaments(e.target.value))
        setCurrentPage(1)
        
    }

    const handleDb=(e)=>{
  
        dispatch(orderDb(e.target.value))
        setCurrentPage(1)
      
    }

    return(
        <div className={moduleFilter.container}>
         <div>
            <select className={moduleFilter.select} onChange={handleDb}>
                <option selected disabled hidden>Ordenar DB</option>
                <option value={"api"}>Api</option>
                <option value={"db"}>DB</option>
            </select>
         </div>  
         <div>
            <select className={moduleFilter.select} onChange={handleChangeAlfabetic}>
                <option selected disabled hidden>Ordenar Alfabeticamente</option>
                <option value={"a-z"}>A-Z</option>
                <option value={"z-a"}>Z-A</option>
            </select>
         </div>  
         
         <div> 
            <select className={moduleFilter.select} onChange={handleChangeWeigth}>
                <option selected disabled hidden>Ordenar Por Min-Max</option>
               
                <option value={"min"}>Peso Min</option>
                <option value={"max"}>Peso Max</option>
            </select>
         </div>  
         <div>
            <select className={moduleFilter.select} onChange={handleTemperaments}>
                <option selected disabled hidden>Ordenar Por Temperamento</option>
                <option value={"temperament"}>Todos</option>

                {temperaments?.map((temperament)=>{
                    return(
                        <option key={temperament.id} value={temperament.name}>{temperament.name}</option>
                    )
                })

                }
            </select>
            </div> 
        </div>
    )
}