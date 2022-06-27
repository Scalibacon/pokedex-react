import styles from '../styles/Pokedex.module.scss';
import UpperButtons from '../components/UpperButtons';
import LinkBox from '../components/LinkBox';
import { useEffect, useState } from 'react';

type PokemonResume = {
  name: string,
  id: number,
  imageUrl: string,
  type1: string,
  type2?: string
}

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState<PokemonResume[]>([]);

  const fetchPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    const responseJson = await response.json();
    const result = responseJson.results;

    let pokemonsArray = [];
    for(let i = 0; i < result.length; i++){
      const pokemon = result[i];
      const pokemonData = await fetchPokemonData(pokemon.name);

      const pokemonResume = {
        name: pokemonData.name,
        id: pokemonData.id,
        imageUrl: pokemonData.sprites.other['official-artwork'].front_default,
        type1: pokemonData.types[0]?.type.name,
        type2: pokemonData.types[1]?.type.name,
      } as PokemonResume;

      console.log(pokemonResume);

      pokemonsArray.push(pokemonResume);
    }

    setPokemonList(pokemonsArray);
  }

  useEffect( () => {
    fetchPokemons();
  }, []);  

  const fetchPokemonData = async (pokemonName: string) => {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await result.json();

    return pokemonData;
  }

  return(
    <div className={styles.pokedexWrapper}> 

    <UpperButtons title="Pokedex"/>
    
      <section className='cardsContainer'>
        { pokemonList.map( pokemon => {
          return (
            <LinkBox 
              key={pokemon.id} 
              mainText={pokemon.name} 
              color='79,193,166' 
              image={pokemon.imageUrl}
              type1={pokemon.type1}
              type2={pokemon.type2}
              url='/pokedex'                 
            />
          )
        })}
        
      </section>               
    </div> 
  )
}

export default Pokedex;