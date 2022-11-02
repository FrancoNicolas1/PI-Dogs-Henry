import { e } from "mathjs"
import { GET_ALL, GET_DOG_ID, GET_DOG_NAME, REFRESH_DOGS, ORDER_AZ_ZA, ORDER_MIN_MAX, GET_TEMPERAMENTS, ORDER_TEMPERAMENTS, ORDER_CREATE } from "../action"

const initialState={
    allDogs:[],
    dogId:[],
    dogs:[],
    temperaments:[],
    breedsGroup:[],
    bredFor:[]
}

export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_ALL:
            return{
            ...state,
            allDogs:action.payload,
            dogs:action.payload,
            allDogs2:action.payload
            }
        case GET_DOG_ID:
            return{
            ...state,
            dogId:action.payload
            }
        case GET_DOG_NAME:
            return{
            ...state,
            allDogs:action.payload
            }
        case REFRESH_DOGS:
            return{
            ...state,
            allDogs:action.payload
                
            }    
        case ORDER_AZ_ZA:
            
            const sortedArr = action.payload === "a-z"
            ? state.allDogs.sort((a, b) => a.name.localeCompare(b.name)) 
            : state.allDogs.sort((a, b) => b.name.localeCompare(a.name))
            // console.log(sortedArr)
            return {
                ...state,
                allDogs: [...sortedArr]
            }
    
        case ORDER_MIN_MAX:

            let allDogsWeight
            

            if (action.payload === "max"){
                let dogsMax = state.allDogs.sort((a,b)=> {
                    if(a.weight_max> b.weight_max) return -1;
                    if(b.weight_max> a.weight_max) return 1;
                    return 0
                })
            allDogsWeight= dogsMax
            } 
            if (action.payload === "min"){
                let dogsMin = state.allDogs.sort((a,b)=> {
                    if(a.weight_min>b.weight_min)return 1;
                    if(b.weight_min>a.weight_min)return -1;
                    return 0
                })
                allDogsWeight=dogsMin
            }
            // console.log(allDogsWeight)
            return{
                ...state,
                allDogs:[...allDogsWeight]
            }      
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments:action.payload
            }     
        case ORDER_TEMPERAMENTS:
          
            const allDogsTemp = state.dogs;
            const tempFilter = action.payload === "temperament"
            ? allDogsTemp
            : allDogsTemp.filter(t => t.temperaments?.includes(action.payload))
            

            console.log(tempFilter)
            return{
                ...state,
             allDogs:[...tempFilter]
                
            }
        case ORDER_CREATE:
            console.log("llegaste perrito")
            const all3= state.dogs
            const orderDb = action.payload === "db"?
            all3.filter((e)=>e.created)   
            : all3.filter((e) => !e.created )
            console.log(orderDb)
            return{
                ...state,
                allDogs:[...orderDb]
            }     
          


        default: return {...state}    
    }

}