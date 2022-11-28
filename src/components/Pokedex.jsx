import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import '../assets/css/pokedex.css'
import { useNavigate } from 'react-router-dom';
import welcomeTrainer from '../assets/images/welcome-trainer.avif'

const Pokedex = () => {

    const userName = useSelector(state => state.name);

    const [pokemon, setPokemon] = useState([]);

    const [inputSearch, setInputSearch] = useState("")

    const [typePoke, setTypePoke] = useState([]);

    //Estado para Buscar Letra

    const [searchLetterPoke, setSearchLetterPoke] = useState([]);


    // Inicio Paginacion

    const [page, setPage] = useState(1);
    const pokemonsPerPage = 10;
    const lastIndex = page * pokemonsPerPage;
    const firstIndex = lastIndex - pokemonsPerPage;
    const pokemonPagination = pokemon.slice(firstIndex, lastIndex);
    const totalPage = Math.ceil(pokemon.length / pokemonsPerPage);

    // Division de Paginacion

    const [totalinit, setTotalInit] = useState(1);
    const [totalPage2, setTotalPage2] = useState(5);
    const [totalPage3, setTotalPage3] = useState(0);

    const numberPagination = []
    for (let i = totalinit; i <= totalPage2; i++) {
        numberPagination.push(i)
    }

    let nextPagex1 = (() => {

        if (totalPage2 - totalinit <= 5 && totalPage2 < totalPage) {
            setTotalInit(totalinit + 1)
            setTotalPage2(totalPage2 + 1)
            console.log(totalPage2)
            console.log(totalinit)
            setPage(page + 1)
        } else {

            setPage(page + 1)

        }


    })

    let previewPagex1 = (() => {

        if (totalPage2 - totalinit <= 5) {
            setTotalInit(totalinit - 1)
            setTotalPage2(totalPage2 - 1)
            setPage(page - 1)
            // variablex.push(page)
            setTotalInit(page - 5)
            setTotalPage2(page - 1)
            console.log(totalinit)
            console.log(totalPage2)
            console.log(page)
        } else {
            alert("Any Problem")
        }

    })

    let reviewPagex2 = (() => {

        if (page > 1) {

            setTotalInit(1)
            setTotalPage2(5)
            setPage(page - 1)
            console.log(page)

        } else {

            setTotalInit(1)
            setTotalPage2(5)

        }


        // () => setPage(page - 1)

    })

    //Fin Paginacion

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000') //Max : 1154
            .then(res => setPokemon(res.data.results))

        axios.get('https://pokeapi.co/api/v2/type')
            .then(res => setTypePoke(res.data.results))


    }, [])

    // console.log(numberPagination)

    const navigate = useNavigate();

    //Funcion para buscar pokemones

    const searchPokemon = (() => {

        // const pokemonFilter = pokemon.filter(item => {

        //     if (item?.name === inputSearch) {
        //         return item.name
        //     } else if (item.pokemon?.name === inputSearch) {
        //         return item.pokemon.name
        //     }
        // })


        // if (pokemonFilter[0]?.name === inputSearch) {

        //     navigate(`/pokedex/${inputSearch.toLocaleLowerCase()}`)

        // } else if (pokemonFilter[0]?.pokemon.name === inputSearch) {

        //     navigate(`/pokedex/${inputSearch.toLocaleLowerCase()}`)

        // } else {

        //     console.log("Pokemon not found")
        // }

        const pokemonFilter = pokemon.findIndex(item => {

            if (item?.name === inputSearch) {
                return item
            } else if (item.pokemon?.name === inputSearch) {
                return item
            }
        })

        // console.log(pokemonFilter)

        if (inputSearch > 0 && inputSearch <= 1154) {

            navigate(`/pokedex/${inputSearch.toLocaleLowerCase()}`)

        } else if (pokemonFilter >= 0 && pokemonFilter < 1154) {

            navigate(`/pokedex/${inputSearch.toLocaleLowerCase()}`)

        } else {

            alert("Pokemon not found")
        }



        // console.log(pokemon)
        //Falta Filtrar
    })


    //Funcion para filtrar los tipos

    const filterType = ((e) => {

        const url = e.target.value;
        axios.get(url)
            .then(res => setPokemon(res.data.pokemon));
        setPage(1)
        setTotalInit(1)
        setTotalPage2(5)

    })

    //Url Video Header

    const urlHeader = "https://bit.ly/3Vnyj4d";
    const urlImgHeader = "http://bit.ly/3V3OEvn";

    // console.log(pokemonSelect)
    // console.log(pokemon)
    return (
        <div id='pokedex'>
            <div className="video-header">
                <div className="container-welcome-trainer">
                    <img src={welcomeTrainer} alt="" className="welcome-trainer" />
                    <h1 className='pokedex-name'>{userName}</h1>
                </div>
                <video src={urlHeader} autoPlay muted loop poster={urlImgHeader} className='video-intro'></video>
            </div>

            <main>
                <div className="container-searchPokemon">
                    <div>
                        <input
                            type="text"
                            placeholder='Search Pokemon'
                            onChange={(e => setInputSearch(e.target.value))}
                            value={inputSearch}
                        />
                        <button onClick={searchPokemon} className="btn-search-poke">Search</button>
                    </div>
                    <select onChange={filterType} name="">
                        {typePoke.map(search => (
                            <option
                                key={search.url}
                                value={search.url}>
                                {search.name}
                            </option>
                        ))}
                    </select>
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
            </main>

            <div className='container-Pagination'>
                <button onClick={page > 5 ? previewPagex1 : reviewPagex2} disabled={page === 1} className="btn-prev-pagination">Prev Page</button>
                <div className="container-list-btn">
                    {numberPagination.map(number => (
                        <button key={number} onClick={() => setPage(number)} className={page == number ? "btn-pagination-circle2" : "btn-pagination-circle"}>{number}</button> /*----- Recordando -----*/
                    ))}
                </div>
                <button onClick={page < 5 ? () => setPage(page + 1) : nextPagex1} disabled={page === totalPage} className="btn-next-pagination">Nex Page</button>
            </div>
        </div>
    );
};

export default Pokedex;