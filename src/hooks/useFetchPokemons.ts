import { gql, useQuery } from "@apollo/client";

type useFetchPokemonProps = {
  offset: number,
  limit: number,
}

const GET_POKEMON_LIST = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemon_v2_pokemonspecies(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemons {
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

const useFetchPokemons = ( props : useFetchPokemonProps) => {  
  return useQuery<{ pokemon_v2_pokemonspecies: [] }>(GET_POKEMON_LIST, { variables: props });    
}

export default useFetchPokemons;