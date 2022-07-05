import styles from '../styles/Pokedex.module.scss';
import UpperButtons from '../components/UpperButtons';
import { useEffect, useState, } from 'react';
import useFetchPokemons from '../hooks/useFetchPokemons';
import LinkBox from '../components/LinkBox';
import { getPokemonColor } from '../utils/colorUtils'

interface PokemonListResume {
  name: string,
  id: number,
  imageUrl: string,
  type1: string,
  type2?: string
}

const Pokedex = () => {  
  const [pokemonList, setPokemonList] = useState<PokemonListResume[]>([]); 

  const { loading, error, data } = useFetchPokemons({ offset: 0, limit: 20 });

  useEffect( () => {
    const pokeArray = data?.pokemon_v2_pokemon.map( (poke: any) => {
      return {
        id: poke.id,
        name: poke.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`,
        type1: poke.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name,
        type2: poke.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name
      } as PokemonListResume;
    });

    if(pokeArray) setPokemonList(pokeArray);

    console.log('pokearray', pokeArray);
  }, [data]);

  
  
  return(
    <div className={styles.pokedexWrapper}> 

    <UpperButtons title="Pokedex"/>
      <section className='cardsContainer'>
        { pokemonList.map( pokemon => {
          return (
            <LinkBox 
              key={pokemon.id}
              mainText={pokemon.name} 
              image={pokemon.imageUrl}
              type1={pokemon.type1}
              type2={pokemon.type2}
              color={getPokemonColor(pokemon.type1)}
              url='/'
            />
          )
        }) }

      </section>               
    </div> 
  )
}

export default Pokedex;