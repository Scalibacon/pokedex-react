import { KeyboardEvent } from 'react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.scss';

interface SearchProps {
  onEnter: (searchText: string) => void
}

const SearchBar = ({ onEnter }: SearchProps) => {
  const [searchText, setSearchText] = useState('');

  const handleInputKeyUp = (event: KeyboardEvent) => {
    if(event.key !== 'Enter') return;

    onEnter(searchText);
  }

  return (
    <div className={styles.searchBar}>
      <FaSearch className={styles.searchIcon} onClick={ e => onEnter(searchText) }/>
      <input 
        type="text" 
        placeholder='Search Pokemon, Move, Ability etc' 
        onChange={ e => setSearchText(e.target.value) }
        onKeyUp={ handleInputKeyUp }
      />
    </div>
  )
}

export default SearchBar;