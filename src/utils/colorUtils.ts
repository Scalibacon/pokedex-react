const getPokemonColor = (type: string) => {
  switch(type){
    case 'normal':
      return '172,170,122';
    case 'flying':
      return '158,143,197';
    case 'water':
      return '110,139,198';
    case 'ice':
      return '152,214,213';
    case 'fire':
      return '241,127,45';
    case 'dragon':
      return '99,87,166';
    case 'electric':
      return '247,210,51';
    case 'steel':
      return '184,184,210';
    case 'rock':
      return '185,163,56';
    case 'ground':
      return '224,193,102';
    case 'grass':
      return '121,194,81';
    case 'fairy':
      return '247,203,223';
    case 'psychic':
      return '240,88,137';
    case 'fighting':
      return '196,49,43';
    case 'bug':
      return '170,186,57';
    case 'poison':
      return '158,67,153';
    case 'dark':
      return '114,90,74';
    case 'ghost':
      return '113,89,154';
    default:
      return '172,170,122'; 
  }
}

export { getPokemonColor }