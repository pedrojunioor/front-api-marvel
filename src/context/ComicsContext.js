import React, { createContext, useState,useEffect } from 'react';
import api from '../config/api'

const Context = createContext();

function ComicsProvider({ children }) {

    const [comics, setComics] = useState(undefined)
    const [comicSelected,setComicSelected] = useState(undefined)
    const [limit, setLimit] = useState(10)
    const [virtualPage,setVirtualPage] = useState(((0-1) * limit) <= 0 ? 0 : ((0-1) * limit))
    

    let API_TS = process.env.REACT_APP_API_TS
    let API_KEY = process.env.REACT_APP_API_KEY
    let API_HASH = process.env.REACT_APP_API_HASH

    useEffect(() =>{
        if(comics === undefined){
            getComicsPaged(0)
        }
        
    },[comics])

    useEffect(() =>{
        getComicsPaged()
    },[limit,virtualPage])

    function getComicsPaged(){
        api.get(`comics?limit=${limit}&offset=${virtualPage}&ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`).then(result =>{
            setComics(result.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    function handleLimit(delta){
        setLimit(delta)
    }
    function handleVirtualPage(delta){
        setVirtualPage(delta)
    }

    function handleJoinComic(event, idComic) {
        event.preventDefault();

        api.get(`comics/${idComic}?ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`).then(result => {
            setComicSelected(result.data)
        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <Context.Provider value={{ comics, comicSelected, handleJoinComic, getComicsPaged, limit, handleLimit, setLimit, virtualPage, handleVirtualPage}}>
            {children}
        </Context.Provider>
    );
}

export { Context, ComicsProvider };
