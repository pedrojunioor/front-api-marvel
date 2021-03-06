import React, { useContext, useEffect, useState } from 'react'
import './Home.scss'
import { Context } from '../../context/ComicsContext';


import Card from '../../components/Card/Card'
import Modal from 'react-modal';
import PageDetails from '../PageDetails/PageDetails'
import Button from '../../components/Button/Button'

function Home() {

    const { virtualPage,
        comics,
        limit,
        handleLimit,
        comicSelected,
        handleJoinComic,
        handleVirtualPagePreview,
        handleVirtualPageNext,
        resetComicSelected,
        handleAddCart,
        qtdPages } = useContext(Context);

    const [isOpen, setIsOpen] = useState(false);
    let subtitle;

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
        resetComicSelected()
        setIsOpen(false);

    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    useEffect(() => {
        if (comicSelected !== undefined) {
            openModal()
        }
        else {
            closeModal();
        }
    }, [comicSelected])


    function showComics() {
        return Object.entries(comics.data.results).map((item, i) => {
            return <div key={i} className="comic">
                <Card >
                    <img src={`${item[1].thumbnail.path}.${item[1].thumbnail.extension}`} alt="AAA" />
                </Card>
                <div className="button-details">
                    <Button onClick={e => handleJoinComic(e, item[1].id)}>{item[1].title}</Button>
                </div>
                <div className="button-details">
                    <Button onClick={e => handleAddCart(item[1])}>ADD DO CART</Button>
                </div>
            </div>
        })
    }

    return (
        <div className="Home">
            <div className="layout">
                {comics && showComics()}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    {virtualPage > 0 && <button onClick={handleVirtualPagePreview}> &lt;  </button>}
                                        <h3> Pagina Atual: {virtualPage + 1} </h3>
                     {virtualPage < qtdPages && <button onClick={handleVirtualPageNext}> &gt;  </button>}                     
                </div>
                <div className="input-select">
                    <h3>Item por pagina</h3>
                    <select value={limit} onChange={e => handleLimit(+e.target.value)}>
                        <option value={4}>4</option>
                        <option value={8}>8</option>
                        <option value={12}>12</option>
                        <option value={16}>16</option>
                    </select>
                </div>

            </div>



            <Modal
                isOpen={isOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                {comicSelected && 
                <PageDetails />}

            </Modal>

        </div>
    );
}


export default Home
