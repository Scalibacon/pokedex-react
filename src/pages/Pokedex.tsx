import styles from '../styles/Pokedex.module.scss';
import UpperButtons from '../components/UpperButtons';

const Pokedex = () => {
  return(
    <>
      <UpperButtons title="Pokedex"/>

      <div className={styles.pokedexWrapper}>                 
      </div> 
    </>
    
  )
}

export default Pokedex;