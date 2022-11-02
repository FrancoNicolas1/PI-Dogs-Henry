import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogId } from "../Redux/action";
import { Link, useParams } from "react-router-dom";
import moduleDescription from "../Css/Description.module.css"
import Loading from "../Components/Loading";


export default function Description(){
    const dispatch= useDispatch()
    const idDog=useSelector((state)=>state.dogId)
    const {id} = useParams()
    useEffect(()=>{
        dispatch(getDogId(id))
    },[dispatch])
    // console.log(idDog)
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);
    




    return(
        <div className={moduleDescription.container}>
            {loading? (
            <div>
                <Loading/>
            </div>):(
         
            <div>
            {idDog?.map((e)=> {
                return(
                    <div className={moduleDescription.card} key={e.id}>
                        <h1  className={moduleDescription.title}>{e.name}</h1>
                        <div className={moduleDescription.info}>
                        <img src={e.image} alt="Perrito"/>
                        <div className={moduleDescription.dog}>
                         <h2>Info Raza</h2>   
                        <p>Tiempo de vida : {e.life_span} </p>
                        <p>Temperamento : {e.created ? e.temperaments.map((e)=>e+","): e.temperaments}</p>
                        <p>Su Peso se encuentra entre = {e.weight_min} y {e.weight_max} KG</p>
                        <p>Su Altura se encuentra entre = {e.height_min} y {e.height_max} CM</p>
                        </div>
                        </div>
                    </div>
                )
            })
             }
            </div>   )}
            <div className={moduleDescription.caja}>
            <Link to={"/home"}> <button className={moduleDescription.button}>VOLVER AL INICIO</button></Link>
            </div>        
        </div>
    )
}