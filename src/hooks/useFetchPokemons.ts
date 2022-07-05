import { gql, useQuery } from "@apollo/client";

type useFetchPokemonProps = {
  offset: number,
  limit: number,
}

const GET_POKEMON_LIST = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }      
    }
  }
`;

const useFetchPokemons = ( props : useFetchPokemonProps) => {  
  return useQuery<{ pokemon_v2_pokemon: [] }>(GET_POKEMON_LIST, { variables: props });    
}

export default useFetchPokemons;