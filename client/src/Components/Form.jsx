import React from "react";
import moduleForme from "../Css/Form.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { getAll, postDogs, temperamentsDogs } from "../Redux/action";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
export  default function Form (){
    const temperaments =useSelector((state)=>state.temperaments)
    const dogs =useSelector((state)=>state.allDogs)
    const dispatch = useDispatch()
    const history = useHistory();
    useEffect(()=>{
        dispatch(temperamentsDogs())
        dispatch(getAll())
    },[])
    const [errorForm,setErrorForm]=useState({})
    const [newDog, setNewDog]= useState({
        name:"",
        weight_min:"",
        weight_max:"",
        height_min:"",
        height_max:"",
        life_span:"",
        image:"",
        temperaments:[]
    })

    const handleChange=(e)=>{
        e.preventDefault()
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        })
        setErrorForm(validate({
            ...newDog,
            [e.target.name]:e.target.value
        }))
    }
    const handleChangeTemperaments=(e)=>{
        e.preventDefault()
        setNewDog({
            ...newDog,
            temperaments:[...new Set([...newDog.temperaments,e.target.value])]
        })
    }
    

    const handleDelete=(e)=>{
        e.preventDefault()
        setNewDog({
            ...newDog,
            temperaments: newDog.temperaments.filter(temperament => temperament !== e)
        })
    }
    let reg_exUrl = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
    let reg_exImg = /.*(png|jpg|jpeg|gif)$/;
    const validate =(error)=>{
     
        let errors={}
        
       
        if(!error.name || error.name.length > 10){
            errors.name = "Ingrese nombre, que no superen los 10 caracteres"
        }
        ///////////////////////////////
        if(!error.weight_min ){
            errors.weight_min = "Ingrese datos numericos para el peso"
        }else if(error.weight_min <= 0){
            errors.weight_min = "No se permiten numeros negativos"
        }
        else if (!/^([0-9])*$/.test(error.weight_min)) {
            errors.weight_min = "Solo numeros enteros"
        }else if(error.weight_min > 99){
            errors.weight_min = "No debe superar mas de 99 kg"
        }
        //////////////////////////////
        if(!error.weight_max){
            errors.weight_max = "Ingrese datos numericos para el peso"
        }else if(error.weight_max < 1){
            errors.weight_max = "No se permite numeros negativos"
        }
        else if(!/^([0-9])*$/.test(error.weight_max)){
            errors.weight_max = "Solo numeros enteros"
        }
        else if(error.weight_max > 99){
            errors.weight_max="No debe superar mas de 99 kg"
        }
        //////////////////////////////////
        if(!error.height_min){
            errors. height_min = "Ingrese datos numericos para la altura"
        }else if(error.height_min < 1){
            errors.height_min = "No se permite numeros negativos"
        }
        else if(!/^([0-9])*$/.test(error.height_min)){
            errors.height_min = "Solo numeros enteros"
        }
        else if(error.height_min > 99){
            errors.height_min="No debe superar mas de 99 de altura"
        }

        /////////////////////////
        if(!error.height_max){
            errors.height_max= "Ingrese datos numericos para la altura"
        }else if(error.height_max < 1){
            errors.height_max = "No se permite numeros negativos"
        }
        else if(!/^([0-9])*$/.test(error.height_max)){
            errors.height_max = "Solo numeros enteros"
        }
        else if(error.height_max > 99){
            errors.height_max="No debe superar mas de 99 de altura"
        }
        ///////////////////////////////
     
        ////////////////////////////
        if(!error.image){
            errors.image= "Debe ingresar una imagen"
        }
        if(!reg_exUrl.test(error.image)){
            errors.image="No se detecta una Url"
        }else if(reg_exUrl.test(error.image)){
            if(!reg_exImg.test(error.image)){
                errors.image="Se requiere imagen"
            }
        }
        ////////////////////////////////////
        if(!error.life_span){
            errors.life_span="Debe ingresar un dato"
        }else if(error.life_span < 1){
            errors.life_span = "No se permite numeros negativos"
        }
        else if(!/^([0-9])*$/.test(error.life_span)){
            errors.life_span = "Solo numeros enteros"
        }
        else if(error.life_span > 40){
            errors.life_span="No debe superar mas de 40 años de vida"
        }
///////////////////////////////////////
        if(error.temperaments.length < 1){
            errors.temperaments="debe tener un tempereamneto"
        }

   
        return errors
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
    //    console.log("pepe")
       if (Object.values(errorForm).length > 0) {
        alert("Por favor complete la información requerida");
    }

    else{
        dispatch(postDogs(newDog))
        alert("Raza creada")
        // history.push('/home')
    }
}
    
    return(
        <div className={moduleForme.containerDad}>
            <div  className={moduleForme.container}> 
            <form onSubmit={handleSubmit}>
                <h1>Crear Raza</h1>
{/* /////////////////////////////////////////////////////////////////// */}
                <div className={moduleForme.div}>
                <label>Nombre</label>
                <input 
                type="text"
                name="name"
                value={newDog.name}
                onChange={handleChange}
                />
                {errorForm.name? <h4 className={moduleForme.h4}>{errorForm.name}</h4>:false}
                </div>
{/* ////////////////////////////////////////////////////////////////////// */}
                <div className={moduleForme.div}>
                    <label>Peso Min</label>
                <input 
                type="number"
                value={newDog.weight_min}
                name="weight_min"
                onChange={handleChange}
                />
                {errorForm.weight_min? <h4 className={moduleForme.h4}>{errorForm.weight_min}</h4>:false}
{/* ////////////////////////////////////////////////////////////////////////                 */}
                </div>
                <div className={moduleForme.div}>
                <label>Peso Max</label>
                <input 
                type="number"
                name="weight_max"
                onChange={handleChange}
                />
                {errorForm.weight_max? <h4 className={moduleForme.h4}>{errorForm.weight_max}</h4>:false}
{/* ////////////////////////////////////////////////////////////// */}
                </div>
                <div className={moduleForme.div}>
                <label>Altura Min</label>
                <input 
                type="number"
                name="height_min"
                onChange={handleChange}
                />
                </div>
                {errorForm.height_min ? <h4 className={moduleForme.h4}>{errorForm.height_min}</h4>:false}
{/* ///////////////////////////////////////////////////////////////////////                 */}
                <div className={moduleForme.div}>
                <label>Altura Max</label>
                <input 
                type="number"
                name="height_max"
                onChange={handleChange}
                />
                </div>
                {errorForm.height_max? <h4 className={moduleForme.h4}>{errorForm.height_max}</h4>:false}
{/* /////////////////////////////////////////////////////////////////                 */}
                <div className={moduleForme.div}>
                    <label>Años de vida</label>
                <input 
                type="number"
                name="life_span"
                onChange={handleChange}
                />
                </div>
                {errorForm.life_span? <h4 className={moduleForme.h4}>{errorForm.life_span}</h4>:false}
 {/* ////////////////////////////////////////////////////////////////////  */}

                 <select 
                onChange={handleChangeTemperaments}
                className={moduleForme.option}>
            {temperaments?.map((temperament)=>
                    <option value={temperament.name} key={temperament.id} >{temperament.name}</option>
            )}
            </select>
    
            {newDog.temperaments.map((temperamento) =>
        <div className={moduleForme.cajita}>
            <p>{temperamento}</p>
            <button onClick={()=>handleDelete(temperamento)}>x</button>
        </div>)}


        {errorForm.temperaments? <h4 className={moduleForme.h4}>falta temperamento</h4>:false}

            <div className={moduleForme.div}>
                    <label>Imagen</label>
                <input 
                type="text"
                name="image"
                onChange={handleChange}
                />
            </div>
            {errorForm.image? <h4 className={moduleForme.h4}>{errorForm.image}</h4>:false}
            {reg_exUrl.test(newDog.image) && reg_exImg.test(newDog.image) && 
            <div>
                <img src={newDog.image} width="150px" height="100px"/>
            </div>
           }    


{/* ////////////////////////////////// */}
        
 {/* //////////////////////////////////////////////////////////////            */}
           
 {/* //////////////////////////////////////////            */}
            
            <button  className={moduleForme.select} type="submit" > Crear Raza</button>
            </form>
        
            
        </div>
           
        </div>
        
    )
}