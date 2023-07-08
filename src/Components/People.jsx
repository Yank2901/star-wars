import { useEffect, useState } from 'react';
import React from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ObiWan from '../obi-wan.png'

const People = () => {
    const [selectData, setSelectData] = useState([]);
    const [error, setError] = useState(false);

    // Se obtiene el parámetro del path
    let { id } = useParams();

    useEffect(() => {
        getDataByURL();
    }, []);

    const getDataByURL = () => {
        axios.get('https://swapi.dev/api/people')
        .then(response=>{
            const sections = Object.entries(response.data.results[+id-1]).slice(0, 5).map(([key, value]) => ({
                value: value,
                label: key
            }));
            setSelectData(sections);
            console.log(sections);
        })
        .catch (err => {
          console.log(err);
          setError(true);
        })
    };

    return (
        <div>
            {error ? (
                <div>
                    <p>Estos no son los droides que estás buscando</p>
                    <img src={ObiWan} alt="Obi-Wan Kenobi" />
                </div>
            ) : (
                <div>
                    {selectData.map((data, index) => (
                        <p key={index} className={index === 0 ? 'bold' : ''}>
                            {index === 0 ? null : `${data.label}: `}
                            {data.value}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default People;
