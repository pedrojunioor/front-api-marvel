import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Context } from '../context/ComicsContext';
import Card from '../components/Card/Card'
import Modal from 'react-modal';


function Home() {

    const { comics, comicSelected, handleJoinComic } = useContext(Context);

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
            return <Card key={i} titulo={item[1].title}>
                <span>{item[1].id}</span>
                <button onClick={e => handleJoinComic(e, item[1].id)}>Detalhes</button>
            </Card>
        })
    }

    return (
        <div className="Home">
            <div className="Layout">
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
                    {comicSelected &&  <h1>{comicSelected.data.results[0].title}</h1>}
                </Card>
            </Modal>

        </div>
    );
}


export default Home
