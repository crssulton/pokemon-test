import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'regenerator-runtime/runtime'

import PokemonList from './pages/PokemonList'
import MyPokemonList from './pages/MyPokemonList'
import PokemonDetail from './pages/PokemonDetail'
import DetailPokemon from './components/DetailPokemon'

it("Render Pokemon List Page", () => {
  const {getByText} = render(<PokemonList />)
  expect(getByText('POKEMON LIST')).toBeInTheDocument()
})

it("Render My Pokemon List Page", () => {
  const {getByText} = render(<MyPokemonList />)
  expect(getByText('MY POKEMON LIST')).toBeInTheDocument()
})

it("Render Pokemon Detail Page", () => {
  render(<PokemonDetail />)
})

it("Render Detail Page", () => {
  const {getByText} = render(<DetailPokemon />)
  expect(getByText('DETAIL POKEMON')).toBeInTheDocument()
})