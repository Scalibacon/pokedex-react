import styles from './PokeCard.module.scss';
import ImgPokeball from '../../assets/pokeball-icon.png';
import { CSSProperties, MouseEventHandler } from 'react';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

interface PokeCardProps {
  id: number,
  mainText: string,
  color: string,
  type1?: string,
  type2?: string,
  image?: string,
  onClick: MouseEventHandler
}

const PokeCard = (props: PokeCardProps) => {

  return (
    <div  
      className={styles.pokeCard} 
      style={{ "--background-color": props.color} as CSSProperties}
      onClick={ props.onClick }
    >
      <img src={ImgPokeball} className={styles.pokeball} alt="Transparent Pokeball"/>

      <h4>{`#${props.id}`}</h4>

      <p className={styles.name}>{ capitalizeFirstLetter(props.mainText) }</p>   

      { props.type1 && <span className={styles.type}>{capitalizeFirstLetter(props.type1)}</span>}
      { props.type2 && <span className={styles.type}>{capitalizeFirstLetter(props.type2)}</span>}

      <img className={styles.pokemonImage} src={props.image} alt={props.mainText}/>
    </div>
  )
}

export default PokeCard;