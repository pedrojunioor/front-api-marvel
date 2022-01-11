import React, { createContext, useState,useEffect } from 'react';
import api from '../config/api'

const Context = createContext();

function ComicsProvider({ children }) {

    const [comics, setComics] = useState(undefined)
    const [comicSelected,setComicSelected] = useState(undefined)

    let API_TS = process.env.REACT_APP_API_TS
    let API_KEY = process.env.REACT_APP_API_KEY
    let API_HASH = process.env.REACT_APP_API_HASH

    useEffect(() =>{
        if(comics === undefined){
            getInitial()
            console.log(comics)
        }
    },[comics])

    function getInitial() {
        api.get(`comics?ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`).then(result => {
            setComics(result.data)
        }).catch(error => {
            console.log(error);
        })
    }

    async function handleJoinComic(event, idComic) {
        event.preventDefault();

        api.get(`comics/${idComic}?ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`).then(result => {
            setComicSelected(result.data)
        }).catch(error => {
            console.log(error);
        })

    }



    return (
        <Context.Provider value={{ comics, comicSelected,getInitial, handleJoinComic }}>
            {children}
        </Context.Provider>
    );
}

export { Context, ComicsProvider };
