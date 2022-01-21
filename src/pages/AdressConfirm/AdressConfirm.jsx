import React, { useContext } from 'react'

import MapPage from '../../components/Maps/MapPage'

import { Context } from '../../context/ComicsContext';

import history from '../../history'


export default function AdressConfirm() {


    const { endereco, handleEndereco, comicInCart,resetComicInCart } = useContext(Context);

    console.log('CARRINGO',comicInCart)

    function confirmarEnvio(){
        if(window.confirm(`Deseja Confirmar o Envio para o endereço ${endereco}`)){
            resetComicInCart()
            history.push('/')
        }
       
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center  ', width: '60vw', height: '80vh' }}>

            <div style={{ width: '50%', height: '100%' }}>
                <MapPage />
                <div>
                    <h2>Enviar para o endereço: </h2>
                    <h2>{endereco}</h2>
                </div>
                <button
                    onClick={confirmarEnvio}>CONFIRMAR ENVIO</button>
            </div>

        </div>
    )
}