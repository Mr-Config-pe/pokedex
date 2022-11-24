import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundPoke from '../assets/images/pokemon-front-card.avif'
import '../assets/css/pokemonid.css'


const PokemonId = () => {

    const [pokemon, setPokemon] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => setPokemon(res.data));
    }, [])

    //Redirigiendo a Pagina Principal

    const navigate = useNavigate();

    const goToHome = (()=>{
        navigate("../pokedex")

    })

    // console.log(pokemon)
    return (
        <div id='pokemonid'>
            <figure className="figure1-id">
            
                <img className="background-poke" src={backgroundPoke} alt="" />
                <img className="pokemon-img" src={pokemon.sprites?.other.home.front_default} alt="" />
                <img className="background-gif" src="https://assets.codepen.io/13471/sparkles.gif" alt="" />
                <h3>{pokemon.name}</h3>
                <div className='hp-poke'><b className='hp-letter'>HP</b><b className='hp-stat'> {pokemon.stats?.[0].base_stat}</b></div>
                <div className="xp-poke"><b className='xp-letter'>XP</b><b className='xp-base'> {pokemon.base_experience}</b></div>
                <div className="ability-poke">
                    <b>{pokemon.abilities?.[0]?.ability.name}</b>
                    <b>{pokemon.abilities?.[1]?.ability.name}</b>
                    <b>{pokemon.abilities?.[2]?.ability.name}</b>
                </div>
                <div className="we-hi-exp">
                    <b><b>Weight</b>: {pokemon.weight}<b>kg </b></b>
                    <b><b>Height</b>: {pokemon.height}<b>m</b></b>
                </div>
                <div className="type-poke">
                    <b>{pokemon.types?.[0]?.type.name}</b>
                    <b>{pokemon.types?.[1]?.type.name}</b>
                </div>
                <button onClick={goToHome}>Home</button>
            </figure>
            
        </div>
    );
};

export default PokemonId;