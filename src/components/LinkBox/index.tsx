import styles from './LinkBox.module.scss';
import ImgPokeball from '../../assets/pokeball-icon.png';
import { CSSProperties } from 'react';

interface LinkBoxProps {
  mainText: string,
  color: string,
  type1?: string,
  type2?: string
}

const LinkBox = (props: LinkBoxProps) => {
  return (
    <div className={styles.linkBox} style={{ "--background-color": props.color} as CSSProperties}>
      <img src={ImgPokeball} alt="Transparent Pokeball"/>

      <p className={styles.name}>{ props.mainText }</p>      
    </div>
  )
}

export default LinkBox;