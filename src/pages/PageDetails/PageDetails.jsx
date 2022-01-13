import React, { useContext } from 'react'


import { Context } from '../../context/ComicsContext';
import MapPage from '../../components/Maps/MapPage'

export default function PageDetails() {

    const { comicSelected } = useContext(Context);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between',width: '80vw', height: '80vh'}}>
            <div>

                {comicSelected && <h1>{comicSelected.data.results[0].title}</h1>}
                {comicSelected && console.log(comicSelected.data.results[0])}
            </div>

            <div style={{width: '50%', height: '100%'}}>
                <MapPage />
            </div>
          
        </div>
    )
}