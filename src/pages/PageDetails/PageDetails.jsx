import React, { useContext } from 'react'


import { Context } from '../../context/ComicsContext';
import Button from '../../components/Button/Button'

export default function PageDetails() {

    const { comicSelected, handleAddCart } = useContext(Context);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '80vw', height: '80vh' }}>
            <div>
                {comicSelected && <h1>{comicSelected.data.results[0].title}</h1>}
                {comicSelected && console.log(comicSelected.data.results[0])}
            </div>
            {comicSelected && <Button onClick={e => handleAddCart(comicSelected.data.results[0])}>ADD DO CART</Button>}
        </div>
    )
}