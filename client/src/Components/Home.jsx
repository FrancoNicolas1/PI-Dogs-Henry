import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getAll, refreshDogs } from "../Redux/action";
import Card from "./Card";
import Filter from "./Filter";
import Navbar from "./Navbar";
import Paginado from "./Paginado";
import moduleHome from "../Css/Home.module.css"
import { Link } from "react-router-dom";
import { e } from "mathjs";
import Loading from "./Loading";


export default function Home (){
    const dispatch= useDispatch()
    const dogs =useSelector((state)=>state.allDogs)
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage]=useState(1)//pagina actual
    const [dogsForPage, setDogPage]= useState(8)//dogs por pagina
    const indexOfLastDog = currentPage * dogsForPage // 8
    const indexOfFirtsDog = indexOfLastDog - dogsForPage//0
    const currentDogs = dogs.slice(indexOfFirtsDog,indexOfLastDog)// 0-8....9-16
    // if(dogs.length === 0 ) <h1>NO HAY PERROS</h1
  


    const pag = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }


    useEffect(()=>{
        setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
        dispatch(getAll())
       
    },[])
   
    const handleChange=(e)=>{
        e.preventDefault()
        dispatch(refreshDogs())
        dispatch(getAll())
    }
   
    
    return(
        <div className={moduleHome.container}>
             {loading? (
            <div>
                <Loading/>
            </div>):(<div>
            <div className={moduleHome.header}>
                <button className={moduleHome.button} onClick={handleChange}>Refresh</button>
                <Navbar/>
               <Link to={"/form"}> <button className={moduleHome.button}>Create</button></Link>
            </div>
            <Filter setCurrentPage={setCurrentPage}  />
            <Paginado dogsForPage={dogsForPage} dogs={dogs.length} pag={pag} currentPage={currentPage} />
            <div className={moduleHome.cards}>
            {currentDogs?.map((dog)=>{
                return(
                    <div key={dog.id}>
                     <Card 
                     id={dog.id}
                     name={dog.name}
                     img={dog.image}
                     temperament={dog.created ? dog.temperaments.map((e)=>e+","): dog.temperaments}
                     weight_max={dog.weight_max}
                     weight_min={dog.weight_min}
                     />  
                    </div>
                )
            })}
            </div>
            </div>)}

        </div>
    )
}