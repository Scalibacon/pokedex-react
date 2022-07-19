import styles from '../styles/Pokedex.module.scss';
import UpperButtons from '../components/UpperButtons';
import { useEffect, useState, } from 'react';
import useFetchPokemons from '../hooks/useFetchPokemons';
import PokeCard from '../components/PokeCard';
import PokemonProfile from '../components/PokeProfile';
import { getPokemonColor } from '../utils/colorUtils';

interface PokemonListResume {
  name: string,
  id: number,
  imageUrl: string,
  type1: string,
  type2?: string
}

const Pokedex = () => {  
  const LIMIT = 40;

  const [pokemonList, setPokemonList] = useState<PokemonListResume[]>([]); 
  const [offset, setOffset] = useState(0);  
  const [pokemonId, setPokemonId] = useState(0);

  const { data, error } = useFetchPokemons({ offset: offset, limit: LIMIT });

  useEffect( () => {
    if(error) return alert('Error trying to fetch pokemon list');
    
    const pokeArray = data?.pokemon_v2_pokemon.map( (poke: any) => {
      return {
        id: poke.id,
        name: poke.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`,
        type1: poke.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name,
        type2: poke.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name
      } as PokemonListResume;
    });

    if(pokeArray) setPokemonList( (previousState) => {
      return previousState.concat(pokeArray);
    });
  }, [data, error]);  

  useEffect( () => {
    const intersectionOnserver = new IntersectionObserver( (entries) => {      
      if(!entries.some((entry) => entry.isIntersecting) || pokemonList.length <= 0) return;

      setOffset( (previousOffset) => previousOffset + LIMIT );
    });

    const scrollMonitor = document.getElementById(styles.scrollMonitor);

    if(!scrollMonitor) return;

    intersectionOnserver.observe(scrollMonitor);    

    return () => intersectionOnserver.disconnect();
  }, [pokemonList])
  
  return(
    <div className={styles.pokedexWrapper}> 
    {pokemonId > 0 && <PokemonProfile pokeId={pokemonId} backFunction={() => { setPokemonId(0)}}/>}

    <UpperButtons title="Pokedex"/>
      <section className='cardsContainer'>
        { pokemonList.map( pokemon => {
          return (
            <PokeCard 
              key={pokemon.id}
              id={pokemon.id}
              mainText={pokemon.name} 
              image={pokemon.imageUrl}
              type1={pokemon.type1}
              type2={pokemon.type2}
              color={getPokemonColor(pokemon.type1)}
              onClick={ () => { setPokemonId(pokemon.id); console.log(pokemon.id) } }
            />
          )
        }) }
        <span id={styles.scrollMonitor} />
      </section>               
    </div> 
  )
}

export default Pokedex;