import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/css/pokemoncard.css'
import { Link } from 'react-router-dom';


const PokemonCard = ({ url }) => {

    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data));
    }, [])

    // console.log(url);

    return (
        <div id='pokemoncard'>
            <div className='container-pokemoncard'>
                <Link to={`/pokedex/${pokemon.id}`}>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.sprites?.front_default} alt="" />
                </Link>
            </div>
        </div>
    );
};

export default PokemonCard;