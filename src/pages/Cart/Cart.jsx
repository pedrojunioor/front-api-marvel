import React,{ useContext} from'react';

import { Context } from '../../context/ComicsContext';

export default function Cart (){

    const { comicInCart,handleRemoveCart} = useContext(Context);

    function showCart() {
        return comicInCart.map((comic,i) => {
            return <div key={comic.title}>
                <span>{i+1}</span>
                <div >
                    <button onClick={()=> handleRemoveCart (comic)}>Remove</button>
                </div>
            </div>
        })
    }

    return (
        <div>
            <h1>CART</h1>
            {showCart()}
        </div>
    )
}