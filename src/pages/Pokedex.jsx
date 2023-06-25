import { useSelector } from 'react-redux'
import Header from '../components/pokedex/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PokemonsList from '../components/pokedex/PokemonsList'

const Pokedex = () => {

    const [pokemons, setPokemons] = useState([])

    const [namePokemon, setNamePokemon] = useState("")

    const [types, setTypes] = useState([]);

    const [currentType, setCurrentType] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    

    const nameTrainer = useSelector(store => store.nameTrainer);

    const handleSubmit = (e) => {
      e.preventDefault()
      setNamePokemon(e.target.namePokemon.value)
    }

    const handleChangeType = (e) => {
      setCurrentType(e.target.value)
    }

    const pokemonsByName = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(namePokemon.toLowerCase()))

    const paginationLogic = () => {

      const POKEMONS_PER_PAGE = 22

      const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
      const sliceEnd = sliceStart + POKEMONS_PER_PAGE
      const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

      const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

      const PAGES_PER_BLOCK = 5
      const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

      const pagesInBlock = []
      const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
      const maxPage = actualBlock * PAGES_PER_BLOCK
      for (let i = minPage; i <= maxPage; i++) {
        if (i <= lastPage) {
          pagesInBlock.push(i)
        }         
      }    
      return {pokemonInPage, lastPage, pagesInBlock}        
    }

    const {lastPage, pagesInBlock, pokemonInPage} = paginationLogic()

    const handleClickPreviusPage = () => {
      const newCurrentPage = currentPage -1
      if (newCurrentPage >= 1) {
        setCurrentPage(newCurrentPage)
      }
    }

    const handleClickNextPage = () => {
      const newCurrentPage = currentPage +1
      if (newCurrentPage <= lastPage) {
        setCurrentPage(newCurrentPage)
      }
    }

    useEffect(() => {
      if (!currentType) {
        const URL = `https://pokeapi.co/api/v2/pokemon?limit=1281`

      axios.get(URL)
      .then(({data}) => setPokemons(data.results))
      .catch((err) => console.log(err))
      }
    }, [currentType])

    useEffect(() => {
      const URL = "https://pokeapi.co/api/v2/type";

      axios
      .get(URL)
      .then(({data}) => setTypes(data.results))
      .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
      if (currentType) {
        const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;

        axios
        .get(URL)
        .then(({ data }) => {
          const pokemonsByType = data.pokemon.map(pokemon => pokemon.pokemon)
          setPokemons(pokemonsByType)
        })
        .catch((err) => console.log(err));
      }  

    }, [currentType])

    useEffect(() => {
    setCurrentPage(1)
    }, [namePokemon, currentType])
    
    
    {/*w-[366px]*/ }
    

  return (
    <section className='min-h-screen bg-gray-50'>
      <Header />
      <section className=" max-w-7xl m-auto mx-auto px-2 py-5">
      <p className='flex justify-center py-5 text-2xl text-center font-semibold'><span className="text-red-600 text-2xl font-bold text-start">Welcome {nameTrainer}</span>, here you can find your favorite pokemon</p>

      <form onSubmit={handleSubmit} className='flex w-full mx-auto flex-wrap content-center justify-around'>
        <div className='pl-3 pr-7 w-3/4 '>
            <input className='w-3/4 h-[60px] rounded-tl-md rounded-bl-md px-5 font-medium shadow-md	' id='namePokemon' placeholder='Search...' type="text"/>
            <button className=' w-1/4 h-[60px] rounded-tr-md rounded-br-md bg-red-600 text-white overflow-hidden hover:bg-red-500 shadow-md	'>Search</button>
        </div>

        <select className='w-1/4 h-[60px] shadow-md	' onChange={handleChangeType}>
           <option className=' text-center' value="">All</option>
            {
              types.map((type) => (
                <option value={type.name} key={type.url}>{type.name}</option>
              ))}
        </select>
       

      </form>
      </section>

      <PokemonsList pokemons={pokemonsByName} pokemonsInPage={pokemonInPage} />

      {/* paginacion */}

      <ul className="flex justify-center gap-2 py-4 px-2 flex-wrap">

        <li onClick={() => setCurrentPage(1)} className="w-[50px] h-[50px] bg-red-500 hover:bg-red-400 text-white rounded cursor-pointer text-lg text-center py-2">{"<<"}</li>

        <li onClick={handleClickPreviusPage} className="w-[50px] h-[50px] bg-red-500 hover:bg-red-400 text-white rounded cursor-pointer text-lg text-center py-2">{"<"}</li>
        {
          pagesInBlock.map(numberPage => <li onClick={() =>  setCurrentPage(numberPage)} className={`w-[50px] h-[50px] rounded cursor-pointer text-lg text-center py-2 ${!(numberPage === currentPage) && " hover:bg-gray-200"} ${numberPage === currentPage && "bg-red-500 text-white hover:bg-red-400"}`} key={numberPage}>{numberPage}</li>)
        }
        <li onClick={handleClickNextPage} className=' w-[50px] h-[50px] bg-red-500 hover:bg-red-400 text-white rounded cursor-pointer text-lg text-center py-2'>{">"}</li>

        <li onClick={() => setCurrentPage(lastPage)} className=' w-[50px] h-[50px] bg-red-500 hover:bg-red-400 text-white rounded cursor-pointer text-lg text-center py-2'>{">>"}</li>
      </ul>   

    </section>
  )
}

export default Pokedex