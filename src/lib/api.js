import axios from 'axios'

const baseUrl = 'https://pokeapi.co/api/v2'

export function getAllPokemon() {
  return axios.get(`${baseUrl}/pokemon`,{
    params: {
      offset: 0,
      limit: 898,
    },
  })
}

export function getBasicInfo (pokemonid) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonid}`)
}
export function getDetailedInfo (pokemonid) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonid}`)
}