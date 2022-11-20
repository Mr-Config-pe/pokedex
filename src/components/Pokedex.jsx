import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import '../assets/css/pokedex.css'
import { useNavigate } from 'react-router-dom';

const Pokedex = () => {

    const userName = useSelector(state => state.name);

    const [pokemon, setPokemon] = useState([]);

    const [inputSearch, setInputSearch] = useState("")

    const [typePoke, setTypePoke] = useState([]);

    // Inicio Paginacion

    const [page, setPage] = useState(1);
    const pokemonsPerPage = 5;
    const lastIndex = page * pokemonsPerPage;
    const firstIndex = lastIndex - pokemonsPerPage;
    const pokemonPagination = pokemon.slice(firstIndex, lastIndex);
    const totalPage = Math.ceil(pokemon.length / pokemonsPerPage);

    // Division de Paginacion

    const [totalinit, setTotalInit] = useState(1);
    const [totalPage2, setTotalPage2] = useState(10);
 
    const numberPagination = []
    for (let i = totalinit; i <= totalPage2; i++) {
        numberPagination.push(i)
    }

    let nextPage10 = (() => {
        setTotalInit(totalinit + 1)
        setTotalPage2(totalPage2 + 1)
        setPage(page + 1)
       
    })

    let previewPagex1 = (()=>{
        setTotalInit(totalinit - 1)
        setTotalPage2(totalPage2 - 1)
        setPage(page - 1)
       
    })

    //Fin Paginacion

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=200') //Max : 1154
            .then(res => setPokemon(res.data.results))

        axios.get('https://pokeapi.co/api/v2/type')
            .then(res => setTypePoke(res.data.results))


    }, [])

    // console.log(numberPagination)

    const navigate = useNavigate();

    //Funcion de Filtrado de Pokemones

    const searchPokemon = (() => {

        const pokeIndex = pokemon.findIndex(searchIndex => searchIndex.name === inputSearch)

        if (inputSearch > 0 && inputSearch <= pokemon.length) {
            navigate(`/pokedex/${inputSearch.toLocaleLowerCase()}`)
        } else if (pokeIndex >= 0) {
            navigate(`/pokedex/${inputSearch.toLocaleLowerCase()}`)
        } else {
            alert("Pokemon not found")
        }

    })

    //Funcion para filtrar los tipos

    const filterType = ((e) => {
        const url = e.target.value;
        axios.get(url)
            .then(res => setPokemon(res.data.pokemon));

    })

    // console.log(pokemonSelect)
    // console.log(pokemon)
    return (
        <div id='pokedex'>
            <h1 className='pokedex-name'>Bienvenido {userName} a Pokedex</h1>
            <div className="container-searchPokemon">
                <input
                    type="text"
                    placeholder='Search Pokemon'
                    onChange={(e => setInputSearch(e.target.value))}
                    value={inputSearch} />
                <button onClick={searchPokemon}>Search</button>

                <select onChange={filterType} name="" id="">
                    {typePoke.map(search => (
                        <option
                            key={search.url}
                            value={search.url}>
                            {search.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={page > 10 ?  previewPagex1 : () => setPage(page - 1)} disabled={page === 1}>Prev Page</button>
                {numberPagination.map(number => (
                    <button key={number} onClick={() => setPage(number)}>{number}</button>
                ))}
                <button onClick={ page < 10 ? () => setPage(page + 1) : nextPage10 } disabled={page === totalPage}>Nex Page</button>
            </div>
            <div className="container-pokedex">
                {
                    pokemonPagination.map(search => (
                        <PokemonCard
                            url={search.url || search.pokemon.url}
                            key={search.url || search.pokemon.url} />
                    ))
                }
            </div>
        </div>
    );
};

export default Pokedex;