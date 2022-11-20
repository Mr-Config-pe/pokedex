import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import InputName from './components/InputName'
import Pokedex from './components/Pokedex'
import PokemonCard from './components/PokemonCard'
import PokemonId from './components/PokemonId'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route>
          <Route path='/' element={<InputName />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='pokedex' element={<Pokedex />} />
            <Route path='pokedex/:id' element={<PokemonId />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
