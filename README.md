# Poke Center #

## General Assembly SEI | Project Two | HTML / CSS / JavaScript / Bulma / React | Pair | 48 Hours ##

Link to game: https://pokemoncenter.netlify.app/

### Overview ###

Poke Center is a web app that displays all original pokemons and their details extracted from a public API. A user can select a pokemon to read all about it and see what it levels up to. There's also a special feature where a player can click a shiny button to try to get a shiny pokemon to appear instead of the original image displayed. This App was developed by [Mike Salter](https://github.com/Msalter91)

## Technologies Used ##

- HTML 
- CSS 
- Bulma 
- JavaScript 
- React 
- Axios
- React-Router-Dom

## Planning ##

We started by searching for a public API that we could access instantly and didn't require a key as we only had 48 hours to complete the hackathon. We chose the Pokemon API as we decided it would be a fun project to build and it contained a vast amount of data that allowed us to build our features and potentially add more in the future.
We created a wireframe for what we wanted to do, then proceeded to create routes for our pages and endpoints. 

## Process ##

We did not have a shared repository for this project, we mostly coded together via Zoom and VS Live Share then sent over pieces of codes that we worked on individually to each other. 

The Poke-API contains a vast amount of data, often nested several layers deep. For the index page we only needed the name and the image. However, the image link is not directly available from the GET endpoint for all Pokémon. So, we had to create a workaround that used data from the available data to pull an image from a separate Pokémon image hosting site. 

Each card in the index has its own component that links to the detail page of each Pokémon. Lazy loading was added as there are 798 Pokémon currently available!

```js
function displayPokemon (pokemonData) {
    const pokemonArray = pokemonData.results.map((item, index) => {
      return {
        name: item.name,
        url: item.url, 
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
        id: index + 1,
      }
    })
    setPokemon(pokemonArray)
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  } 
  ```

Due to the data structure of the API, two axios requested were needed to get all the information needed. 

```js
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
  ```
  Each Pokemon loads on a card - the background of which is dynamically coloured based on its primary typing. For the Pokédex entry, the API returns every Pokédex entry for that Pokemon, across all languages, and there is no set order to this. This required a bit of a fix to manipulate the returned data to always return an English option.

  ```js
  {
    const pokedexEntryFilter = pokemonEvolution.flavor_text_entries.filter(entry => {
      return entry.language.name === 'en' 
    })
    pokedexEntry = pokedexEntryFilter[0].flavor_text
  }
  ```

## Screenshots ##

**Home page**

 ![imagename](/public/assets/main.png)

**Pokemon display:** 

![imagename](/public/assets/pokemons.png)

**A single pokemon card** 

![imagename](/public/assets/pokemonshow.png)

**Search:**

![imagename](/public/assets/search.png)


## Challenges ##

We met a few challenges with this API. Firstly the nested data performed a little bit of a challenge at first until we practised multiple axios requests. Secondly, retrieving the images we wanted from the API rather than sprites which were also available in the data. 

Lastly, fetching our language of choice which in our case is English. 

## Wins ##

A great project to exercise dealing with nested data and doing it in a pair. Though the API we chose was more challenging than we anticipated it gave us insightful practice on making multiple axios requests and fetching the correct data. The styling and theme of the project was also a win, my son loves to play with it.

## Key Learnings ##

• Finding Public APIs and understanding accessibility 
• Fetching data from nested APIs
• the Shiny feature

## Future Features ## 
• A pokemon forum

• Authenticated users that can bookmark their favourite pokemons











