import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonId = () => {

    const [pokemon, setPokemon] = useState({});
    const {id} = useParams();

    useEffect(()=> {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => setPokemon(res.data));
    }, [])

    return (
        <div>
            <h1>Pokemon ID</h1>
            {pokemon.name}
        </div>
    );
};

export default PokemonId;