import styles from './LinkBox.module.scss';
import ImgPokeball from '../../assets/pokeball-icon.png';
import { CSSProperties } from 'react';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

interface LinkBoxProps {
  mainText: string,
  color: string,
  url: string,
  type1?: string,
  type2?: string,
  image?: string
}

const LinkBox = (props: LinkBoxProps) => {
  const renderOptionalData = () => {
    if(!props.image) return;

    return (
      <div className={styles.optionalContainer}>
        { props.type1 ? <span>{capitalizeFirstLetter(props.type1)}</span> : ''}
        { props.type2 ? <span>{capitalizeFirstLetter(props.type2)}</span> : ''}

        <img className={styles.pokemonImage} src={props.image} alt={props.mainText}/>
      </div>
    )
  }

  return (
    <a 
      href={props.url} 
      className={`${styles.linkBox} ${props.type1 ? styles.pokemon : ''}`} 
      style={{ "--background-color": props.color} as CSSProperties}
    >
      <img src={ImgPokeball} alt="Transparent Pokeball"/>

      <p className={styles.name}>{ capitalizeFirstLetter(props.mainText) }</p>   

      {renderOptionalData()}   
    </a>
  )
}

export default LinkBox;