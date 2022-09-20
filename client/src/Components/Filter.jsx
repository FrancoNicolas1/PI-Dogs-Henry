import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderAzZa, orderWeigthMinMax, temperamentsDogs, orderTemperaments } from "../Redux/action";
import moduleFilter from "../Css/Filter.module.css"
export default function Filter ({setCurrentPage}){
    const dispatch = useDispatch()
    const temperaments = useSelector((state)=>state.temperaments)
    useEffect(()=>{
        dispatch(temperamentsDogs())
    },[])
    // console.log(temperaments)

    const handleChangeAlfabetic=(e)=>{
        e.preventDefault()
        dispatch(orderAzZa(e.target.value))
        setCurrentPage(1)
    }

    const handleChangeWeigth=(e)=>{
        e.preventDefault()
        dispatch(orderWeigthMinMax(e.target.value))
        setCurrentPage(1)
    }
    const handleTemperaments=(e)=>{
        e.preventDefault()
        dispatch(orderTemperaments(e.target.value))
        setCurrentPage(1)
    }

    return(
        <div className={moduleFilter.container}>
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