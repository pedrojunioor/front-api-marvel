import React, { useContext, useEffect, useState } from 'react'
import './Home.scss'
import { Context } from '../context/ComicsContext';
import Card from '../components/Card/Card'
import Modal from 'react-modal';


function Home() {

    const { virtualPage, handleVirtualPage, comics, limit, handleLimitUp, handleLimitDown, comicSelected, handleJoinComic } = useContext(Context);

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
                    <button onClick={e => handleJoinComic(e, item[1].id)}>{item[1].title}</button>
                </div>
            </div>
        })
    }

    return (
        <div className="Home">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <label>Item por pagina: {limit + 1} </label>
                <button onClick={e => handleLimitUp()}>UP</button>
                <button onClick={e => handleLimitDown()}>DOWN </button>
                <label>Pagina Atual: </label>
                <input type="number" onChange={e => handleVirtualPage(+e.target.value)} value={virtualPage} />
            </div>

            <div className="layout">
                {comics && showComics()}
            </div>

            <Modal
                isOpen={isOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Card>
                    {comicSelected && <h1>{comicSelected.data.results[0].title}</h1>}
                    {comicSelected && console.log(comicSelected.data.results[0])}
                </Card>
            </Modal>

        </div>
    );
}


export default Home
