import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import pokeball from "../Images/pokeball.svg"

const PokemonId = () => {

  const [pokemon, setPokemon] = useState(null)

  const {pokemonName} = useParams()

  const percentProgresStat = (baseStat) => {
    const STAT_MAX = 255
    return `${(baseStat * 100) / 255}%`
  }


  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    axios
    .get(URL)
    .then(({data}) => setPokemon(data))
    .catch((err) => console.log(err));
  }, [])
  
  return (
    <main>
      <Header />
      <section className='mx-auto mt-24 mb-24 pb-16 pl-3 pr-3 max-w-6xl w-full rounded shadow-2xl text-center flex flex-col justify-center'>    

    {/* header pokemon */}
      <section className={`${pokemon?.types[0].type.name} rounded-t-lg relative h-40 text-center flex justify-center `}>
        <div className=' mx-auto'>
            <img className=' w-2/4 mx-auto min-w-[230px] max-w-[600px]' src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </div>
        </section>    

       <section className='pt-20'>

        {/* informacion del pokemon */}
        <section className='flex justify-center'>
          <div className=' border border-neutral-500 w-[70px] h-[50px] flex justify-center items-center font-medium text-2xl rounded-none'>{"#" + pokemon?.id} 
          </div>
        </section>

        <div className='flex justify-center items-center'>
          <hr className=' w-1/4 mr-6  ' />
          <h4 className=' font-medium text-2xl'>{String(pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1))}</h4>
          <hr className=' w-1/4 ml-6'/>
        </div>

        <div className='flex justify-evenly'>
          <div>
            <p className='font-medium'>Weight</p>
            <b className='text-2xl'>{pokemon?.weight}</b>
          </div>
          <div>
          <p className='font-medium'>Height</p>
            <b className='text-2xl'>{pokemon?.height}</b>
          </div>
        </div>

        <div className='flex flex-wrap justify-around pt-4'>
        <div>
            <h3 className='text-xl font-bold'>Type</h3>
            <div className="flex ml-8 mr-8 justify-center">
              {pokemon?.types?.map((types) => (
                <div className={`pt-1 pb-1 pl-4 pr-4 m-4 rounded-3xl ${pokemon?.types[0].type.name} text-slate-100 `} key={types.type.url}>
                  {types.type.name}
                </div>
              ))}              
              </div>
          </div>
        <div >
            <h3 className=' text-xl font-bold'>Abilites</h3>
            <div className="flex flex-wrap ml-8 mr-8 justify-center">
              {pokemon?.abilities?.map((abilities) => (
                <div className={`pt-1 pb-1 pl-4 pr-4 m-4 rounded-3xl  bg-gray-300 text-slate-100 `} key={abilities.ability.url}>
                  {abilities.ability.name}
                </div>
              ))}              
              </div>
          </div>
        </div>

        

       
      {/* Stats */}
      <section>
      <div className='flex justify-between items-center mx-auto w-[75%] '>
        <h4 className='text-center text-3xl font-semibold pr-7'>Stats</h4>
        <hr className='w-[80%]' />
        <img src={pokeball} alt="" />
        </div>
      <section className='flex flex-wrap justify-center'> 

       {
        pokemon?.stats.map((stat) => (
          <article className=' w-3/4 ' key={stat.stat.url}>
            <section className='flex justify-between items-baseline'>
              <h5 className=' pt-4 font-bold'>{stat.stat.name.toUpperCase() + ":"}</h5>
              <span className=' font-bold'>{stat.base_stat + " / 255"}</span>
            </section>

         {/* barra de progreso stat*/}
         <div className= 'bg-gray-300 h-8 rounded-md overflow-hidden'>

           <div style={{width: percentProgresStat(stat.base_stat)}} className={`h-full bg-yellow-500 w-[50%] rounded-md`}>

           </div>

         </div>

       </article>
     ))
   }
      </section>
      </section>
      
   
   </section>

  </section>

     
  <div className="m-auto mt-24 mb-24 pb-16 pl-16 pr-16 max-w-6xl rounded shadow-2xl text-center flex flex-col items-center">
          <div className="title">
            <h1 className="text-black p-8">Movements</h1>
            <hr />
          </div>
          <div className="flex flex-wrap">
            {pokemon?.moves?.map((moves) => (
              <div className="pt-2 pb-2 pl-8 pr-8 m-2 rounded-3xl bg-slate-200" key={moves?.move.url}>
                {moves.move.name}
              </div>
            ))}
          </div>
        </div>
        
  
        
    </main>
  )
}

export default PokemonId