import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import ImgPokeball from '../../assets/pokeball-icon.png';
import styles from './PokemonProfile.module.scss';
import { CSSProperties, MouseEventHandler, useEffect, useState } from 'react';
import useFetchPokemonDetails from '../../hooks/useFetchPokemonDetails';
import { getPokemonColor } from '../../utils/colorUtils';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

type PokeProfileProps = {
  backFunction: MouseEventHandler,
  pokeId: number
}

type TypePokeData = {
  id: number,
  name: string,
  type1: string,
  type2?: string,
  imageUrl: string
}

const PokemonProfile = ( props: PokeProfileProps) => {
  const { data } = useFetchPokemonDetails({ pokeId: props.pokeId });
  const [ pokeInfo, setPokeInfo ] = useState<TypePokeData>();
  const [ selectedPage, setSelectedPage ] = useState(0);

  useEffect( () => {
    if(!data) return;

    const pokemonResult = data?.pokemon_v2_pokemon[0];

    setPokeInfo({
      id: pokemonResult.id,
      name: pokemonResult.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonResult.id}.png`,
      type1: pokemonResult.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name,
      type2: pokemonResult.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name
    });
  }, [data]);

  return (
    <div className={styles.pokeProfileWrapper} style={{ "--color": pokeInfo?.type1 ? getPokemonColor(pokeInfo?.type1) : '255,255,255'} as CSSProperties}>
      <section className={styles.upperSection}>
        <HiOutlineArrowNarrowLeft className={styles.backArrow} onClick={ props.backFunction }/>
        <span className={styles.transparentSquare}/>
      </section>

      <section className={styles.headerInfo}>
        <section>
          <h1>{ pokeInfo?.name ? capitalizeFirstLetter(pokeInfo.name) : '' }</h1>
          <h4>#{ pokeInfo?.id }</h4>
        </section>
        
        <div className={styles.typesContainer}>
          { pokeInfo?.type1 && <span>{capitalizeFirstLetter(pokeInfo.type1)}</span>}
          { pokeInfo?.type2 && <span>{capitalizeFirstLetter(pokeInfo.type2)}</span>}
        </div>

        <div className={styles.imagesContainer}>
          <img className={styles.pokeImage} src={pokeInfo?.imageUrl} alt={pokeInfo?.name}/>
          <img src={ImgPokeball} className={styles.pokeball} alt="Transparent Pokeball"/>
        </div>        
      </section>

      <main className={styles.mainContainer}>
        <header>
          <ul>
            <li 
              onClick={ e => setSelectedPage(0) } 
              className={`${selectedPage === 0 ? styles.active : ''}`}
            >
              About
            </li>
            <li 
              onClick={ e => setSelectedPage(1) } 
              className={`${selectedPage === 1 ? styles.active : ''}`}
            >
              Base Stats
            </li>
            <li 
              onClick={ e => setSelectedPage(2) } 
              className={`${selectedPage === 2 ? styles.active : ''}`}
            >
              Evolution
            </li>
            <li 
              onClick={ e => setSelectedPage(3) } 
              className={`${selectedPage === 3 ? styles.active : ''}`}
            >
              Moves
            </li>
          </ul>

          <div className={styles.barContainer}>
            {/* <div className={styles.bar}/> */}
          </div>
        </header>

        <section className={styles.contentContainer}>
          <div className={`${styles.page} ${selectedPage === 0 ? styles.active : ''}`}>About</div>
          <div className={`${styles.page} ${selectedPage === 1 ? styles.active : ''}`}>Base Stats</div>
          <div className={`${styles.page} ${selectedPage === 2 ? styles.active : ''}`}>Evolution</div>
          <div className={`${styles.page} ${selectedPage === 3 ? styles.active : ''}`}>Moves</div>
        </section>

      </main>
    </div>
  )
}

export default PokemonProfile;