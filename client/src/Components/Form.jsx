import React from "react";
import moduleForme from "../Css/Form.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { temperamentsDogs } from "../Redux/action";
export  default function Form (){
    const temperaments =useSelector((state)=>state.temperaments)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(temperamentsDogs())
    },[])
    return(
        <div className={moduleForme.containerDad}>
            <div  className={moduleForme.container}>
         
            <form>
                <h1>Crear Raza</h1>
                <div className={moduleForme.div}>
                    <label>Nombre</label>
                <input type="text"/>
                </div>
                <div className={moduleForme.div}>
                    <label>Altura Max</label>
                <input type="text"/>
                </div>
                <div className={moduleForme.div}>
                    <label>Altura Min</label>
                <input type="text"/>
                </div>
                <div className={moduleForme.div}>
                    <label>Peso Min</label>
                <input type="text"/>
                </div>
                <div className={moduleForme.div}>
                    <label>Peso Max</label>
                <input type="text"/>
                </div>
                <div className={moduleForme.div}>
                    <label>Años de vida</label>
                <input type="text"/>
                </div>
                <select className={moduleForme.option}>
            {temperaments?.map((temperament)=>{
                return(
                    <option>{temperament.name}</option>
                )
            })}
            </select>
            <div className={moduleForme.div}>
                    <label>Imagen</label>
                <input type="text"/>
                </div>
            </form>
            <button className={moduleForme.select}> Crear Raza</button>
            </div>
            
        </div>
        
    )
}