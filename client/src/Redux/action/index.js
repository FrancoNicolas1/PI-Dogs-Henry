export const GET_ALL ="GET_ALL"
export const GET_DOG_ID = "GET_DOG_ID"
export const GET_DOG_NAME = "GET_DOG_NAME"
export const REFRESH_DOGS = "REFRESH_DOGS"
export const ORDER_AZ_ZA = "ORDER_AZ_ZA"
export const ORDER_MIN_MAX = "ORDER_MIN_MAX"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const ORDER_TEMPERAMENTS = "ORDER_TEMPERAMENTS"

export function getAll(){
    return (dispatch)=>{
    fetch("http://localhost:3001/dogs")
    .then(res => res.json())
    .then(json =>{
        dispatch({
            type:GET_ALL,
            payload:json
    })})
}
}

export function getDogId(id){
    return(dispatch)=>{
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(res => res.json())
        .then(json => {
            dispatch({
                type:GET_DOG_ID,
                payload:json
            })
        })
    }
}

export function getDogName(name){
    return(dispatch)=>{
        fetch(`http://localhost:3001/dogs?name=${name}`)
        .then(res => res.json())
        .then(json => {
            dispatch({
                type:GET_DOG_NAME,
                payload:json
            })
        })
    }
}

export function refreshDogs(payload){
    return{
        type:REFRESH_DOGS,
        payload:[]
    }
}

export function orderAzZa(payload){
    return{
        type:ORDER_AZ_ZA,
        payload
    }
}

export function orderWeigthMinMax(payload){
    return{
        type:ORDER_MIN_MAX,
        payload
    }
}

export function temperamentsDogs(){
    return (dispatch)=>{
        fetch("http://localhost:3001/temperaments")
        .then(res => res.json())
        .then(json =>{
            dispatch({
                type:GET_TEMPERAMENTS,
                payload:json
        })})
    }
}
export function orderTemperaments(payload){
    return{
        type:ORDER_TEMPERAMENTS,
        payload
    }
}