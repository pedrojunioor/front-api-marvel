import React, { createContext, useState, useEffect } from 'react';
import api from '../config/api'

const Context = createContext();

function ComicsProvider({ children }) {

    const [comics, setComics] = useState(undefined)
    const [search, setSearch] = useState('')
    const [comicSelected, setComicSelected] = useState(undefined)
    const [comicInCart, setComicInCart] = useState([])
    const [limit, setLimit] = useState(8)
    const [virtualPage, setVirtualPage] = useState(((0 - 1) * limit) <= 0 ? 0 : ((0 - 1) * limit))
    const [qtdPages,setQtdPages] = useState(undefined)
    const [endereco,setEndereco] = useState('')

    let API_TS = process.env.REACT_APP_API_TS
    let API_KEY = process.env.REACT_APP_API_KEY
    let API_HASH = process.env.REACT_APP_API_HASH

    useEffect(() => {
        if (comics === undefined) {
            getComicsPaged(0)
        }
    }, [comics])

    useEffect(() => {
        getComicsPagedwithFilter()
    }, [limit, virtualPage])

    useEffect(() => {
        if(comics !== undefined) {
            setQtdPages(Math.floor(comics.data.total/comics.data.limit))
            console.log(Math.floor(comics.data.total/comics.data.limit))
        }
    },[comics])



    function getComicsPaged() {
        api.get(`comics?limit=${limit}&offset=${virtualPage}&ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`).then(result => {
            setComics(result.data)
        }).catch(error => {
            console.log(error)
        })
    }

    function getComicsPagedwithFilter() {
        if (search !== '') {
            api.get(`comics?titleStartsWith=${search}&limit=${limit}&offset=${virtualPage}&ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`).then(result => {
                setComics(result.data)
            }).catch(error => {
                console.log(error)
            })
        }else{
            getComicsPaged()
        }
    }

    function handleSearch(delta) {
        setSearch(delta)
    }
    function handleEndereco(delta) {
        setEndereco(delta)
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
        if(virtualPage < qtdPages){
        setVirtualPage(virtualPage + 1)
        }
    }
    function handleVirtualPagePreview() {
        if (virtualPage > 0) {
            setVirtualPage(virtualPage - 1)
        }
    }

    function resetComicSelected() {
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
            console.log('add', comic.id)
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
        if(window.confirm('Deseja mesmo excluir esta comic do carrinho?')){
            let carrinho = comicInCart.filter((item) => item.id !== comic.id);
            setComicInCart(carrinho)
            alert('removida com sucesso')
        }
    }

    function resetComicInCart(){
        setComicInCart([])
    }



    return (
        <Context.Provider value={{
            comics,
            comicSelected,
            comicInCart,
            limit,
            virtualPage,
            search,
            endereco,
            handleEndereco,
            handleSearch,
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
            resetComicSelected,
            getComicsPagedwithFilter,
            qtdPages,
            resetComicInCart

        }}>
            {children}
        </Context.Provider>
    );
}

export { Context, ComicsProvider };
