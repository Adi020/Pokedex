import React from 'react'
import PokemonCard from './PokemonCard'

const PokemonsList = ({pokemons, pokemonsInPage}) => {
  return (
    <section className='grid gap-x-5 gap-y-10 grid-cols-[repeat(auto-fill,_280px)] max-w-[1200px] justify-center mx-auto'>
        {
            pokemonsInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
            
        }

    </section>
  )
}

export default PokemonsList