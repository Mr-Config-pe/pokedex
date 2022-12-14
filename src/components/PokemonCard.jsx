import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/css/pokemoncard.css'
import { Link } from 'react-router-dom';
import cardbackpoke from '../assets/images/cardback-poke.avif'


const PokemonCard = ({ url }) => {

    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data));
    }, [])

    //Estilos Barra Progreso

    // const styleGrow1 = `--from-width:0%; --to-width:${pokemon.stats?.[1].base_stat}%`


    // console.log(url);

    return (
        <div id='pokemoncard'>
            <div className='container-pokemoncard'>
                <div className="pokemoncard-clip">
                    <div className="pokecard_front">
                        <img className="cardbackpoke" src={cardbackpoke} alt="" />
                    </div>
                    <div className="pokecard_back">
                        <Link to={`/pokedex/${pokemon.id}`}>
                            <div className='cover-link'>



                                {/* Prueba */}


                                <div className="container">

                                    <div className="card">

                                        <div className="pokemon-name"><span>{pokemon.name}</span></div>
                                        <div className="container-cardback">
                                            <img className="pokemon-cardback" src={pokemon.sprites?.other.dream_world.front_default} alt="" />
                                        </div>
                                        {/* <div class="bloc-info">

<div class="pokemon-img"><img src="https://cdn.shopify.com/s/files/1/0252/3362/1040/files/gif_noctali_ce68868f-f3df-41a7-a0a7-f77a4bdc615e_large.gif?v=1577984833" alt="" /></div>

<div class="pokemon-stats">
<div class="pokemon-type"><button><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-mask" viewBox="0 0 16 16">
<path d="M6.225 1.227A7.5 7.5 0 0 1 10.5 8a7.5 7.5 0 0 1-4.275 6.773 7 7 0 1 0 0-13.546zM4.187.966a8 8 0 1 1 7.627 14.069A8 8 0 0 1 4.186.964z" />
</svg> T??n??bres</button></div>
                                                <div class="pokemon-info"><p>"Il vit dans la couche d???ozone, au dessus des nuages. Il est invisible depuis le sol."</p></div>

                                            </div>
                                        </div> */}
                                        <div className="container-progres">
                                            <div className="progress">
                                                <span>Attack : {pokemon.stats?.[1].base_stat}</span>
                                                <div className="progressbar bar-att" style={{ width: `${pokemon.stats?.[1].base_stat}%` }}></div>
                                            </div>

                                            <div className="progress">
                                                <span>Defense : {pokemon.stats?.[2].base_stat}</span>
                                                <div className="progressbar bar-def" style={{ width: `${pokemon.stats?.[2].base_stat}%` }}></div>
                                            </div>

                                            <div className="progress">
                                                <span>Speed : {pokemon.stats?.[5].base_stat}</span>
                                                <div className="progressbar bar-spe" style={{ width: `${pokemon.stats?.[5].base_stat}%` }}></div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                {/* Prueba */}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default PokemonCard;