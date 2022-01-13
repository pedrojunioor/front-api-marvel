import React, { useContext, useState } from 'react';
import './Cart.scss'
import { Context } from '../../context/ComicsContext';
import Button from '../../components/Button/Button'
import Modal from 'react-modal';
import AdressConfirm from '../AdressConfirm/AdressConfirm'

export default function Cart() {

    const { comicInCart, handleRemoveCart } = useContext(Context);

    const [isOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function showCart() {
        return comicInCart.map((comic, i) => {
            return <div key={comic.id} className="cart">
                <span>{i + 1}</span>
                <span>{comic.title}</span>
                <span>R$ {comic.prices[0].price}</span>
                <div className="to-aprove">
                    <Button className="button-delete" onClick={() => handleRemoveCart(comic)}>Remove</Button>
                </div>
            </div>
        })
    }

    function getTotalPriceCart() {
        let total = 0
        Object.keys(comicInCart).forEach(item => {
            total += comicInCart[item].prices[0].price
        })

        return total

    }

    return (
        <div>
            <h1>CART</h1>
            {showCart()}
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <label>Valor final: </label>
                    <span>{getTotalPriceCart()}</span>
                </div>
                {comicInCart.length > 0 && <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={openModal}>Finalizar</Button>
                </div>}

            </div>

            <Modal
                isOpen={isOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <AdressConfirm />

            </Modal>
        </div>
    )
}