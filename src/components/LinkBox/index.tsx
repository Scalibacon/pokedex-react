import styles from './LinkBox.module.scss';
import ImgPokeball from '../../assets/pokeball-icon.png';
import { CSSProperties } from 'react';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

interface LinkBoxProps {
  mainText: string,
  color: string,
  url: string,
}

const LinkBox = (props: LinkBoxProps) => {

  return (
    <a 
      href={props.url} 
      className={styles.linkBox} 
      style={{ "--background-color": props.color} as CSSProperties}
    >
      <img src={ImgPokeball} alt="Transparent Pokeball"/>

      <p className={styles.name}>{ capitalizeFirstLetter(props.mainText) }</p>   
    </a>
  )
}

export default LinkBox;