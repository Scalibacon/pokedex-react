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
      <img src={ImgPokeball} alt="Transparent Pokeball" className="transparentPokeball"/>

      <h2>What are you looking for?</h2>

      <SearchBar onEnter={search}/>

      <section className={styles.linksContainer}>
        <LinkBox mainText='Pokedex' color='79,193,166' url='/pokedex'/>
        <LinkBox mainText='Moves' color='247,119,106' url='/movedex'/>
        <LinkBox mainText='Abilities' color='88,169,244' url='/abilitydex'/>
        <LinkBox mainText='Items' color='255,206,75' url='/itemdex'/>
        <LinkBox mainText='Locations' color='124,82,140' url='/pokedex'/>
        <LinkBox mainText='Type Charts' color='176,115,109' url='/pokedex'/>
      </section>
    </main>
  )
}

export default Home;