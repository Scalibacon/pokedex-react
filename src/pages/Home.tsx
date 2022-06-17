import styles from '../styles/Home.module.scss';
import SearchBar from '../components/SearchBar';
import LinkBox from '../components/LinkBox';
import ImgPokeball from '../assets/pokeball-icon.png';

const Home = () => { 
  
  const search = (searchText: string) => {
    console.log('You tried to search: ', searchText);
  }

  return (
    <main className={styles.wrapper}>
      <img src={ImgPokeball} alt="Transparent Pokeball" className={styles.transparentPokeball}/>

      <h2>What are you looking for?</h2>

      <SearchBar onEnter={search}/>

      <section className={styles.linksContainer}>
        <LinkBox mainText='Pokedex' color='79,193,166'/>
        <LinkBox mainText='Moves' color='247,119,106'/>
        <LinkBox mainText='Abilities' color='88,169,244'/>
        <LinkBox mainText='Items' color='255,206,75'/>
        <LinkBox mainText='Locations' color='124,82,140'/>
        <LinkBox mainText='Type Charts' color='176,115,109'/>
      </section>
    </main>
  )
}

export default Home;