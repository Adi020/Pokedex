import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./style/pokemonCard.css"
import { Link } from 'react-router-dom'

const pokeLinearGradients = {
  normal: "border-yellow-800",
  fighting: "border-amber-700",
  flying: "border-neutral-400 ",
  poison: "border-violet-500",
  ground: "border-violet-600",
  rock: "border-neutral-400",
  bug: "border-green-500",
  ghost: "border-gray-600",
  steel: "border-slate-500",
  fire: "border-orange-500",
  water: "border-blue-500",
  grass: "border-emerald-100",
  electric: "border-indigo-700",
  psychic: "border-neutral-500 ",
  ice: "border-cyan-400",
  dragon: "border-cyan-500",
  dark: "border-slate-700",
  fairy: "border-slate-300",
  unknown: "border-slate-400",
  shadow: "border-indigo-500",
}

const textPokeLinearGradients = {
  normal: "text-yellow-800",
  fighting: "text-amber-700",
  flying: "text-neutral-400 ",
  poison: "text-violet-500",
  ground: "text-violet-600",
  rock: "text-neutral-400",
  bug: "text-green-500",
  ghost: "text-gray-600",
  steel: "text-slate-500",
  fire: "text-orange-500",
  water: "text-blue-500",
  grass: "text-emerald-300",
  electric: "text-indigo-700",
  psychic: "text-neutral-500 ",
  ice: "text-cyan-400",
  dragon: "text-cyan-500",
  dark: "text-slate-700",
  fairy: "text-slate-300",
  unknown: "text-slate-400",
  shadow: "text-indigo-500",
}

const PokemonCard = ({pokemonUrl}) => {

    const [pokemon, setPokemon] = useState(null)

    const formatTypePokemon = (types = []) => {
        const nameTypes = types.map((type) => type.type.name )
        const titleTypes = nameTypes.join(" / ")
        return titleTypes
    }

    useEffect(() => {

        axios.get(pokemonUrl)
        .then(({data}) => setPokemon(data))
        .catch((err) => console.log(err))
    }, [])
    



  return (
    
    <Link to={`/pokedex/${pokemon?.name}`} className={` border-8 ${pokeLinearGradients[pokemon?.types[0].type.name]}  rounded-2xl`}>
      {/*<section className=' w-70 h-auto mx-auto'> 
      </section>*/}
        {/* seccion superior */}
        <section className={`${pokemon?.types[0].type.name} rounded-t-lg relative h-36`}>
            <div className='absolute px-12 -bottom-11'>
                <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </div>
        </section>

        {/* seccion inferior */}
        <section className=' bg-gray-50 rounded-b-xl text-center'>

            <h3 className={`mt-10 text-3xl font-medium ${textPokeLinearGradients[pokemon?.types[0].type.name]}`}>
              {String(pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1))}</h3>
                <h5 className=' text-slate-600 text-xl font-medium'>{formatTypePokemon(pokemon?.types)}</h5>
                <span className='text-slate-400 text-xs'>Type</span>

            <hr />
{ /* <section className='grid gap-x-5 grid-cols-2 justify-center mx-auto py-2'> */}
             <section className='grid gap-x-5 grid-cols-2 justify-center mx-auto py-2'>
                {/* generar lista de stats */}

                {
                  pokemon?.stats.slice(0, 4).map(stat => (
                    <div className="p-1" key={stat.stat.url}>
                      <h6 className=' text-slate-400'>{stat.stat.name}</h6>
                      <span className={`${textPokeLinearGradients[pokemon?.types[0].type.name]} font-bold text-lg`} >{stat.base_stat}</span>
                    </div>
                  ))
                }

            </section>

            </section>
      
        
      </Link>
        
  )
}

export default PokemonCard