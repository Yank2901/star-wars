import { useEffect, useState } from 'react';
import React from "react";
import axios from 'axios';
import ObiWan from '../obi-wan.png'

const FindData = () => {
    const [sections, setSections] = useState([]);
    const [id, setId] = useState('');
    const [errorId, setErrorId] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectData, setSelectData] = useState([]);
    const [isLoadData, setIsLoadData] = useState(false);
    const [error, setError] = useState(false);
    const [homeWorld, setHomeWorld] = useState("");

    useEffect(() => {
        getTypeData();
    }, []);

    const getTypeData = () => {
        axios.get('https://swapi.dev/api/')
            .then(response => {
                const sections = Object.entries(response.data).map(([key, value]) => ({
                    value: value,
                    label: key
                }));
                setSections(sections);
                setSelectedOption(sections[0].value);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handlerId = (event) => {
        const value = event.target.value;
        if (value < 1) {
            event.target.value = '';
            setErrorId("Id invalido");
        } else {
            setId(value);
            setErrorId("");
        }
    };

    const handleChangeOption = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
    };

    const handleSearchData = (event) => {
        event.preventDefault();
        if (id !== "") {
            console.log("Valor seleccionado del select:", selectedOption);
            console.log("Id del campo de texto:", id);
            setIsLoadData(true);
            getDataByURL();
        } else {
            alert("Ingrese un id");
        }
    };

    const getDataByURL = () => {
        axios.get(selectedOption)
            .then(response => {
                const sections = Object.entries(response.data.results[+id - 1]).map(([key, value]) => ({
                    value: value,
                    label: key
                }));
                const homeworldData = sections.find((data) => data.label === "homeworld");
                if (selectedOption === "https://swapi.dev/api/people/" && homeworldData) {
                    const { value } = homeworldData;
                    getHomeWorld(value)
                }
                setSelectData(sections);
                setError(false);
            })
            .catch(err => {
                console.log(err);
                setError(true);
            })
    };

    const getHomeWorld = (homeWorldURL) => {
        axios.get(homeWorldURL)
            .then(response => {
                const data = response.data;
                const firstEntry = Object.entries(data)[0];
                setHomeWorld({ label: firstEntry[0], value: firstEntry[1] });
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div>
            <div className='formFindData'>
                <div className='selector'>
                    <label htmlFor="typeData">Search for:</label>
                    <select name="typeData" id="typeData" onChange={handleChangeOption}>
                        {sections.map((section, index) => (
                            <option key={index} value={section.value}>{section.label}</option>
                        ))}
                    </select>
                </div>
                <div className='inputId'>
                    <div>
                        <label htmlFor="idTextFieldSearch">Id:</label>
                        <input type="number" id="idTextFieldSearch" onBlur={handlerId} />
                        <button onClick={handleSearchData}>Search</button>
                    </div>
                    <p>{errorId}</p>
                </div>
            </div>
            {isLoadData && !error ? (
                <div>
                    {selectData.slice(0, 5).map((data, index) => (
                        <p key={index} className={index === 0 ? 'bold' : ''}>
                            {index === 0 ? null : `${data.label}: `}
                            {data.value}
                        </p>
                    ))}
                    {selectedOption === "https://swapi.dev/api/people/" && (
                        <p key={5}>
                            Home World: {homeWorld.value}
                        </p>
                    )}
                </div>
            ) : null}

            {isLoadData && error ? (
                <div>
                    <p>Estos no son los droides que estás buscando</p>
                    <img src={ObiWan} alt="Obi-Wan Kenobi" />
                </div>
            ) : null}


        </div>
    );
}

export default FindData;
