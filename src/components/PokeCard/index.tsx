import styles from './PokeCard.module.scss';
import ImgPokeball from '../../assets/pokeball-icon.png';
import { CSSProperties } from 'react';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

interface PokeCardProps {
  id: number,
  mainText: string,
  color: string,
  url: string,
  type1?: string,
  type2?: string,
  image?: string
}

const PokeCard = (props: PokeCardProps) => {

  return (
    <a 
      href={props.url} 
      className={styles.pokeCard} 
      style={{ "--background-color": props.color} as CSSProperties}
    >
      <img src={ImgPokeball} className={styles.pokeball} alt="Transparent Pokeball"/>

      <h4>{`#${props.id}`}</h4>

      <p className={styles.name}>{ capitalizeFirstLetter(props.mainText) }</p>   

      { props.type1 ? <span className={styles.type}>{capitalizeFirstLetter(props.type1)}</span> : ''}
      { props.type2 ? <span className={styles.type}>{capitalizeFirstLetter(props.type2)}</span> : ''}

      <img className={styles.pokemonImage} src={props.image} alt={props.mainText}/>
    </a>
  )
}

export default PokeCard;