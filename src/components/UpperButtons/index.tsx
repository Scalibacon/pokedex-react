import { useNavigate } from 'react-router-dom';
import styles from './UpperButtons.module.scss';
import { HiOutlineArrowNarrowLeft, HiMenu } from 'react-icons/hi';
import ImgPokeball from '../../assets/pokeball-icon.png';

interface UpperButtonsProps {
  title?: string
}

const UpperButtons = (props: UpperButtonsProps) => {
  const navigate = useNavigate();

  return (
    <section className={styles.upperButtons}>
      <img src={ImgPokeball} alt="Transparent Pokeball" className={`transparentPokeball ${styles.pokeball}`}/>

      <span>
        <HiOutlineArrowNarrowLeft onClick={e => navigate(-1)}/>
        <HiMenu />
      </span>

      <h3>{ props.title }</h3>
    </section>
  )
}

export default UpperButtons;