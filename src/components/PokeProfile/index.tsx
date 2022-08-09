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
  imageUrl: string,

  height: number,
  weight: number,
  captureRate: number,
  eggGroups: string[],
  abilities: string[],
  description: string,
  stats: {base_stat: number, name: string}[]
}

const PokemonProfile = ( props: PokeProfileProps) => {
  const { data } = useFetchPokemonDetails({ pokeId: props.pokeId });
  const [ pokeInfo, setPokeInfo ] = useState<TypePokeData>();
  const [ selectedPage, setSelectedPage ] = useState(0);

  const STATS_NAME = [ "HP", "Attack", "Defense", "Sp. Attack", "Sp. Def", "Speed" ];

  useEffect( () => {
    if(!data) return;

    const pokemonResult = data?.pokemon_v2_pokemon[0];  
    console.log('pokeinfo', pokemonResult);

    setPokeInfo({
      id: pokemonResult.id,
      name: pokemonResult.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonResult.id}.png`,
      type1: pokemonResult.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name,
      type2: pokemonResult.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name,

      height: pokemonResult.height / 10,
      weight: pokemonResult.weight / 10,
      captureRate: pokemonResult.pokemon_v2_pokemonspecy.capture_rate,
      eggGroups: pokemonResult.pokemon_v2_pokemonspecy.pokemon_v2_pokemonegggroups.map( (egg: any) => capitalizeFirstLetter(egg.pokemon_v2_egggroup.name)),
      abilities: pokemonResult.pokemon_v2_pokemonabilities.map( (ability: any) => capitalizeFirstLetter(ability.pokemon_v2_ability.name)),
      description: pokemonResult.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text.replace('\f', ' '),

      stats: pokemonResult.pokemon_v2_pokemonstats.map( (stat: any) => { return { base_stat: stat.base_stat, name: stat.pokemon_v2_stat.name } })
    });
  }, [data]);

  function calcultarBarWidth(statValue: number, maxValue = 150){
    if(statValue > maxValue) statValue = maxValue;

    return statValue * 100 / maxValue;
  }

  function renderTotalStats(){
    const totalStats = pokeInfo?.stats.reduce( (total, stat ) => total + stat.base_stat, 0) || 0;

    return (
      <div>
        <span>Total</span>
        <span className={styles.statValue}>{ totalStats }</span>
        <div className={styles.barContainer}>
          <div className={styles.bar} style={{ '--width': `${calcultarBarWidth(totalStats, 900)}%` } as CSSProperties }></div>
        </div>
      </div>
    )
  }

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
          <div className={`${styles.page} ${styles.about} ${selectedPage === 0 ? styles.active : ''}`}>
            <div>
              <span>Species</span>
              <p>SET_SPECIE</p>
            </div>
            <div>
              <span>Height</span>
              <p>{ pokeInfo?.height } m</p>
            </div>
            <div>
              <span>Weight</span>
              <p>{ pokeInfo?.weight } kg</p>
            </div>
            <div>
              <span>Abilites</span>
              <p>{ pokeInfo?.abilities.join(", ").replace("-", " ") }</p>
            </div>
            <div>
              <span>Egg Groups</span>
              <p>{ pokeInfo?.eggGroups.join(", ").replace("-", " ") }</p>
            </div>
            <div>
              <span>Capture Rate</span>
              <p>{ pokeInfo?.captureRate }</p>
            </div>
            <h3>Description</h3>
            <p>{ pokeInfo?.description }</p>
          </div>


          <div className={`${styles.page} ${styles.baseStats} ${selectedPage === 1 ? styles.active : ''}`}>
            {pokeInfo?.stats.map( (stat, index) => {
              return (
                <div key={stat.name}>
                  <span>{ STATS_NAME[index] }</span>
                  <span className={styles.statValue}>{ stat.base_stat }</span>
                  <div className={styles.barContainer}>
                    <div className={styles.bar} style={{ '--width': `${calcultarBarWidth(stat.base_stat)}%` } as CSSProperties }></div>
                  </div>
                </div>
              )
            })}
            { renderTotalStats() }
          </div>
          <div className={`${styles.page} ${selectedPage === 2 ? styles.active : ''}`}>Evolution</div>
          <div className={`${styles.page} ${selectedPage === 3 ? styles.active : ''}`}>Moves</div>
        </section>

      </main>
    </div>
  )
}

export default PokemonProfile;