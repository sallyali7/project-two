import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { notify } from 'react-notify-toast'

import Error from '../common/Error'

import { getBasicInfo, getDetailedInfo } from '../lib/api'


function PokeShow() {
  const { pokemonid } = useParams()
  const [pokemon, setPokemon] = React.useState(null)
  const [pokemonEvolution, setPokemonEvolution] = React.useState(null)
  const [isShiny, setIsShiny] = React.useState(false)

  const [isError, setIsError] = React.useState(false)
  const isLoading = !pokemon && !isError && !pokemonEvolution 

  let pokedexEntry = null
  let pokemonTypes = []
  const idNumber = parseFloat(pokemonid)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getBasicInfo(pokemonid)
        setPokemon(res.data)
        const  evoRes = await getDetailedInfo(pokemonid)
        setPokemonEvolution(evoRes.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [pokemonid]
  )
  if (pokemon) {
    const pokemonTypesArray = pokemon.types.map(type => {
      return type.type
    })
    pokemonTypes = pokemonTypesArray.map(type => {
      return type.name
    })
  }
  if (pokemonEvolution) {
    const pokedexEntryFilter = pokemonEvolution.flavor_text_entries.filter(entry => {
      return entry.language.name === 'en' 
    })
    pokedexEntry = pokedexEntryFilter[0].flavor_text
  }

  const decideShiny = () => {
    const randomNumber = Math.floor(Math.random() * 5)
    if (randomNumber === 4) {
      setIsShiny(true)
      notify.show('You found a shiny', 'custom', 3000, { background: '#fbcb46', color: '#000' })
    } else {
      setIsShiny(false)
      notify.show('Nope, try again', 'custom', 500, { background: '#ffffff', color: '#000' }) 
    }
  }
  return (

    <section>
      {isError && <Error />}
      {isLoading && <Loader
        type="Puff"
        color="#f00000"
        height={100}
        width={100}
      />}
      {pokemon && pokemonEvolution &&
      <div className={` cardborder container ${pokemonTypes[0]}`}>
        <div className="columns">
          {isError && <Error />}
          <div className="column is-vcentered is-half is-mobile is-touch">
            <figure className="image">
              <img src={!isShiny ? pokemon.sprites.other['official-artwork'].front_default : pokemon.sprites.other.home.front_shiny}/>
            </figure>
          </div>
          <div className="imagetext column is-half is-mobile is-touch">
            <div><h1 className="pokemon title is-1">{isShiny ? 'SHINY ' : ''}{pokemon.name.toUpperCase()}</h1></div>
            <div><h1 className="pokemonid title is-2">#{pokemon.id}</h1></div>
            <div><h3 className="pokemontype title is-3">{pokemonTypes.join(' ').toUpperCase()}</h3></div>
            <div><h4 className="pokemondetails title is-5">{pokedexEntry}</h4></div>  
            <div className="luckybuttons is-touch is-flex is-flex-direction-column">
              <button className="shiny button is-large is-touch is-flex-grow-5" onClick={decideShiny}>Try your shiny luck</button>
              <div className="is-flex is-flex-direction-row is-justify-content-space-between column is-fullwidth">
                <Link to={`/pokemon/${idNumber - 1}`}>
                  <button className="previous button is-large">Previous</button>
                </Link>
                <Link to={`/pokemon/${idNumber + 1}`}>
                  <button className="next button is-large">Next</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> }
    </section>
  )
}
export default PokeShow