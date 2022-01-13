import React, { createContext, useState, useEffect } from 'react';
import api from '../config/api'

const Context = createContext();

function ComicsProvider({ children }) {

    const [comics, setComics] = useState(undefined)
    const [comicSelected, setComicSelected] = useState(undefined)
    const [comicInCart, setComicInCart] = useState([])
    const [limit, setLimit] = useState(8)
    const [virtualPage, setVirtualPage] = useState(((0 - 1) * limit) <= 0 ? 0 : ((0 - 1) * limit))

    let API_TS = process.env.REACT_APP_API_TS
    let API_KEY = process.env.REACT_APP_API_KEY
    let API_HASH = process.env.REACT_APP_API_HASH

    useEffect(() => {
        if (comics === undefined) {
            getComicsPaged(0)
        }
    }, [comics])

    useEffect(() => {
        getComicsPaged()
    }, [limit, virtualPage])

    useEffect(() => {
        console.log('CARRINHO', comicInCart)
    }, [comicInCart])

    function getComicsPaged() {
        api.get(`comics?limit=${limit}&offset=${virtualPage}&ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`).then(result => {
            setComics(result.data)
        }).catch(error => {
            console.log(error)
        })
    }

    function handleLimit(delta) {
        setLimit(delta)
    }
    function handleLimitUp() {
        setLimit(limit + 1)
    }
    function handleLimitDown() {
        setLimit(limit - 1)
    }
    function handleVirtualPage(delta) {
        setVirtualPage(delta)
    }
    function handleVirtualPageNext() {
        // if(virtualPage < ){
        setVirtualPage(virtualPage + 1)
        // }
    }
    function handleVirtualPagePreview() {
        if (virtualPage > 0) {
            setVirtualPage(virtualPage - 1)
        }
    }

    function resetComicSelected(){
        setComicSelected(undefined)
    }
    function handleJoinComic(event, idComic) {
        event.preventDefault();
        api.get(`comics/${idComic}?ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`).then(result => {
            setComicSelected(result.data)
        }).catch(error => {
            console.log(error);
        })

    }

    function handleAddCart(comic) {
        if (comic !== undefined) {
            console.log('add',comic.id)
            let carrinho = comicInCart
            const add = carrinho.some((item) => item.id === comic.id)
            if (add === false) {
                carrinho.push(comic)
                alert('comic adicionada ao carrinho')
            }
            else {
                alert('Nao foi possivel adicionar')
            }
            setComicInCart(carrinho)
        }
    }

    function handleRemoveCart(comic) {
        let carrinho = comicInCart.filter((item) => item.id !== comic.id);
        setComicInCart(carrinho)
        alert('removida com sucesso')
    }

    return (
        <Context.Provider value={{
            comics,
            comicSelected,
            comicInCart,
            limit,
            virtualPage,
            handleJoinComic,
            getComicsPaged,
            handleLimit,
            setLimit,
            handleVirtualPage,
            handleLimitUp,
            handleLimitDown,
            handleVirtualPagePreview,
            handleVirtualPageNext,
            handleAddCart,
            handleRemoveCart,
            resetComicSelected

        }}>
            {children}
        </Context.Provider>
    );
}

export { Context, ComicsProvider };
